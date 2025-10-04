# 📚 Book Club App

A simple full-stack app built with **Node.js + Express + Prisma + PostgreSQL**, managed via **Docker Compose**.
It supports **Authors** and their **Books** with CRUD APIs, and includes seeding for initial data.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL (Dockerized)
- **ORM:** Prisma
- **Containerization:** Docker & Docker Compose
- **Frontend (optional):** React / Next.js (if added)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-club-app.git
cd book-club-app
```

### 2. Start Services with Docker

```bash
docker compose up --build
```

This will start:

- PostgreSQL at `localhost:5432`
- Backend API at `localhost:4000`

### 3. Apply Prisma Migrations

Inside the backend container, run:

```bash
docker compose exec backend npx prisma migrate dev --name init
```

This will apply the schema in `prisma/schema.prisma` to the database.

### 4. Seed the Database

To insert sample authors & books:

```bash
docker compose exec backend npx prisma db seed
```

- Seeds **10 authors** with **3 books each**.
- Safe to run multiple times (uses `upsert` to prevent duplicates).

---

## 📂 Project Structure

```
book-club-app/
│
├── backend/               # Express + Prisma backend
│   ├── src/               # API source code
│   ├── prisma/            # Prisma schema + seed
│   └── package.json
│
├── docker-compose.yml     # Docker services
└── README.md
```

---

## 📡 API Endpoints

### Authors

- `GET /authors` → List all authors
- `POST /authors` → Create new author
- `PUT /authors/:id` → Update author
- `DELETE /authors/:id` → Delete author

### Books

- `GET /books` → List all books
- `POST /books` → Create new book
- `PUT /books/:id` → Update book
- `DELETE /books/:id` → Delete book

---

## 🔧 Common Commands

### Restart containers

```bash
docker compose down && docker compose up --build
```

### Run Prisma Studio (DB browser)

```bash
docker compose exec backend npx prisma studio
```

---

## ✅ Troubleshooting

- **Port already in use (4000/5432)** → Stop conflicting services or update ports in `docker-compose.yml`.
- **Duplicate seed data** → Fixed using `upsert` in the seed script.
- **Reset DB**:

  ```bash
  docker compose exec backend npx prisma migrate reset
  ```

---
## Snapshots of the screens
<img width="1848" height="1082" alt="Screenshot from 2025-10-05 03-01-18" src="https://github.com/user-attachments/assets/a3804c96-3391-40dc-9f26-e33fb57f662b" />
<img width="1848" height="1082" alt="Screenshot from 2025-10-05 03-01-18" src="https://github.com/user-attachments/assets/a3804c96-3391-40dc-9f26-e33fb57f662b" />
<img width="1848" height="1082" alt="Screenshot from 2025-10-05 03-01-11" src="https://github.com/user-attachments/assets/7fe116e9-e3d2-44c6-95c3-477ed43e4f19" />

## 📜 License

MIT


