# nestjs_todo

Welcome to this repository!

Here, you'll find the code for a straightforward todo list application. I've used Vite and Reactjs for the frontend, and Nestjs with Docker for the backend.

## Running the application

Before running the application, you'll need to ensure that certain prerequisite tools are installed.

Firstly, you'll need to be able to run the docker-compose command. If you're not already set up with Docker Desktop, that's the easiest solution.

Secondly, you'll need NodeJS installed for both the client and server applications.

Once you have everything installed and Docker up and running on your machine, you can launch a Docker container that runs redis-json, the backend NestJS application, and the frontend React application. To do so, simply navigate to the root of the project and run the following command:
`npm run start`

The `package.json` file located in the root directory of the project contains npm scripts that make it more convenient to run all of the applications and the database simultaneously.

If you prefer, you can also run each application separately by navigating to the appropriate project directory and running the relevant npm script from that project's `package.json` file.
