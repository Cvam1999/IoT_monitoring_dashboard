# Livello IoT Dashboard (Nest.js + React + Docker)

A complete, dockerized real-time IoT monitoring dashboard:

- **Backend**: Nest.js (REST + GraphQL + WebSocket), JWT Auth (Admin/User), MongoDB (Mongoose)
- **Frontend**: React (Vite), WebSocket live updates, Recharts for history, role-based routes, dark/light mode
- **Simulator**: Generates mock sensor readings continuously and posts to backend
- **Dockerized**: One command local setup via `docker-compose`

## Quick Start (Docker)

```bash
# from project root
docker-compose up --build
```

Services:
- Frontend: http://localhost:5173
- Backend REST: http://localhost:4000/api
- Backend GraphQL Playground: http://localhost:4000/graphql
- WebSocket: ws://localhost:4000

### Default Users

On first run, database is empty.
1. Register an **admin**:
   ```bash
   curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json"      -d '{"email":"admin@example.com","password":"Admin@123","role":"Admin"}'
   ```
2. Register a **user**:
   ```bash
   curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json"      -d '{"email":"user@example.com","password":"User@123","role":"User"}'
   ```

Then login (via UI or curl) to get a JWT, the simulator runs independently.

> **Note:** If you prefer auto-seeding, you can `POST /auth/register` once, or add a seed script easily in `backend/src/auth`.

## Manual Dev (without Docker)

1. **MongoDB**: Ensure MongoDB is running locally at `mongodb://localhost:27017/iot`
2. **Backend**:
   ```bash
   cd backend
   npm i
   npm run start:dev  # http://localhost:4000
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm i
   npm run dev        # http://localhost:5173
   ```

## Architecture Overview

- **Sensors**
  - `POST /sensors/ingest` to store a reading
  - `GET /sensors/latest` for latest readings per device
  - `GET /sensors/history?deviceId=...&from=...&to=...`
  - GraphQL: `readings(deviceId, limit, from, to)`, `createReading(...)`
  - WebSocket: server emits `reading:new` when a new reading is stored

- **Auth**
  - `POST /auth/register` (Admin/User)
  - `POST /auth/login` -> JWT (with role claim)
  - Guards enforce role-based access

- **Simulator**
  - `simulator` service continuously posts random temperature, humidity, power usage for sample devices.

## Testing

```bash
cd backend
npm run test
```

## Environment

See `docker-compose.yml` and `backend/src/app.module.ts`. Defaults:
- `MONGODB_URI=mongodb://mongo:27017/iot`
- `JWT_SECRET=supersecretchangeme`
- `PORT=4000`

