# fast-food
### Introduction

This is the REST API documentation for an online delivery application. The API provides endpoints for guest users to view items and submit orders.

### Build Instructions
1. Install the required dependencies using npm:
`npm install`

2. Start the development server by running the following command:
`npm run start:dev`

### Users Endpoints

#### Login a User
`POST /users`

##### Description 
This endpoint is used for user authentication and allows merchant to log in to the system.

##### Request Body
```{"username":"John7","password":"12345"}```

##### Response:
`200 OK` on success.
`401 Unauthorized` on wrong credentials.
`422 Unprocessable Entity` if the request body is invalid.

```{"msg":"Success","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5zbWl0aEBleGFtcGxlLmNvbSIsInVzZXJJZCI6IjYzZTQyZDA4OTIzYzkzYmVmZGZkZDZiNiIsImlhdCI6MTY3NjIyNDM4MywiZXhwIjoxNjc2MjI3OTgzfQ.i161re_CELSHwc3JRutjC1L8aDidBUCT3xgVLuhgAqg"}```

### Categories Endpoints

#### View all Categories
`GET /categories` 

##### Description 
This endpoint returns a list of all categories.

##### Response:
`200 OK` on success.
`404 Not Found` if categories do not exist.

```{"msg":"Success","data":[{"_id":"63e2b85de877c0deffba5eb8","name":"Appetizers","__v":0},{"_id":"63e2b866e877c0deffba5eba","name":"Drinks","__v":0},{"_id":"63e2b86de877c0deffba5ebc","name":"Main Dishes","__v":0}]}```

### Products Endpoints

#### View Category Products
`GET /products?currentPage=${page}&categoryId=${id}`

##### Description 
This endpoint returns a list of all products in a category.

##### Response:
`200 OK` on success.
`404 Not Found` if products on this category do not exist.

```{"msg":"Success","data":[{"_id":"63e4e50fd36b8f92bbfb1c51","name":"Pan-Fried Salmon with Lemon Butter Sauce","price":22.99,"description":"Wild-caught salmon fillet pan-fried until crispy and topped with a simple yet delicious lemon butter sauce. Served with garlic roasted potatoes and steamed vegetables","imageUrl":"https://s3.us-east-2.amazonaws.com/maindishes-images/panfried-salmon.jpeg"},{"_id":"63e541df57bfbcce59d95381","name":"Grilled Rib-Eye Steak","price":32.99,"description":"Thick cut, aged rib-eye steak grilled to perfection and served with mashed potatoes and grilled asparagus. Topped with a red wine reduction sauce.","imageUrl":"https://s3.us-east-2.amazonaws.com/maindishes-images/grilled-ribeye-steak.jpeg"}],"totalItems":4}```

#### Create New Product
`POST /products`

##### Description 
This endpoint allow a authenticated user to create a new product.

##### Request Body
```{"name":"Grilled Rib-Eye Steak","description":"Thick cut, aged rib-eye steak grilled to perfection and served with mashed potatoes and grilled asparagus. Topped with a red wine reduction sauce.","price":32.99,"imageUrl":"https://s3.us-east-2.amazonaws.com/maindishes-images/grilled-ribeye-steak.jpeg","categoryId":"63e2b86de877c0deffba5ebc"}```

##### Response:
`201 Created` on success.
`500 Bad Request` if any required field is missing.

```{"msg": "Success"}```

### Orders Endpoints

#### View all Orders
`GET /orders?currentPage=${page}`

##### Description 
This endpoint allow a authenticated user to view all orders.

##### Response:
`200 OK` on success.
`401 Unauthorized` if the user is not authenticated.
`404 Not Found` if orders do not exist.

```{"msg":"Success","data":[{"_id":"63e7c93c850c9b006e205746","total_amount":27.99,"status":"PENDING","name":"Jane Smith","email":"janesmith@example.com","phone_number":"555-555-5556","order_date":"2023-02-11T16:58:36.672Z"},{"_id":"63e7cb7077ee5dbbfa4dc6bd","total_amount":39.97,"status":"PENDING","name":"Emma Watson","email":"emmawatson@example.com","phone_number":"555-555-5557","order_date":"2023-02-11T17:08:00.464Z"}],"totalItems":4}```

#### View specific Orders
`GET /orders/${id}`

##### Description 
This endpoint allow a authenticated user to view an order.

##### Response:
`200 OK` on success.
`401 Unauthorized` if the user is not authenticated.
`404 Not Found` if order does not exist.

```{"msg":"Success","data":{"_id":"63e7c93c850c9b006e205746","total_amount":27.99,"status":"PENDING","name":"Jane Smith","email":"janesmith@example.com","phone_number":"555-555-5556","street":"Oak Ave.","apartment":"456","city":"Los Angeles","zip":"90001","country":"USA","order_date":"2023-02-11T16:58:36.672Z"},"products":[{"_id":"63e2c4e7309887fa1da6a8e4","name":"Mojito","price":7.5,"description":"A classic Cuban cocktail made with rum, lime, sugar, mint and soda water.","imageUrl":"https://www.example.com/images/mojito.jpg"},{"_id":"63e2c57a309887fa1da6a8e6","name":"Grilled Chicken","price":12.99,"description":"Tender, juicy chicken breast marinated in spices and grilled to perfection.","imageUrl":"https://www.example.com/grilled-chicken.jpg"}]}```

#### Create a new Order
`POST /orders`

##### Description 
This endpoint allow a guest user to create an order.

##### Request Body
```{"customer":{"name":"John Doe","email":"johndoe@example.com","phoneNumber":"+5557556555","street":"123 Main St.","apartment":"Apt. 5","city":"New York","zip":"10001","country":""},"products":[{"pid":"63e2c57a309887fa1da6a8e6","quantity":3},{"pid":"63e2c590309887fa1da6a8e8","quantity":2}]}```

##### Response:
`201 Created` on success.
`404 Not Found` if some order product does not exist.
`422 Unprocessable Entity` if the request body is invalid.
`500 Bad Request` if any required field is missing.

```{"msg": "Success"}```