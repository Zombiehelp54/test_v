# notes-api

A small notes service: users sign in, write notes, attach files, and export
reports.

```bash
npm install
npm start          # http://localhost:3000
```

## Endpoints

| Method | Path | What it does |
|---|---|---|
| POST | `/users/login` | Sign in with email and password, returns a token |
| GET | `/users/search?q=` | Find users by name |
| GET | `/users/:id` | One user's public profile |
| GET | `/notes/:id` | Read a note |
| GET | `/notes/:id/preview` | A note rendered as HTML |
| GET | `/files/:name` | Download an attachment |
| GET | `/reports/export?format=&month=` | Export the month's notes |
| POST | `/webhooks/test` | Send a test event to a webhook URL |
# test_v
