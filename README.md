# weather-api-challenge

This repo is a solution for requirements of this <a href="https://github.com/somarmeteorologia/challenge/blob/master/backend/README.md">Somarmeteorologia's backend project</a>.

## Features

<dl>
  <dt>Clean Architecture</dt>
  <dd>
    This project architecture use principles of <a href="https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html">Clean Architecture</a> focused on codebase scalability.
  </dd>

<dt>Domain Driven Design(DDD)</dt>
  <dd>
    Uses <a href="https://martinfowler.com/bliki/DomainDrivenDesign.html">DDD</a> approach to reduce domain complexity and focus the development in domain model.
  </dd>

<dt>Dependency injection</dt>
  <dd>
    Use the technique dependency injection for code not be coupled and make easy to mock dependencies during the tests.
  </dd>

<dt>Web Server Framework</dt>
  <dd>
    Use <a href="https://flask.palletsprojects.com/en/2.3.x/">Flask</a> for requests routing and middlewares. And also uses <a href="https://github.com/flasgger/flasgger">flasgger</a> for creating a doc with SwaggerUI. 
  </dd>

<dt>Database</dt>
  <dd>
    Use <a href="https://www.mongodb.com/docs/manual/">MongoDB</a> as document-oriented database. 
  </dd>

<dt>Query Language</dt>
  <dd>
    Use <a href="https://graphql.org/">GraphQL</a> as data query language for API. And integrates with <a href="https://graphene-python.org/">Grapheme</a>.  
  </dd>

## Quick start

0. Do you need  `<a href="https://docs.docker.com/get-docker"/>`Docker `</a>` installed in your machine.
1. Clone the repository with `git clone https://github.com/matheusfcorocher/weather-api-challenge.git`
2. Go to repository directory `cd weather-api-challenge`
3. Run `docker compose up`
4. Access `http://localhost:5000/` and you're ready to go!

## Endpoints of this api and requirements

1. After initialize the server you go to address `http://localhost:5000/apidocs/` to see all routes of api in Swagger UI.

## Useful commands

This api comes with a collection of commands that you can run:

- `docker compose up --build tests`: Run tests with pytest
- `docker compose down`: Shutdown docker containers
