# Tech Challenge

## Base Assumptions
* You must run the backend API in the background. It needs to be accessible at http://localhost:8080
* You must have **node** and **npm** installed on your machine (tested with `node@20.8.0` and `npm@10.1.0`)
* The frontend project lives in the **frontend** folder (`cd frontend`)
* You must install dependencies via `npm ci`
* Run the project with `npm start` (if you want to run prod build, you can run `npm run build` then `npm run start:simulate-prod`)

## Possible Pitfalls
* When there is no EUR rate given back from the API, `-` is displayed instead of the EUR equivalent
* If there is no EUR rate from API, but the amount is 0, then we display 0 instead of `-`, since `0 * anything = 0`
* If the API is not running at http://localhost:8080 then an error is logged in the console and an error message is displayed instead of the tables
* The API URL is hardcoded and not yet extracted into an environment variable
