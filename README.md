# Stotles work sample assignment

I have purposely kept my solution lightweight and straightforward.
Below are areas in which i believe could be improved if this was for a more production based application.
### Areas for improvement/enhancements

The structure:
- The client would contain a "components" folder to hold the various components which make up the UI
- It would also contain an api folder to house the class API function for making API calls
- It would contain a utils folder for holding all utility functions.
- A separate folder would contains the tests as well
- The backend server would contain folders for : controllers (to house the requests), models (database models), routes (for API route definitions), services (to handle business logic i.e functions which are called by the controllers) and utils (to hold any utility functions)


Search:
- There should be a cross button which when clicked clears the search input
- Indexing of the buyers_id column can be used to speed up filtering
- Indexing of the procurement_records title and setting a character limit on the db schema for the procurement_records title can be used to speed up search query
- The search could be debounced to reduce the number of API calls, this ensures that the search request is triggered only after the user has stopped typing for a specified amount of time
- Autocomplete/Suggestions: As the user types, the user can get suggestions based on the title and description of the record. Limits should also be used to avoid overwhelming the backend
- Caching suggestions could also help, by storing popular or recent search results to avoid repetitive calls to the server
- For really large datasets a search engine such as Elasticsearch could be utilised

Other aspects:
- UI/UX (loading indicators): Utilising a loading indicator when fetching of results can help resolve any potential confusions for the user especially when having poor network connections
- Pagination of the buyer filter. A small set can be initially fetched and then as the user scrolls through (or types), more buyers can be fetched
- Backend APIs should also return messages and error codes as well not just data as part of the response
- Caching (with react query for example), can be used to reduce server load
- A state management solution such as Context API (alongside useMemo and/or React.memo) or Redux could be used to manage the filter and search states effectively

