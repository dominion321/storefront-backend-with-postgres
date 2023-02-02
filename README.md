# Storefront Backend Project

## Getting Started
- This repo contains the backend solution of the storfront backend project. To get started, clone this repo and run `npm install` in your terminal at the project root. 

## Setup and Required Document edits 
- To make this application tailored to your specifications, you need to create a `.env` file. Follow the requirements for that file from the `.example-env` file.
- You would also need to run `docker compose up` to set up the database for the application.
- Afterwards, run `db-migrate up` to create all given tables.

## Scripts to run
- To get started with the application, run <code>npm install</code> in your console.

- To build and run the application, run <code>npm run watch</code>.

- To test the application, run <code>npm run test</code>.

## Endpoints
This application 

### Orders
You can create orders, get all orders, get orders by an id number, get completed and active orders. The following outline how this is carried out:

- GET route: 'api/orders' [GET]
- SHOW route: 'api/orders/:id' [GET]
- - POST route: 'api/orders' [POST] -

## Required Technologies
Your application uses the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion