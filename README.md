# DevIQ — Developer Intelligence Platform (Frontend)

React frontend for the DevIQ platform. A professional web application
that allows recruiters to analyze GitHub developer profiles, compare
candidates, and generate structured reports — all without needing a
GitHub account.

> Backend repository: https://github.com/jaykum07/deviq-backend

---

## Overview

DevIQ converts any GitHub username into a structured 0–100 performance
score across 5 dimensions. Built for campus placement coordinators,
HR recruiters, and academic evaluators who need fast, data-driven
insights without manual GitHub browsing.

---

## Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Framework    | React 18                         |
| Build tool   | Vite                             |
| Routing      | React Router v6                  |
| HTTP client  | Axios with interceptors          |
| Charts       | Recharts                         |
| Styling      | Inline styles + CSS variables    |
| Fonts        | DM Sans + JetBrains Mono         |
| State        | React Context API (AuthContext)  |

---

## Project Structure

```
Frontend/
├── public/
│   └── deviqlogo.jpg                ← app logo
├── src/
│   ├── api/
│   │   ├── axiosInstance.js         ← base axios with JWT interceptor
│   │   ├── authApi.js               ← login, register, logout, getMe, updateProfile, changePassword
│   │   ├── githubApi.js             ← analyze GitHub username
│   │   ├── historyApi.js            ← get, delete, clear history
│   │   ├── compareApi.js            ← compare multiple developers
│   │   └── reportApi.js             ← save, get, delete reports
│   │
│   ├── components/
│   │   ├── Navbar.jsx               ← authenticated navbar (sticky, responsive)
│   │   ├── PublicNavbar.jsx         ← public navbar with sign in + get started
│   │   ├── ProtectedRoute.jsx       ← auth guard for private pages
│   │   ├── Loader.jsx               ← fullscreen spinner
│   │   │
│   │   ├── analyze/
│   │   │   ├── ProfileHeader.jsx    ← avatar, name, bio, action buttons
│   │   │   ├── TabNav.jsx           ← overview / repos / analysis tab switcher
│   │   │   ├── ScoreCard.jsx        ← score breakdown with 5 dimension bars
│   │   │   ├── LangChart.jsx        ← reusable donut chart (recharts)
│   │   │   ├── MetricsRow.jsx       ← 4 metric cards (stars, forks, repos, age)
│   │   │   ├── RepoRow.jsx          ← single repo row with hover, click to detail
│   │   │   ├── OverviewTab.jsx      ← composes ScoreCard + LangChart + MetricsRow
│   │   │   ├── ReposTab.jsx         ← full repo list with column headers
│   │   │   ├── AnalysisTab.jsx      ← line chart + 2 donuts + most starred highlight
│   │   │   └── ActivityChart.jsx    ← recharts line chart (activity by quarter)
│   │   │
│   │   ├── compare/
│   │   │   ├── UsernameInput.jsx    ← add/remove username chips
│   │   │   ├── WinnerBanner.jsx     ← top developer highlight with trophy
│   │   │   ├── CompareCard.jsx      ← per-developer score card with dimension bars
│   │   │   └── CompareChart.jsx     ← grouped bar chart comparing all dimensions
│   │   │
│   │   ├── reports/
│   │   │   ├── ReportCard.jsx       ← report list item with type badge and date
│   │   │   ├── ReportDetail.jsx     ← full report modal with snapshot scores
│   │   │   └── EmptyReports.jsx     ← empty state illustration with CTA
│   │   │
│   │   └── modals/
│   │       ├── RepoDetailModal.jsx  ← repo detail popup (stars, forks, topics, dates)
│   │       └── SaveReportModal.jsx  ← save report form (title + notes)
│   │
│   ├── context/
│   │   └── AuthContext.jsx          ← global auth state provider
│   │
│   ├── hooks/
│   │   └── useAuth.js               ← shortcut hook for AuthContext
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx          ← public home — hero, features, scoring, FAQ, footer
│   │   ├── LoginPage.jsx            ← sign in form
│   │   ├── RegisterPage.jsx         ← create account form
│   │   ├── DashboardPage.jsx        ← search bar, stats cards, search history
│   │   ├── AnalyzePage.jsx          ← full profile analysis with 3 tabs
│   │   ├── ComparePage.jsx          ← compare 2–4 developers side by side
│   │   ├── ReportsPage.jsx          ← saved reports with filter tabs
│   │   ├── ProfilePage.jsx          ← edit name, change password, account stats
│   │   ├── GuidePage.jsx            ← how it works, scoring criteria, FAQ
│   │   └── NotFoundPage.jsx         ← 404 illustration page
│   │
│   ├── utils/
│   │   ├── analyzeHelpers.js        ← timeAgo, scoreGrade, LANG_COLORS, buildActivityData
│   │   └── compareHelpers.js        ← scoreColor, DIMENSION_LABELS, COMPARE_COLORS
│   │
│   ├── theme.js                     ← colors, fonts, shared style objects
│   ├── App.jsx                      ← all routes defined here
│   ├── main.jsx                     ← React root entry point
│   └── index.css                    ← global styles + animations
│
├── .env                             ← local config (never committed)
├── .env.example                     ← env template
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```

