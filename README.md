# DevIQ — Developer Intelligence Platform (Frontend)

React frontend for the DevIQ platform. Built with Vite, React Router,
and a custom dark theme design system. Provides a professional interface
for recruiters to search GitHub profiles, view analysis results, compare
developers, and manage reports.

> Backend repository: https://github.com/YOUR_USERNAME/deviq-backend

---

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | React 18                            |
| Build Tool    | Vite                                |
| Routing       | React Router v6                     |
| HTTP Client   | Axios                               |
| Styling       | Inline styles + CSS custom theme    |
| Charts        | Recharts                            |
| Fonts         | DM Sans + JetBrains Mono            |
| State         | React Context API (AuthContext)     |

---

## Project Structure
```
Frontend/
├── public/
│   └── deviqlogo.jpg             ← app logo served at root
├── src/
│   ├── api/
│   │   ├── axiosInstance.js      ← base axios with JWT interceptor
│   │   ├── authApi.js            ← login, register, logout, getMe
│   │   ├── githubApi.js          ← analyze GitHub username
│   │   ├── historyApi.js         ← get, delete, clear history
│   │   ├── compareApi.js         ← compare multiple developers
│   │   └── reportApi.js          ← save, get, delete reports
│   ├── context/
│   │   └── AuthContext.jsx       ← global auth state provider
│   ├── hooks/
│   │   └── useAuth.js            ← shortcut to access AuthContext
│   ├── pages/
│   │   ├── LoginPage.jsx         ← sign in form
│   │   ├── RegisterPage.jsx      ← create account form
│   │   ├── DashboardPage.jsx     ← search + history + stats
│   │   ├── AnalyzePage.jsx       ← full profile analysis view
│   │   ├── ComparePage.jsx       ← side by side comparison
│   │   ├── ReportsPage.jsx       ← saved reports list
│   │   └── NotFoundPage.jsx      ← 404 illustration page
│   ├── components/
│   │   ├── Navbar.jsx            ← responsive top navigation
│   │   ├── ProtectedRoute.jsx    ← auth guard for private pages
│   │   ├── ScoreCard.jsx         ← score breakdown component
│   │   └── Loader.jsx            ← fullscreen spinner
│   ├── theme.js                  ← colors, fonts, shared styles
│   ├── App.jsx                   ← routes definition
│   ├── main.jsx                  ← React root entry point
│   └── index.css                 ← global styles + animations
├── .env                          ← local config (never committed)
├── .env.example                  ← env template
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```

---

## Pages

### Public pages — no login required

| Route       | Page            | Description                        |
|-------------|-----------------|-------------------------------------|
| `/login`    | LoginPage       | Email and password sign in form     |
| `/register` | RegisterPage    | Create new recruiter account        |
| `*`         | NotFoundPage    | 404 illustration with back button   |

### Protected pages — login required

| Route                  | Page            | Description                              |
|------------------------|-----------------|------------------------------------------|
| `/dashboard`           | DashboardPage   | Search bar, stats cards, history list    |
| `/analyze/:username`   | AnalyzePage     | Score breakdown, repos, language charts  |
| `/compare`             | ComparePage     | Side by side developer comparison        |
| `/reports`             | ReportsPage     | Saved single and comparison reports      |

---

## Design System

All colors, fonts, and reusable styles live in `src/theme.js`.
This is the single source of truth for the entire app's visual style.

### Color Palette

| Variable       | Value     | Usage                          |
|----------------|-----------|--------------------------------|
| `bg`           | `#0d1117` | Page background                |
| `surface`      | `#161b22` | Cards, navbar, inputs          |
| `surface2`     | `#21262d` | Hover states, secondary cards  |
| `border`       | `#30363d` | All borders                    |
| `textPrimary`  | `#e6edf3` | Headings, primary text         |
| `textSecondary`| `#8b949e` | Labels, nav links              |
| `textMuted`    | `#6e7681` | Timestamps, subtitles          |
| `blue`         | `#58a6ff` | Links, active states, accents  |
| `blueBg`       | `#1f6feb` | Primary buttons                |
| `green`        | `#3fb950` | High scores (70–100)           |
| `yellow`       | `#d29922` | Medium scores (40–69)          |
| `red`          | `#f85149` | Low scores, errors, danger     |
| `purple`       | `#bc8cff` | Reports accent                 |

