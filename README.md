# Serverless React Boiler Plate

This is an Store application written in React and Nodejs adapted from the Serverless React Boiler Plate, and using Serverless Framework.

Here is the sample application deployed in AWS.
https://6gdwn84ulb.execute-api.us-east-1.amazonaws.com/dev/

### Functionality:
The application has the following features:
* Search products
* Load 12 products and show more products when the "Show More" button is clicked.

### Features in Detail:
* Debounce for 250ms before sending the request to the server.
* If there is a search term, it will use the searched keyword to list the products and will not show the "Show More" button
* If there is no search term, it will load 12 products as the limit, and "Show More" button is displayed.

## Getting Started Development

To contribute as a developer, run the following commands locally
```bash
# Clean Install
> npm ci

# Run Docker
# Optionally, you can remove -d and open a new terminal
> docker-compose up -d

# Add columns
> npm run migrate:latest

# Add products
> npm run seed:run

# Migrate seed
> npm migrate:latest

# Start development environment
> npm start
```

Here are the URLs available:
* http://localhost:3000/ - the user interface
* http://localhost:3000/products?startKey= - the API for the DynamoDB version of products
* http://localhost:3000/products/search?search= - the API for the DynamoDB version of product search
* http://localhost:3000/products/sql?search= - the API for the SQL version of Products 

## Technology Used

The application is using NodeJS/Typescript and React, and has two Search and Product APIs.

* https://6gdwn84ulb.execute-api.us-east-1.amazonaws.com/dev/ - the deployed User Interface
* https://6gdwn84ulb.execute-api.us-east-1.amazonaws.com/dev/products?startKey=<number> - the API for DynamoDB version of products
* https://6gdwn84ulb.execute-api.us-east-1.amazonaws.com/dev/products/search?search=<string> - the API for DynamoDB version of product search
* https://6gdwn84ulb.execute-api.us-east-1.amazonaws.com/dev/products/sql?search=<string> - the API for SQL version of product search

### Serverless Plugins:

These are the list of plugins in Serverless found in  `serverless.yml` configuration:
  - serverless-iam-roles-per-function - attached in each serverless function
  - serverless-webpack - uses Webpack to compile Typescript.
  - serverless-plugin-scripts - Running custom scripts inside serverless
  - serverless-dynamodb-local - Running DynamoDB locally when the serverless offline runs 
  - serverless-offline - Allows running serverless offline, or locally
  - serverless-s3-deploy - Deploying the Frontend React application in S3.

## How The Code Is Organized

Here is the directory structure
```
serverless-react-boilerplate/
│
├── api/ - Public assets which will retain their original file names and folder structure
│   ├── ProductModel.ts - Contains the Product functions to call
│   └── products.ts - The product API functions used where each function represents one Lambda using DynamoDB.
│   └── sqlProducts.ts - The product API functions used where each function represents one Lambda using SQL.
│
├── public/ - Public assets which will retain their original file names and folder structure
│   ├── favicon.ico - Favicon
│   └── manifest.json - Web page manifest
│
├── migrations/ - Migration files
│   └── 20230221032202_product_table - Create/Drop a table namd product
│
├── src/
│   ├── browser/
│   │   └── ... - Client-side code running in the browser as well as during server-side rendering
│   ├── components/
│   │   └── ... - React components
│   ├── server/
│   │   └── ... - Server-side code running on AWS Lambda
│   ├── hooks/
│   │   └── debounce.js - The debounce hook used in the search to await.
│   ├── App.tsx - The web application's root component.
│   └── ... - Other files used by the application
│
├── handler.ts - AWS Lambda function handler
├── serverless.yml - Project configuration. 
├── babel.config.js - Babel configuration
├── docker-compose.yml - Run the PgSQL image.
├── jest.config.js - Jest configuration
├── knexfile.ts - Knex configuration
├── webpack.browser.config.js - Webpack configuration for client-side code
├── webpack.server.config.js - Webpack configuration for the Lambda backend
├── products.json - Data to seed the DynamoDB running locally.
└── ...
```

### Changes 

The settings that have been changed from the serverless boiler plate are as follows:
* Added Lambda functions such as `products` and `productSearch`
* Environment configuration in serverless for `development` and `production`
* Environment configuration in serverless for `IS_OFFLINE`
* Code for the API found in `./api/`
* Code for the Front end found in `./App.tsx`

## How To Deploy

To deploy the code, you must first make sure that there is an environment set for deployment in the `serverless.yml` file. Then, run the following command:

```bash
> npm run deploy
```
