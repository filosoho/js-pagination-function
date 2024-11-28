# JS Pagination Function

A simple pagination function written in JavaScript. This function can be used to paginate through any array of items and return the desired subset of items based on the provided page number and page size.

## Features

- Paginate through any array of items.
- Return paginated items along with metadata (e.g., total items, total pages, current page, and page size).
- Handles input validation for correct data types and missing fields.

## Installation

### Clone the repository

```bash
git clone https://github.com/filosoho/js-pagination-function.git
```

```bash
cd js-pagination-function
```

## Install dependencies

Once you’ve cloned the repository, you can install the required dependencies by running:

```bash
npm install
```

This will install both the production and development dependencies listed in the `package.json file`.

## Usage

### API Endpoint

This project includes a simple Express server that exposes the pagination function via an endpoint.

1. Start the application:

   To run the application locally, use the following command:

   ```bash
   npm start
   ```

2. Make a POST request to the `/functions/paginate` endpoint:

   Send a POST request to the `https://js-pagination-function.onrender.com/functions/paginate` URL with a JSON body containing the `items`, `page` and `limit`.

   Example JSON body:

   ```bash
   {
   "input": {
    "items": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    "page": 1,
    "limit": 5
    }
   }
   ```

3. Example Request using curl:

   If you want to test it using curl, you can use the following command:

   ```bash
    curl -X POST https://js-pagination-function.onrender.com/functions/paginate \
    -H "Content-Type: application/json" \
    -d '{"input": {"items": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "page": 1, "limit": 5}}'
   ```

4. Example Response:

   The server will return a JSON response with metadata and paginated items. For example:

   ```bash
   {
   "totalItems": 12,
   "totalPages": 3,
   "currentPage": 1,
   "limit": 5,
   "paginatedItems": [1, 2, 3, 4, 5]
   }
   ```

### Documentation

For a detailed look at how to use the pagination function and more examples, you can view the live documentation at the following link:

[Live API Documentation](https://js-pagination-function.onrender.com/functions/paginate)

### Function Logic

The core logic of the pagination function is as follows:

- Input Validation: The function checks the types of `items`, `page` and `limit` to ensure they are valid before proceeding.
- Pagination Logic: The function calculates the total number of pages and returns the items for the requested page.
- Error Handling: If any input is invalid or required fields are missing, the function returns an error message.

## Running Tests

This project uses Jest for unit testing. To run the tests, use the following command:

```bash
npm test
```

This will run the Jest test suite and output the results in the terminal.

## Code Quality

The project uses Husky to enforce pre-commit hooks, ensuring that tests are run before each commit.

### Install Husky hooks

To set up the Husky hooks, run:

```bash
npm run prepare
```

This will install the pre-commit hooks, which will automatically run npm test to ensure that your tests pass before committing any changes.
