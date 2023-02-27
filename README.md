
# Project Support
### Introduction
Project Support is an open source platform that enable users share causes they're passionate about and actively involved with with the hopes of connecting with other users equally interested in working with them on the given cause.
### Describe 7 User Scenarios
* In this step, you will identify 7 scenarios that your microservice will support. Each scenario should correspond to a separate endpoint your microservice offers. At least 3 endpoints should involve information that is computed from your initial dataset (e.g., may not entirely consist of information from a 3rd party API). Imagine your microservice is offering city statistics.
### Installation Guide
* Clone this repository [here](https://github.com/MdAmir-99/Algo8_Assignment_Microservices.git).
* The develop branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies.
* You can either work with the default mongodb atlas cloud database or use your locally installed MongoDB. Do configure to your choice in the application entry file inside city folder.
* Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
### Usage
* Run (npm start) / (npm run dev) to start the API Gateway application on Port 5000.
* City microservice is run on Port 8080.
    cd city
    npm run dev
* Connect to the API using Postman on port 5000.
* Run services from Api Gateway 
    ex ->  http://localhost:5000/city/topCities
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /city/:cityID | Retrieve a city |
| POST | /city | Add a new city |
| GET | /city/:cityID/averages | Retrieve data on a city&#39;s average characteristics |
| GET | /topCities | Retrieve the list of top cities |
| GET | /city/:cityID/weather | Get the current weather on a city |
| GET | /city/:cityID/transitProvders | Get the list of mass transit providers and links to their websites |
| POST | /city/:cityID/transitProvders | Add a new transit provider |

### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.

### Author
* [Md Amir](https://github.com/MdAmir-99)

