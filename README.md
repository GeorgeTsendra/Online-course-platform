# Online Course (React + Redux Toolkit + Router + MSW) — PNPM

A small demo app for browsing courses, buying them (mocked), and watching videos.  
Built with **React**, **Redux Toolkit**, **React Router**, **Formik/Yup**, **Axios**, and **MSW (Mock Service Worker)**. Uses **pnpm**.

---

## ✨ Features

- **Auth** (login/register) with Formik + Yup validation
- **Protected routes** (redirects to login when no token)
- **Course list** with responsive grid and reusable course cards
- **Mock purchase** flow; keep purchased courses in Redux state
- **Watch video** in a modal (HTML5 `<video>`)
- **Global state** via Redux Toolkit
- **Mock API** via MSW:
  - `POST /api/login`
  - `POST /api/register`
  - `GET /api/courses`
  - `GET /api/purchased`
  - `POST /api/purchase`

---

## Tech Stack

- React 19, React Router
- Redux Toolkit
- Formik + Yup
- Axios (+ shared axios instance)
- MSW (Mock Service Worker)
- TypeScript
- CSS Modules (SCSS)
- CRA (react-scripts) tooling

---

## ✅ Prerequisites

- **Node** 18+ (LTS recommended)
- **pnpm** 8+  
  Install: `npm i -g pnpm`

---

## 🚀 Getting Started

### 1 Install deps

```bash
pnpm install
```

### 2 Start dev server

```bash
pnpm start
```

### 3 Build (production)

```bash
pnpm build
```


## Auth Flow

- On successful login/register, API returns a token.
- Token is saved to localStorage (see utils/auth.ts).
- A ProtectedRoute (or router wrapper) checks for token and redirects to /login when absent.
- axiosInstance automatically attaches Authorization: Bearer <token> header when present.



## Courses Flow

- On app load (root /), we dispatch:
- CourseGrid renders the list (responsive, SCSS modules).
- CourseCard shows Buy button (if not purchased) or Watch.
- Clicking a card (or Watch) opens VideoModal with HTML5 <video> using course.videoUrl.


## Mock API (MSW)

- POST /api/register → creates user; returns { id, email, name, token }
- POST /api/login → checks demo user or seeded users; returns user object
- GET /api/courses → returns array of courses (id, title, description, videoUrl, price, thumbnailUrl)
- GET /api/purchased → returns { courseIds: string[] } for the logged-in user
- POST /api/purchase → adds courseId to purchased set for current user


## Routes

- /login — login (Formik + Yup)
- /register — register (Formik + Yup)
- / — courses (protected)

