import { Button, Select } from "antd";
import React, { useState, useEffect, useCallback }  from "react";
import Api, { ProcurementRecord } from "./Api";
import RecordSearchFilters, { SearchFilters } from "./RecordSearchFilters";
import RecordsTable from "./RecordsTable";

/**
 * This component implements very basic pagination.
 * We fetch `PAGE_SIZE` records using the search endpoint which also returns
 * a flag indicating whether there are more results available or we reached the end.
 *
 * If there are more we show a "Load more" button which fetches the next page and
 * appends the new results to the old ones.
 *
 * Any change to filters resets the pagination state.
 *
 */

const { Option } = Select;
const PAGE_SIZE = 10;

function RecordSearchPage() {
  const [page, setPage] = React.useState<number>(1);
  const [searchFilters, setSearchFilters] = React.useState<SearchFilters>({
    query: "",
  });
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const [records, setRecords] = React.useState<
    ProcurementRecord[] | undefined
  >();

  const [reachedEndOfSearch, setReachedEndOfSearch] = React.useState(false);

  useEffect(() => {
    fetchBuyers();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [searchFilters, page]);

  const handleChangeFilters = React.useCallback((newFilters: SearchFilters) => {
    setSearchFilters(newFilters);
    setPage(1); // reset pagination state
  }, []);

  const handleLoadMore = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  const handleBuyerChange = useCallback((value) => {
    console.log("CHANGE", value);
    setSelectedBuyer(value);
    setSearchFilters((prev) => ({ ...prev, buyer: value }));
    setPage(1);
  }, []);

  const fetchBuyers = async () => {
    const api = new Api();
    const response = await api.getBuyers();
    setBuyers(response.buyers);
  };

  const fetchRecords = async ()=>{
    const api = new Api();
    const response = await api.searchRecords({
      textSearch: searchFilters.query,
      buyerId: selectedBuyer,
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * (page - 1),
    });

    if (page === 1) {
      setRecords(response.records);
    } else {
      // append new results to the existing records
      setRecords((oldRecords) => [...oldRecords, ...response.records]);
    }
    setReachedEndOfSearch(response.endOfResults);
  }

  return (
    <>
    Filter by buyer:
      <Select
        showSearch
        style={{ width: 200, marginBottom: '16px', marginLeft: '8px' }}
        placeholder="Select a buyer"
        optionFilterProp="children"
        onChange={handleBuyerChange}
        allowClear
        value={selectedBuyer}
        virtual
      >
        {buyers.map((buyer) => (
          <Option key={buyer.id} value={buyer.id}>
            {buyer.name}
          </Option>
        ))}
      </Select>
      <RecordSearchFilters
        filters={searchFilters}
        onChange={handleChangeFilters}
      />
      {records && (
        <>
          <RecordsTable records={records} />
          {!reachedEndOfSearch && (
            <Button onClick={handleLoadMore}>Load more</Button>
          )}
        </>
      )}
    </>
  );
}

export default RecordSearchPage;
