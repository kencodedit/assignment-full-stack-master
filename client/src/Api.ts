export type StatusDto = "TENDER" | "CONTRACT";

export type SearchRecordsRequest = {
  textSearch?: string;
  buyerId?: string | null;
  limit: number;
  offset: number;
};

export type ProcurementRecord = {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  buyer: {
    id: string;
    name: string;
  };
  value: number | null;
  currency: string | null;
  status: StatusDto;
  awardDate: string | null;
  closeDate: string | null;

};

export type SearchRecordsResponse = {
  records: ProcurementRecord[];
  endOfResults: boolean;
};

class Api {
  async searchRecords(
    request: SearchRecordsRequest
  ): Promise<SearchRecordsResponse> {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  }
  async getBuyers(): Promise<{ buyers: { id: string; name: string }[] }> {
    const response = await fetch("/api/buyers");
    return await response.json();
  }
}

export default Api;
