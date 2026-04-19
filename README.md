# Fleet Logistic - Invoice Generator

A modern, multi-step invoice and shipping manifest generator built for the **Technical Test: Junior Fullstack Engineer**. This application allows users to create professional invoices with a wizard-style interface.

## Getting Started (Zero Setup)

The application is fully containerized for a seamless "Zero Setup" experience.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running with Docker Compose

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/raxelf/invoice-generator.git
    cd invoice-generator
    ```

2.  **Start the application**:

    ```bash
    # Menggunakan
    docker compose up --build

    # Atau menggunakan
    docker-compose up --build
    ```

3.  **Access the application**:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:8080](http://localhost:8080)

4.  **Login Credentials**:
    - **Admin Role**: `admin@mail.id` / `admin123`
    - **Kerani Role**: `kerani@mail.id` / `kerani123`

### Stopping the application

- Stop containers and remove the Compose network:
  ```bash
  docker compose down
  ```

- If you also want to remove volumes and reset database data:
  ```bash
  docker compose down -v
  ```

## Tech Stack

### Frontend (Next.js)

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query v5
- **Styling**: TailwindCSS

### Backend (Golang)

- **Framework**: Go Fiber
- **ORM**: GORM
- **Database**: PostgreSQL
- **Authentication**: JWT Middleware

## 👨‍💻 Development Setup (Manual)

If you prefer to run the services outside of Docker:

### Backend

1. Create a PostgreSQL database manually (e.g., named `db_invoice`).
2. `cd server`
3. `go mod download`
4. `go run cmd/api/main.go` (Ensure `.env` matches your local DB credentials)

### Frontend

1. `cd client`
2. `bun install` (or `npm install`)
3. `bun dev` (or `npm run dev`)
