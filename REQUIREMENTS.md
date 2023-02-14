# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- Completed Orders by user (args: user id)[token required]

## Data Shapes
The following are the data shapes of the given tables in the application.
#### Product
-  id: integer
- name: varchar(64)
- price: integer
- category: varchar

#### User
- id: integer
- firstName: varchar(100)
- lastName: varchar(100)
- password: varchar

#### Orders_Products
- id: integer
- id of each product in the order: big integer
- id of the given order: big integer
- quantity of each product in the order: integer

#### Orders
- id: integer
- status of order (active or complete) : varchar(64)
- user_id: big integer

