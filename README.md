# Car parking app

This is a app to take in a car and spot id and store it in a db.

## Steps to spin up

Prerequisites: docker, node

Step 1: Start the db service

  1. `docker-compose up`

Step 2: Navigate to the backend directory, install dependencies, and start the server

  1. `cd server`
  1. `npm install`
  1. `npm start`

Step 3: Navigate to the frontend directory, install dependencies and start the server

  1. `cd frontend`
  1. `npm install`
  1. `npm start`


## Testing

Testing implemented on server side. Database should get seeded with 1 record on start up and that will be used to test one express endpoint.

Run this command in the server directory:

  1. `npm run test`