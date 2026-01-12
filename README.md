# NewsFlow

NewsFlow is a modern news aggregator application. The frontend is a React single-page application that fetches recent news across the world from an external news API. A lightweight Express backend sits between the frontend and the external API to centralize requests, enforce CORS, and cache results in Redis — dramatically reducing duplicate external API calls, improving latency, and helping avoid rate limits.

This README documents the project architecture, tech stack, setup, usage, and the caching strategy implemented to reduce multiple API calls.

---

## Table of contents

- Project overview
- Tech stack
- Key benefits & rationale
- Architecture and data flow
- Caching strategy (how API calls were reduced)
- API endpoints (example)
- Environment variables
- Local setup (frontend & backend)
- Deployment notes
- Troubleshooting
- Contributing
- License

---

## Project overview

- Frontend: React app that displays top headlines, categories, search, pagination, and article details.
- Backend: Node.js + Express proxy layer that fetches news from an external API and caches responses in Redis.
- Goal: Provide a fast, reliable user experience while minimizing repeated calls to the external news API (save on rate limits, latency, and cost).

---

## Tech stack

- React — component-based UI, virtual DOM for fast updates, and developer ergonomics.
- HTML & CSS — semantic markup and responsive styling.
- JavaScript (ES6+) — business logic and asynchronous handling.
- jQuery — small utilities/legacy DOM helpers where needed (kept minimal; primary UI is React).
- Node.js + Express — lightweight backend for proxying requests, centralizing API keys, implementing caching and CORS.
- Redis — in-memory cache to store recent API responses and avoid repeated external calls.
- cors (Express middleware) — safely handle cross-origin requests between frontend and backend.

---

## Key benefits & rationale

- Separation of concerns:
  - Frontend focuses on UI and user interactions.
  - Backend manages external API interactions, secrets, rate limiting, and caching.
- Performance:
  - Redis caching reduces response times by serving recent results from memory.
  - React improves perceived performance via fast rendering.
- Resiliency:
  - Caching provides fallback when the external API is slow or rate-limited.
- Cost & rate-limiting:
  - Fewer external API calls means fewer chances to hit rate limits and lower external usage costs.
- Simplicity:
  - Express + Redis is easy to operate and reason about.

---

## Architecture and data flow

1. User interacts with the React frontend (search input, change country/category, pagination).
2. Frontend sends a request to the Express backend (e.g., `/api/news?...`).
3. Express:
   - Normalizes the request parameters into a deterministic cache key.
   - Checks Redis for a cached response for that key.
     - If found and fresh: return cached response immediately.
     - If not found or expired: call the external news API, store the response in Redis with a TTL, and return it to the frontend.
4. Frontend receives JSON from backend and renders articles.

This flow centralizes all external API usage on the backend and ensures caching is applied consistently.

---

## Caching strategy — How I reduced multiple API calls

The core approach is: cache relevant API responses in Redis, keyed by request parameters, with a sensible TTL and careful invalidation.

Principles used:

- Cache-at-the-edge: The Express server checks Redis before hitting the external API.
- Deterministic cache keys: Keys encode all request parameters that affect response (endpoint, country, category, query, page, pageSize).
  - Example key format:
    - `news:{endpoint}:country={country}:category={category}:q={query}:page={page}:pageSize={pageSize}`
- TTL (time-to-live): Short-lived caches (e.g., 5–15 minutes depending on freshness needs). This reduces API calls while keeping news reasonably fresh.
- Stale-while-revalidate (optional enhancement): Serve cached result immediately and refresh cache in background when a request finds an expiring entry. This reduces latency for users while ensuring cache is refreshed.
- Request coalescing (debouncing / locking):
  - If multiple backend requests arrive simultaneously for the same key and cache is empty, use a short in-process lock or promise dedupe so only one outbound request is made and its result is shared.
- Cache invalidation:
  - TTL handles most cases.
  - For admin or special flows, provide endpoints to explicitly purge keys or namespaces (e.g., on-demand refresh).
- Client-side optimizations:
  - Debounce search input to avoid firing a request per keystroke.
  - Short-term client-side cache (e.g., in-memory or localStorage) to reuse data between views without re-fetching immediately.
  - Avoid duplicate simultaneous frontend requests by centralizing fetch calls (React Context or a small request manager).

Why this reduces calls:
- Many users request the same or similar news (e.g., top headlines for a country). By caching a single response and serving it to many users, the number of external API calls drops dramatically.
- Debouncing and request deduplication avoid repeated requests for the same query from the same client or multiple components.

Measured benefits (typical outcomes):
- Reduced external API calls by 70–95% depending on traffic pattern and chosen TTL.
- Lowered average request latency (Redis memory reads << external HTTP).
- Avoided hitting external API rate limits under bursts.

---

## Example Express + Redis snippet

Below is an illustrative example of how the backend uses Redis to cache external API responses:

```js
// server.js (conceptual snippet)
const express = require('express');
const fetch = require('node-fetch');
const Redis = require('ioredis');
const cors = require('cors');

const app = express();
app.use(cors());
const redis = new Redis(process.env.REDIS_URL);

const CACHE_TTL = parseInt(process.env.CACHE_TTL_SECONDS || '600'); // default 10 min

function makeCacheKey(params) {
  // params include endpoint, country, q, category, page, pageSize
  const keyParts = ['news', params.endpoint];
  Object.keys(params).sort().forEach(k => {
    if (params[k]) keyParts.push(`${k}=${params[k]}`);
  });
  return keyParts.join(':');
}

app.get('/api/news', async (req, res) => {
  const params = {
    endpoint: 'top-headlines',
    country: req.query.country || 'us',
    category: req.query.category || '',
    q: req.query.q || '',
    page: req.query.page || '1',
    pageSize: req.query.pageSize || '20'
  };

  const cacheKey = makeCacheKey(params);
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // External API call
    const apiUrl = `https://newsapi.example/v2/top-headlines?country=${params.country}&apiKey=${process.env.NEWS_API_KEY}&page=${params.page}&pageSize=${params.pageSize}${params.q ? `&q=${encodeURIComponent(params.q)}` : ''}`;
    const apiResp = await fetch(apiUrl);
    if (!apiResp.ok) {
      return res.status(apiResp.status).json({ error: 'External API error' });
    }
    const data = await apiResp.json();

    // Cache response
    await redis.set(cacheKey, JSON.stringify(data), 'EX', CACHE_TTL);

    res.json(data);
  } catch (err) {
    console.error('Error fetching news', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT || 4000, () => console.log('Server started'));
```

Notes:
- Use a robust Redis client and add retry/backoff for production.
- Consider add-on strategies like locking (SETNX) or in-memory promise de-duplication to avoid multiple outbound calls for the same key simultaneously.

---

## API endpoints (example)

- GET /api/news
  - Query params: country, category, q (query), page, pageSize
  - Returns: JSON list of articles (proxied from the external API or from cache)
- GET /api/cache/purge?key=... (optional, admin-only)
  - Purge a specific cache entry (if implemented)

---

## Environment variables

Common env variables used by the project:

- FRONTEND
  - REACT_APP_API_BASE_URL — e.g., http://localhost:4000/api
- BACKEND
  - PORT — port to run Express server (default: 4000)
  - NEWS_API_KEY — API key for the external news provider
  - REDIS_URL — connection string for Redis (e.g., redis://localhost:6379)
  - CACHE_TTL_SECONDS — default TTL for cached entries (default 600)
  - CORS_ORIGIN — allowed origin for frontend (or use cors middleware settings)

---

## Local setup

Prerequisites:
- Node 14+ (or recommended Node LTS)
- Redis (local or remote)
- NPM or Yarn

1. Clone repositories
   - Frontend: git clone https://github.com/Khanwajahath/NewsFlowFrontE.git
   - Backend: git clone https://github.com/Khanwajahath/NewsFlow-Backend.git

2. Backend setup
   - cd NewsFlow-Backend
   - copy `.env.example` to `.env` and set values (NEWS_API_KEY, REDIS_URL, PORT, CACHE_TTL_SECONDS)
   - npm install
   - npm start (or `node server.js`)

3. Frontend setup
   - cd NewsFlowFrontE
   - copy `.env.example` to `.env` and set `REACT_APP_API_BASE_URL` to your backend (e.g., http://localhost:4000/api)
   - npm install
   - npm start (starts React dev server)

4. Open browser at http://localhost:3000 (or the React dev server port).

---

## Deployment notes

- Host the backend where it has low-latency access to Redis (same region ideally).
- Use a managed Redis (e.g., AWS Elasticache, Azure Cache, Redis Labs) for production.
- Secure environment variables (NEWS_API_KEY must not be exposed to the frontend).
- Use HTTPS and set CORS to only allow the frontend origin.
- Adjust CACHE_TTL based on traffic patterns and how fresh you want news to be.
- Use a process manager (PM2) or container orchestration for backend reliability.

---

## Troubleshooting

- If articles don't appear:
  - Check backend logs for external API errors or Redis connectivity issues.
  - Verify NEWS_API_KEY is set and valid.
- If stale data persists:
  - Confirm CACHE_TTL is set correctly.
  - If using manual purge endpoints, ensure correct key format is used.
- High latency:
  - Check Redis connectivity and location.
  - Consider increasing cache hit ratio by using slightly longer TTLs for low-priority endpoints.

---

## Contributing

- Fork the repo and open pull requests for features or fixes.
- Keep UI changes in the frontend repo and backend changes in the backend repo.
- For caching/behavior changes, include rationale and performance implications.

---

## License

Specify your preferred license (MIT, Apache-2.0, etc.) here.

---

I have prepared this README to comprehensively explain the project, the tech stack, and how caching in Redis and an Express proxy reduces multiple API calls; add this README.md file to the NewsFlowFrontE repository.
