# Currency Convertion App

## Demo 

The live demo is here: [Convertion APP](http://13.112.168.250:8080/).

This link may not be work if your are running under a proxy.This is a AWS EC2 instance's public url.

This application is dockerized and running on this EC2. 

## Installation By Docker

First need to setup docker in your machine. 
The docker installation link [Docker Intsall](https://docs.docker.com/engine/install/)

In the `Source` directory, you can run:

```bash
docker compose up
```

Open [http://localhost:8080](http://localhost:8080) to view the UI in the browser.

Open [http://localhost:8081](http://localhost:8081) to view Swagger UI for API in the browser.


## Local Installation

### Prerequistics
* Node JS latest version : [Node JS](https://nodejs.org/en/download/)
* Mongo DB : [MongoDB](https://www.mongodb.com/docs/manual/installation/)

Start mongo db service ensure that running on port 27017, otherwise need to configure this port in `.dev.env file`.

Go to Backend source directory `currency-conversion-api` do the steps for dev build mentioned in README.md  

Go to Frontend source directory `currency-conversion-ui` do the steps for dev build mentioned in README.md

## Environment Configuration

* Got source directory `currency-conversion-api`
* .env for production/default build.
* .env.dev for development build
* Set live data fetch and store interval by `LIVE_DATA_REFRESH_TIME` in seconds.
* Set external coin layer informations in base url:`COIN_LAYER_API_URL` and Access key:`COIN_LAYER_API_KEY`

