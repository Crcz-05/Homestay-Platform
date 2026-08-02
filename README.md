This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## How to Run Backend Locally

### Prerequisites

- Node.js installed
- npm installed

### Steps

1. Clone the repository

```bash
git clone <your-github-repository-url>
```

2. Navigate to the backend folder

```bash
cd backend
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file using `.env.example`

Example:

```env
PORT=5000
```

5. Start the backend server

```bash
npm run dev
```

The backend server will start at:

```
http://localhost:5000
```

### Available API Endpoints

- GET `/api/homestays`
- GET `/api/homestays/:id`
- POST `/api/homestays`
- PUT `/api/homestays/:id`
- DELETE `/api/homestays/:id`
- GET `/api/search?q=keyword`

---

# Database Choice

This project uses **Supabase (PostgreSQL)** as the cloud database.

### Why Supabase?

- Free cloud PostgreSQL database
- Easy integration with Express.js
- Supports CRUD operations
- No local database installation required
- Easy deployment with Vercel

---

# Database Schema

(Add your schema diagram image here after creating it.)

Example:

![Schema Diagram](schema-diagram.png)

---

# Set Up the Database

1. Create a Supabase project.
2. Create a table named `homestays` with the following columns:

| Column | Type |
|---------|------|
| id | bigint (Primary Key) |
| name | text |
| location | text |
| price | integer |
| created_at | timestamp |

3. Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key
```

4. Install dependencies:

```bash
npm install
```

5. Start the backend:

```bash
node server.js
```

6. Start the frontend:

```bash
npm run dev
```
