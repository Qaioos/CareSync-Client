# CareSync Client

CareSync is a web-based clinical operations dashboard for hospital administrators and clinical staff. It brings department capacity, staffing, schedules, operational requests, and team management together in one interface.

This repository contains the **React frontend**. It communicates with the CareSync API for authentication and operational data.

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Application routes](#application-routes)
- [Project structure](#project-structure)
- [API configuration](#api-configuration)

## Features

### Administrator workspace

- Operational dashboard with department, staffing, and shift summaries.
- Department detail pages with department status, capacity metrics, API-provided department data, and assigned staff.
- Printable department reports.
- Staff directory with search and availability filters.
- Staff profiles with editable account and clinical details, account status controls, password reset, and assigned shifts.
- Shift scheduling and staff assignment.
- Analytics for staffing, department capacity, and operational requests.
- Notifications and request monitoring.
- Task creation and assignment to clinical staff.

### Clinical staff workspace

- Role-protected route for authenticated clinical staff.
- The staff-facing page is currently a placeholder for future clinical workflows.

## Technology stack

- **React 19** and **TypeScript**
- **Vite** for local development and production builds
- **React Router** for application routing
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Recharts** for dashboard visualizations
- **Framer Motion** for interface transitions
- **React Hot Toast** for user feedback
- **React to Print** for printable reports

## Getting started

### Prerequisites

- Node.js and npm
- The CareSync API running and reachable from the frontend

### Install dependencies

```bash
npm install
```

### Configure the API

The API base URL is currently configured in [`src/Config/axios.ts`](src/Config/axios.ts) and defaults to:

```text
http://localhost:1337/api
```

Start the backend at that address, or update the base URL to match your API environment.

### Start the development server

```bash
npm run dev
```

Vite prints the local development URL in the terminal after startup.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run the TypeScript project build and create production assets. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Application routes

| Route | Access | Description |
| --- | --- | --- |
| `/login` | Public | Sign in to CareSync. |
| `/sign-up` | Public | Register an account. |
| `/nuse` | Authenticated staff | Staff-facing workspace. |
| `/admin` | Administrator | Operations dashboard. |
| `/admin/departments/:departmentKey` | Administrator | Department details and printable report. |
| `/admin/staff` | Administrator | Staff directory. |
| `/admin/staff/:userId` | Administrator | Staff profile and account management. |
| `/admin/scheduling` | Administrator | Shift schedule management. |
| `/admin/analytics` | Administrator | Operational analytics. |
| `/admin/notifications` | Administrator | Notifications and requests. |
| `/admin/profile` | Administrator | Administrator profile settings. |

## Project structure

```text
src/
├── Components/     Reusable UI, layouts, and feature-specific components
├── Config/         Axios and application configuration
├── Features/       Feature hooks, domain types, and data transformations
├── Hook/           Authentication and authenticated API hooks
├── Pages/          Route-level page components
├── Routes/         Protected route handling and route helpers
└── Types/          Shared API and application types
```

Feature-specific data loading and transformations live in `Features/`. Route-level pages in `Pages/` compose reusable components from `Components/`.

## API configuration

The frontend expects an authenticated API compatible with the endpoints used by the application, including user, department, shift, request, and task resources. Authenticated requests attach the access token through the private Axios client.

Ensure the backend is available and that its CORS configuration permits requests from the Vite development origin.
