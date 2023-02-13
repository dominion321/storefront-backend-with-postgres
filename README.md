# Storefront Backend Project

## Getting Started
- This repo contains the backend solution of the storfront backend project. To get started, clone this repo and run `npm install` in your terminal at the project root. 

## Setup and Required Document edits 
- To make this application tailored to your specifications, you need to create a `.env` file. Follow the requirements for that file from the `.example-env` file.
- You would also need to run `docker compose up` to set up the database for the application. 
### Note:
 Having the docker desktop application is a requirement to carry out this operation. To install, visit [this website](https://docs.docker.com/engine/install/)

## Scripts to run
- To get started with the application, run <code>npm install</code> in your console.

- Afterwards, run `db-migrate up` to create all given tables.

- To build and run the application, run <code>npm run watch</code>. The appliation runs on port 3000 of the localhost. Type in `http://localhost:3000` to open the application in the browser.

- To test the application, run <code>npm run test</code>.

## Endpoints

### Orders
You can create orders, get all orders, get orders by an id number, get completed and active orders. The following outline how this is carried out:

- GET route: `'api/orders'` [GET]
- SHOW route: `'api/orders/:id'` [GET]
- POST route: `'api/orders'` [POST] 
- GET COMPLETE ORDER route: `'api/orders/complete/:id'` [SHOW]
- GET ACTIVE ORDER route: `'api/orders/active/:id'` [SHOW]
- POST PRODUCTS IN ORDER route `'api/orders/:id/products'` [POST]

### Products
You can create products, get all products, get products by an id number, get products by category, and delete a product. The following outline how this is carried out:

- GET route: `'api/products'` [GET]
- GET route: `'api/products/category/:category'` [GET]
- SHOW route: `'api/products/:id'` [GET]
- POST route: `'api/products'` [POST] 
- DELETE route: `'api/products/:product_id'` [DELETE]

### Users
You can create users, get all users but based on JWT Authorization, get users by id but based on JWT Authorization The following outline how this is carried out:

- GET route: `'api/users'` [GET]
- SHOW route: `'api/users/:id'` [GET]
- POST route: `'api/users'` [POST] 

### Extras
In order to get all products that may have been added to an order, you can view this through the endpoint below:

- GET product in orders route: `'api/dashboard/products_in_order'` [GET]

## Required Technologies
This application uses the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

