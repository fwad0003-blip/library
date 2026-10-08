# eFolio 9.1 / 9.2 – Firebase Cloud Functions

## What's in the project

| File | Purpose |
| --- | --- |
| `functions/index.js` | `countBooks` (HTTP, 9.1) and `capitaliseBookData` (Firestore trigger, 9.2) |
| `src/views/CountBookAPI.vue` | `/CountBookAPI` – calls `countBooks` and shows the number of books |
| `src/views/AddBookView.vue` | `/addbook` – adds a book to Firestore and live-shows *as entered* vs *capitalised* |
| `src/firebase/init.js` | Firebase web config, read from `.env.local` |
| `firebase.json`, `.firebaserc`, `firestore.rules` | Firebase CLI project config |

## One-time setup

1. Firebase console → upgrade the project to the **Blaze** plan (Cloud Functions need it).
2. Firestore Database → create database (if you haven't already).
3. Install the CLI and log in:
   ```sh
   npm install -g firebase-tools
   firebase login
   ```
4. Put your project id in `.firebaserc` (replace `your-firebase-project-id`).
5. Copy `.env.example` to `.env.local` and fill in the values from
   Project settings → Your apps → SDK setup and configuration.

## Deploy the functions

```sh
cd functions && npm install && cd ..
firebase deploy --only functions
```

The output prints a URL like
`https://us-central1-<project-id>.cloudfunctions.net/countBooks` (or a `*.run.app` URL).
Put it into `VITE_COUNT_BOOKS_URL` in `.env.local`, then run the app:

```sh
npm install
npm run dev
```

## Screenshots

**9.1 – set 1 (deployed function):** Firebase console → Functions, showing `countBooks`
and `capitaliseBookData` with your account avatar/email visible top-right.

**9.1 – set 2 (count books):** VS Code with `functions/index.js` (`countBooks`) and
`src/views/CountBookAPI.vue` open, next to the browser at
`http://localhost:5173/CountBookAPI` showing "Total number of books: N".

**9.2 – capitalisation:** Suggested way to show the outcome:
1. Browser at `/addbook`, type a book in lower case (e.g. `the hobbit` / `j.r.r. tolkien`) and click **Add Book**.
2. The table shows the *As entered* column (lower case) next to the *Stored in Firestore*
   column (UPPER CASE) with a green "Capitalised by Function" badge – the row updates live
   because the page listens with `onSnapshot`.
3. Firebase console → Firestore → `books` → the document: upper-case fields plus
   `originalData` (lower case) and `capitalisedAt`.
4. Firebase console → Functions → Logs: the "Capitalising book …" entry with before/after.
5. VS Code showing `capitaliseBookData` in `functions/index.js` and `AddBookView.vue`.

## Testing locally without deploying (optional)

```sh
firebase emulators:start --only functions,firestore
```

In `.env.local` set `VITE_USE_EMULATORS=true` and
`VITE_COUNT_BOOKS_URL=http://127.0.0.1:5001/<project-id>/us-central1/countBooks`.
Note: the assignment screenshots need the **deployed** version, not the emulator.
