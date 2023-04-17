## Solution Steps
* View page source code via CTRL+U or Inspect Element and find the API query being made
* As the hint "hints" at, there is a FETCH method being called to a specific endpoint called "test"
* Note that the authorization header is embedded in the source code in clear text 
* Copy the API query along with the authorization header into the DevTools console
* Replace the endpoint 'test' with 'flag'
* Run the query directly in Chrome DevTools console
* You can also perform this query in a terminal application or an API platform like Postman
* Flag: `jctf{*MAJ0R-K3Y-AL3RT*}`