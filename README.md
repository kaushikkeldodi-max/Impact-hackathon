# Applicant Journey

A polished, local-first demo for planning an international applicant journey. The React frontend is backed by a small NestJS API that serves editable in-memory demo data.

## What is included

- **Landing page** with a guided overview and calls to action.
- **Sign in and registration** backed by API endpoints (demo credentials are listed below).
- **Applicant dashboard** with profile completeness, qualification summary, and journey progress.
- **Onboarding** to update goals and profile details, and add document metadata to the demo account.
- **Personalized roadmap** and recommended resources loaded from the API.
- **NestJS API** for authentication, profile, journey, roadmap, qualification, documents, checklist, CV, notifications, and orchestration.

This is a demo, not a production identity or document service. API state is held in memory and resets when the backend restarts. Registration requires a password of at least 8 characters; passwords are stored as salted scrypt hashes, not plaintext. The document form submits file metadata only; it does not store file contents. Demo session tokens are not JWTs and do not protect API routes.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

Open two terminals from the project root.

### 1. Start the API

```powershell
cd backend
npm install
npm run start:dev
```

The API listens on `http://localhost:3100/api` when using the provided `.env.example` (`PORT=3100`); without a `PORT` setting it defaults to `http://localhost:3000/api`. Confirm it is running at the configured `/api` URL (the root endpoint returns `Hello World!`).

### 2. Start the frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`; port `5174` is also supported if `5173` is already in use). Set `VITE_API_BASE_URL` in `frontend/.env.local` to the API URL; the provided example points to `http://localhost:3100/api`.

### Environment variables

Copy the root `.env.example` to `backend/.env` to configure the API port. Copy `frontend/.env.example` to `frontend/.env.local` to configure the API URL. Change `VITE_API_BASE_URL` if the API runs somewhere other than `http://localhost:3100/api`. Vite variables must use the `VITE_` prefix.

### Demo account

- Email: `demo.applicant@example.com`
- Password: `Demo@123`

You can also register a temporary account from the sign-up page. Accounts live only for the lifetime of the API process.

## Build

```powershell
cd frontend
npm run build

cd ..\backend
npm run build
```

## API reference

All routes are prefixed with `/api`.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | API health response |
| `POST` | `/auth/login` | Sign in with email and password |
| `POST` | `/auth/register` | Create an in-memory demo account |
| `GET`, `PATCH` | `/applicants/profile` | Read or update the applicant profile |
| `GET` | `/journey` | Journey stages and completion |
| `GET` | `/roadmap` | Roadmap phases and tasks |
| `GET` | `/checklist` | Final document checklist |
| `GET` | `/documents` | Applicant documents |
| `POST` | `/documents/upload` | Add demo document metadata (`name`, `type`) |
| `GET` | `/qualification` | Qualification score and assessment |
| `GET` | `/sources` | Recommended resources |
| `GET` | `/cv` | Generated CV preview data |
| `GET` | `/notifications` | Applicant notifications |
| `PATCH` | `/notifications/:id/read` | Mark a notification as read |
| `POST` | `/agent/orchestrate` | Run the demo journey orchestration |

Example document request:

```json
{
  "name": "degree-certificate.pdf",
  "type": "Degree Certificate"
}
```
