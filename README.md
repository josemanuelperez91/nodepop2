# WEB-API/Nodejs/MongoDB: Nodepop

_A WEB-API to store and show advertisements of second-hand goods._

This Express application requires [nodejs (12.14.1 or later)](https://nodejs.org/en/download/)
and [mongoDB (4.2.3 or later)](https://www.mongodb.com/download-center)
to run locally.

## URL solución práctica configuración de servidores y despliegue de aplicaciones

### Backend con Node

    ec2-18-132-212-41.eu-west-2.compute.amazonaws.com

### React Avanzado

    18.132.212.41

## Download

Copy or clone this application using Git with:

    git clone https://github.com/josemanuelperez91/nodepop2.git

## Install

Inside the root folder, use NPM to install the required and development dependecies, alongside the ./microservices folder dependecies:

    cd nodepop2
    npm install

Create a .env file with the same constants as the .dev.env

    touch .env

or rename it to make it your .env file

    rename  .dev.env  .env

## Development

This project uses eslint in order to mantain a consistent code. To run a global check you can use the following command

    npm run lint-project -s

To execute lint in a specific file, you can use NPX

    npx eslint [filename]

Or directly:

    .\node_modules\.bin\eslint [filename]

## Testing

It is necessary to previously run seed-db script because a user its required to auth this tests. Check [Getting started](#seed) first.

This project employs jest and supertest in order to run end to end tests. Therefore it is only required to execute this command to run all tests.

    npm run test -s

## Run the App

For running in production mode, execute the following command

    npm run start

For development mode, execute:

    npm run dev

Make sure your MongoDB service is up and ready.

## Run thumbanail microservice

If you want this app to create thumbnails of the image you upload when [you post a new ad](#post), start the microservice with

    npm run start-ms

## <a name="seed"></a> Getting started

To generate sample data and a test-ready user for authorization, run

    npm run seed-db

This will also generate the database and collection structure used in this application.

Now you can access trough a browser to a basic home page with an styled sign of the app data.
By default, in development mode, you will find it at <http://localhost:3000>.

## API

This documentation will help you interact with the Nodepop API. The list of possible
queries are listed below:

### <a name="auth"></a>Authenticate the App

#### Request

`POST /api/authenticate`

#### Query keys and values

- **email** (String): unique email from the user.
- **password** (String): private password from the user.

#### Sample Request

    POST /api/authenticate HTTP/1.1
    Content-Type: application/x-www-form-urlencoded
    email=user@example.com&password=1234

#### Sample Response

    Status: 200 OK
    Content-Type: application/json; charset=utf-8

    {
        "token": "eyJhbGciOi...kpXVCJ9.eyJfaWQi...2MTg1MDcs....2MTcwN30.wyxqcbD..."
    }

### Get list of advertisements (requires authentication)

#### Request

`GET /api/adverts`

#### Query keys and values

- **name** (String): searchs for advertisements with a name that starts with the given value.
- **price** (Number-Number): searchs for advertisements with a price between two given numbers, separated by -. It is possible to ommit one number to not limit the search by its side.
- **tag** (String): searchs for any advertisement that has the given tag name inside its list of tags.
- **sale** (true or false): searchs for advertisements for sale if true is given, or advertisements for purchase if false is given.
- **token** (String): a valid json web token provided previously by the app, required in order to access the API data. Check: [Authenticate the App](#auth). Can also be send on the Authorization header.

#### Query keys and values for navigation

- **skip** (Integer): filters the list of advertisements skipping the given number of data 'rows'.
- **limit** (Integer): filters the list of advertisements stopping after the given number is reached.

#### Query key and value for sorting

- **sort** (String): returns advertisements ordered using the specified data 'column'.

#### Sample Request Query

    /api/adverts/?name=Ad&price=-150&tag=work&sale=true&skip=0&limit=1&sort=name

#### Sample Response

    Status: 200 OK
    Content-Type: application/json; charset=utf-8

    [
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5e9206a172b1371c78762ecd",
            "name": "Ad for sale 1",
            "price": 100,
            "sale": true,
            "image": "samplead1.png",
            "__v": 0
        }
    ]

### Get list of tags

#### Request

This request will retrieve every tag used in the stored advertisements, without duplications.

`GET /api/tags`

#### Sample Response

    Status: 200 OK
    Content-Type: application/json; charset=utf-8

    [
    "lifestyle",
    "motor",
    "work"
    ]

### <a name="seed"></a> Creating Advertisement (requires authentication)

#### Request

`POST /api/adverts/`

#### Valid keys and data types (x-www-form-urlencoded)

- **name** (String)
- **price** (Number)
- **tag** (String, Multiple)
- **sale** (true or false)
- **image** (File, Must be an image file type)
- **token** (String): a valid json web token provided previously by the app, required in order to post data to the API. Check: [Authenticate the App](#auth).Can also be send on the Authorization header

#### Sample Request

    POST /api/adverts HTTP/1.1
    Content-Type: application/x-www-form-urlencoded
    name=New Ad 3&price=200&sale=true&tag=work&tag=lifestyle

#### Sample Response

    Status: 201 Created
    Content-Type: application/json

    {
        "result": {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5e9230d1d721c82f94c34189",
            "name": "New Ad 3",
            "price": 200,
            "sale": true,
            "__v": 0
        }
    }

#### Error Responses

In case something goes wrong, you can expect some of these errors

### Invalid parameter response

    Status: 422 Unprocessable Entity
    Content-Type: application/json

    {
        "err": {
        "value": "[given value]",
        "msg": "Invalid ...",
        "param": "[key]",
        "location": ["query" | "body"]
        }
    }

### Invalid URL response

    Status: 404 Not Found
    Content-Type: application/json

    {
        "error": "Not Found"
    }

### Invalid or missing token

    Status: 401 Unauthorized
    Content-Type: application/json

    {
        "error": "jwt not found"
    }

### Login failed

    Status: 401 Unauthorized
    Content-Type: application/json

    {
        "success": false,
        "error": "Invalid email or password"
    }