---

## Pages and Routes

### Public pages — no login required

| Route       | Page            | Description                                    |
|-------------|-----------------|------------------------------------------------|
| `/`         | LandingPage     | Hero, features, scoring criteria, FAQ, footer  |
| `/login`    | LoginPage       | Email and password sign in                     |
| `/register` | RegisterPage    | Create recruiter account                       |
| `/guide`    | GuidePage       | Full guide with steps, scoring, limitations    |
| `*`         | NotFoundPage    | 404 with SVG illustration                      |

### Protected pages — login required

| Route                | Page          | Description                                      |
|----------------------|---------------|--------------------------------------------------|
| `/dashboard`         | DashboardPage | Search bar, stats, recent search history         |
| `/analyze/:username` | AnalyzePage   | Score breakdown, repos, language charts          |
| `/compare`           | ComparePage   | Side by side comparison with ranking             |
| `/reports`           | ReportsPage   | All saved reports with filter and detail view    |
| `/profile`           | ProfilePage   | Edit name, change password, account stats        |

---

## Design System

All colors, fonts, and reusable style objects live in `src/theme.js`.
This is the single source of truth for the entire app.

### Color palette

| Token           | Value     | Usage                            |
|-----------------|-----------|----------------------------------|
| `bg`            | `#0d1117` | Page background                  |
| `surface`       | `#161b22` | Cards, navbar, inputs            |
| `surface2`      | `#21262d` | Hover states, secondary elements |
| `border`        | `#30363d` | All borders                      |
| `textPrimary`   | `#e6edf3` | Headings, primary text           |
| `textSecondary` | `#8b949e` | Labels, nav links                |
| `textMuted`     | `#6e7681` | Timestamps, subtitles            |
| `textFaint`     | `#484f58` | Very subtle text                 |
| `blue`          | `#58a6ff` | Links, active states, accents    |
| `blueBg`        | `#1f6feb` | Primary buttons                  |
| `green`         | `#3fb950` | High scores, success states      |
| `yellow`        | `#d29922` | Medium scores, warnings          |
| `red`           | `#f85149` | Low scores, errors, danger       |
| `purple`        | `#bc8cff` | Reports, diversity score         |

### Score color system

| Range  | Color  | Grade     |
|--------|--------|-----------|
| 70–100 | Green  | Excellent |
| 40–69  | Yellow | Average   |
| 0–39   | Red    | Weak      |

### Typography

| Font            | Usage                                   |
|-----------------|-----------------------------------------|
| DM Sans         | All UI text, labels, paragraphs         |
| JetBrains Mono  | Usernames, scores, numbers, code values |

---

## Component Architecture

### AnalyzePage breakdown

AnalyzePage.jsx is the most complex page. It is broken into small
focused components rather than one large file:

```
AnalyzePage.jsx         (orchestrator — fetches data, manages state)
├── ProfileHeader.jsx   (avatar, name, bio, GitHub link, save button)
├── TabNav.jsx          (overview / repos / analysis switcher)
├── OverviewTab.jsx
│   ├── ScoreCard.jsx   (5 dimension bars + total score)
│   ├── LangChart.jsx   (donut chart)
│   └── MetricsRow.jsx  (4 metric cards)
├── ReposTab.jsx
│   └── RepoRow.jsx     (clickable repo row)
├── AnalysisTab.jsx
│   ├── ActivityChart.jsx  (line chart by quarter)
│   └── LangChart.jsx      (reused — top repos by stars)
└── Modals
    ├── RepoDetailModal.jsx
    └── SaveReportModal.jsx
```

### Why this structure matters

Each component has exactly one responsibility. If the score card design
needs to change, only ScoreCard.jsx is touched. If the chart library
changes, only LangChart.jsx is updated. This is called the Single
Responsibility Principle — a standard software engineering practice.

---

## Authentication Flow

```
User visits /dashboard
       ↓
ProtectedRoute checks AuthContext
       ↓
AuthContext reads localStorage for accessToken
       ↓
Calls GET /api/auth/me to verify token is still valid
       ↓
Valid?   → render the page
Invalid? → redirect to /login automatically
```

### Token handling

- Access token stored in localStorage as accessToken
- Axios request interceptor attaches token to every request header automatically
- Axios response interceptor watches for 401 → clears storage → redirects to login
- No manual token management needed in any page or component

---

## API Layer

All API calls live in src/api/. Each file handles one resource.
All files import from axiosInstance.js so base URL and token are
handled automatically everywhere.

```js
// Example usage in a component
import { analyzeUserApi } from '../api/githubApi';

const res = await analyzeUserApi('torvalds');
// res.data.analysis = full profile + scores + repositories
```

---

## Setup and Installation

### Prerequisites

- Node.js v18 or higher
- Backend server running on port 5000
- Git

### Steps