### Score Color System

Scores are color coded across the entire app:

| Range   | Color  | Meaning             |
|---------|--------|---------------------|
| 70–100  | Green  | Strong developer    |
| 40–69   | Yellow | Average developer   |
| 0–39    | Red    | Needs improvement   |

### Typography

| Font            | Usage                              |
|-----------------|------------------------------------|
| DM Sans         | All UI text, labels, paragraphs    |
| JetBrains Mono  | Usernames, scores, code values     |

---

## Authentication Flow
```
User visits /dashboard
       ↓
ProtectedRoute checks AuthContext
       ↓
AuthContext checks localStorage for token
       ↓
Calls GET /api/auth/me to verify token
       ↓
Valid?  → render page
Invalid?→ redirect to /login
```

### Token Management

- Access token stored in `localStorage` as `accessToken`
- Axios interceptor automatically attaches token to every request header
- If backend returns 401 — interceptor clears storage and redirects to login
- No manual token handling needed in any page or component

---

## API Layer

All API calls are in `src/api/` folder. Each file handles one resource.
Every file imports from `axiosInstance.js` so the base URL and token
are handled automatically.
```js
// Example — how a component calls the API
import { analyzeUserApi } from '../api/githubApi';

const result = await analyzeUserApi('torvalds');
// result.data.analysis contains full profile + scores + repos
```

### Axios Interceptors
```
Request interceptor  → reads token from localStorage
                     → adds Authorization: Bearer <token> to every request

Response interceptor → if 401 received
                     → clears localStorage
                     → redirects to /login automatically
```

---

## Setup and Installation

### Prerequisites

- Node.js v18 or higher
- Backend server running on port 5000

### Steps
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/deviq-frontend.git
cd deviq-frontend

# Install dependencies
npm install

# Copy env template
cp .env.example .env

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Environment Variables
```bash
VITE_API_URL=http://localhost:5000/api
```

Note: All Vite environment variables must start with `VITE_`.
After editing `.env`, restart the dev server.

### Scripts
```bash
npm run dev      # start development server at localhost:5173
npm run build    # build for production (outputs to dist/)
npm run preview  # preview production build locally
```

---

## Running Both Servers

You need two terminals open simultaneously:
```bash
# Terminal 1 — Backend
cd D:\GPV\Backend
npm run dev
# Server running on http://localhost:5000

# Terminal 2 — Frontend
cd D:\GPV\Frontend
npm run dev
# Server running on http://localhost:5173
```

---

## Responsive Design

The app is fully responsive across all screen sizes.

| Breakpoint   | Behavior                                      |
|--------------|-----------------------------------------------|
| Desktop 900+ | Full navbar with links, 3-column stats grid   |
| Tablet 640+  | Full navbar, 2-3 column layouts               |
| Mobile 640-  | Hamburger menu, 2-column stats, compact cards |

---

## Current Status

### Completed
- [x] Project setup — Vite, React Router, Axios
- [x] Theme system — colors, fonts, shared styles
- [x] Auth context — global login state
- [x] Axios interceptor — automatic token handling
- [x] Login page — dark theme form
- [x] Register page — dark theme form with validation
- [x] 404 Not found page — SVG illustration
- [x] Navbar — responsive with mobile hamburger
- [x] Dashboard page — search, stats cards, history list
- [x] ProtectedRoute — auth guard

### In Progress
- [ ] Analyze page — score breakdown, repos, charts
- [ ] Compare page — side by side developer view
- [ ] Reports page — saved reports list and detail

---

## Git Commit History
```
feat: professional responsive Navbar and Dashboard with theme system
feat: add 404 not found page with SVG illustration
feat: dark theme UI - navbar, login, register pages
feat: frontend setup - Vite, React Router, AuthContext, axios
```

---

## Related Repository

| Repo | Description |
|------|-------------|
| [deviq-backend](https://github.com/YOUR_USERNAME/deviq-backend) | Node.js + Express + MongoDB API |

---

## Author

Built as a final year project demonstrating full-stack MERN development
with professional UI/UX design, React component architecture, JWT
authentication flow, and responsive layout.