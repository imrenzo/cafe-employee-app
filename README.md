# cafe-employee-app

App that allows user to manage Cafes & Employees.

## Requirements
- Latest [docker](https://docs.docker.com/get-started/get-docker/)
- Latest [docker-compose](https://docs.docker.com/compose/install/)

## How to

1. Clone this repository in your local machine.

    ```
    git clone <repository-url>

    cd cafe-employee-app
    ```

    The  `cafe-employee-app` folder will be project root directory.

2. Setup `.env` files.

- Project root(./.env) - for Postgres DB:

    ```
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DATABASE=postgres
    ```
- Backend (./backend/src/.env) – for backend service:

    ```
    PG_HOST=db
    PG_PORT=5432
    PG_USER=postgres
    PG_PASSWORD=postgres
    PG_DATABASE=postgres
    DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
    ```

- Frontend (./frontend/.env) – for frontend service:
    
    ```
    VITE_API_URL=http://localhost:3000
    ```

4. Run the app.
    ```
    docker-compose up --build
    ```

5. Access the webpage locally: Open your browser at: [http://localhost:5173/](http://localhost:5173/)

6. Stopping the app
    ```
    docker-compose down
    ```