```bash
# Clone the repository
git clone https://github.com/jaykum07/deviq-frontend.git
cd deviq-frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Environment variables

```bash
VITE_API_URL=http://localhost:5000/api
```

All Vite environment variables must start with VITE_. After editing
.env restart the dev server with npm run dev.

### Scripts

```bash
npm run dev      # development server at localhost:5173
npm run build    # production build (output to dist/)
npm run preview  # preview production build locally
```

---

## Running Both Servers

You need two terminals open simultaneously:

```bash
# Terminal 1 — Backend
cd D:\GPV\Backend
npm run dev
# Running on http://localhost:5000

# Terminal 2 — Frontend
cd D:\GPV\Frontend
npm run dev
# Running on http://localhost:5173
```

---

## Responsive Design

The app is fully responsive across all screen sizes.

| Breakpoint  | Behavior                                          |
|-------------|---------------------------------------------------|
| 1100px+     | Full layout, 3-column grids, full navbar          |
| 768px–1100  | 2-column grids, compact nav                       |
| 640px–768   | Tablet layout, hamburger menu                     |
| 0–640px     | Single column, mobile drawer, stacked buttons     |

---

## Key Design Decisions

**Inline styles over CSS classes.**
Since Tailwind v4 had configuration issues and this is a first MERN
project, all styling uses JavaScript style objects. This is valid
production React — React Native uses the same pattern. It also makes
component styles co-located and easy to read.

**Theme file as single source of truth.**
All colors, fonts, and reusable style objects are exported from
src/theme.js. Changing the blue accent color means editing one line.

**Separate Public and Auth navbars.**
Public pages show PublicNavbar with Sign in and Get started buttons.
Authenticated pages show Navbar with dashboard links and profile access.
This avoids conditional rendering complexity inside one large component.

**Component folder per feature.**
Analyze components live in components/analyze/, compare in
components/compare/, reports in components/reports/. New developers
can immediately find what they need.

**Snapshot in reports.**
When a report is saved, scores are frozen at that moment. Even if
the developer pushes more code later, the saved report reflects scores
at the evaluation date — exactly like a marksheet.

---

## Bugs Fixed During Development

| Bug | Cause | Fix |
|-----|-------|-----|
| Duplicate history entries | Always creating new history doc | Changed to upsert by userId + username |
| Duplicate report saves | No save state tracking | Added reportSaved boolean, button disabled after save |
| AnalyzePage blank render | Wrong data path | Added fallback for both response structures |
| Compare save failing | analysisId not in compare response | Added analysisId to compare controller results |
| Tailwind classes not applying | Tailwind v4 changed setup entirely | Switched to inline styles + CSS variables |

---

## Git Commit History

```
docs: complete frontend README with full project documentation
feat: add LandingPage with PublicNavbar, features, scoring, FAQ and footer
feat: professional responsive Navbar and ProfilePage redesign
feat: add ProfilePage and GuidePage with scoring criteria and FAQ
feat: add ReportsPage with filter tabs, report cards and detail modal
feat: add ComparePage with winner banner, dimension chart and compare cards
fix:  disable save button after report saved to prevent duplicates
fix:  comparison report save with proper analysisIds validation
fix:  include analysisId in compare controller results response
refactor: break AnalyzePage into proper component structure
feat: enhance AnalyzePage with tabs, repo detail modal and analysis charts
feat: add dashboard page with search bar, stats cards and history list
feat: professional responsive Navbar and Dashboard with theme system
feat: dark theme UI - navbar, login, register pages
feat: add 404 not found page with SVG illustration
feat: frontend setup - Vite, React Router, AuthContext, axios
docs: add frontend README
```

---

## Current Status

### Completed

- [x] Public landing page with hero, features, scoring, FAQ, footer
- [x] Public navbar with Sign in and Get started buttons
- [x] Login and register pages with validation
- [x] JWT auth with automatic token refresh and 401 handling
- [x] Dashboard with search, stats cards, history list
- [x] Analyze page with 3 tabs — Overview, Repos, Analysis
- [x] Repo detail modal with stars, forks, topics, dates
- [x] Save report from analyze page with duplicate prevention
- [x] Compare page with winner banner and dimension chart
- [x] Compare report save
- [x] Reports page with filter tabs and full report detail modal
- [x] Profile page with edit name and change password
- [x] Guide page with steps, scoring criteria, limitations, FAQ
- [x] 404 not found page with SVG illustration
- [x] Fully responsive — mobile, tablet, desktop
- [x] Consistent dark theme design system

### Pending

- [ ] PDF report download
- [ ] Share report via public link

---

## Related Repository

| Repo | Description |
|------|-------------|
| deviq-backend | Node.js + Express + MongoDB REST API |
| Link | https://github.com/jaykum07/deviq-backend |

---

## Author

Built as a Pre final year academic project demonstrating full-stack MERN
development with professional UI/UX design, React component architecture,
JWT authentication, GitHub API integration, and responsive layout.

© 2025 DevIQ — Developer Intelligence Platform