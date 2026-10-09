# eFolio 10.1 / 10.2 – Weather API and Books API

Builds on the eFolio 9 setup in `EFOLIO_9.md` (Firebase project, `.env.local`, deployed functions).

## What's new

| File | Purpose |
| --- | --- |
| `src/views/WeatherView.vue` | `/weather` – current-location weather (10.1) and search by city (10.2), °C with icon |
| `functions/index.js` → `getAllBooks` | HTTP function returning every book as JSON (10.2) |
| `src/views/GetAllBookAPI.vue` | `/GetAllBookAPI` – calls `getAllBooks` and shows the JSON (10.2) |
| `src/views/CountBookAPI.vue` | `/CountBookAPI` – number of books (from eFolio 9, reused for 10.1 set 2) |

## Setup

1. Get a free OpenWeatherMap key at <https://home.openweathermap.org/api_keys>
   (new keys can take up to ~1–2 hours to activate; until then the page shows "Invalid API key").
2. Deploy the new function: `firebase deploy --only functions`.
3. Add to `.env.local` (see `.env.example`):
   ```
   VITE_OPENWEATHER_API_KEY=<your key>
   VITE_GET_ALL_BOOKS_URL=<getAllBooks URL printed by the deploy>
   ```
4. `npm run dev`. Restart it after editing `.env.local`.

## Screenshots

**10.1 – set 1 (current location weather):** open `/weather` and click **Allow** when the
browser asks for location. Show the weather card next to VS Code with
`fetchCurrentLocationWeather` in `WeatherView.vue`.

**10.1 – set 2 (number of books):** `/CountBookAPI` showing "Total number of books: N"
next to `countBooks` in `functions/index.js` and `CountBookAPI.vue`.

**10.2 – set 1 (search by city):** type `Clayton, AU` and click **Search**. The card shows
Clayton, the temperature in °C and the weather icon. In VS Code show `searchByCity` and
`fetchWeather` (note `units: 'metric'` for Celsius and the icon URL).

**10.2 – set 2 (all books as JSON):** open `/GetAllBookAPI` and show the JSON list next to
`getAllBooks` in `functions/index.js` and `GetAllBookAPI.vue`. You can also open the
`getAllBooks` function URL directly in a browser tab to show the raw JSON response.
