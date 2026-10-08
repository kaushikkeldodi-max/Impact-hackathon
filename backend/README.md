# Backend

The NestJS demo API serves applicant journey data and simple in-memory auth/profile/document actions. It listens on port `3000` by default and exposes routes under `/api`.

For setup, environment variables, demo credentials, and the route reference, see the [project README](../README.md).

```powershell
npm install
npm run start:dev
```

No database or external API keys are required. State and demo registrations reset when the API process restarts. This API is for local demos only; routes are not protected by production authentication.
