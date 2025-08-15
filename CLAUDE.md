# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a medical appointment booking system (kakehashi-appointment2) built with Rails 8.0.2 and React/TypeScript. The system serves both patients (for booking appointments) and doctors (for managing appointments and schedules).

## Technology Stack

- **Backend**: Rails 8.0.2 with Ruby 3.4.5
- **Frontend**: React 19 with TypeScript, bundled with Vite
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS + Material-UI (@mui)
- **Authentication**: Devise (administrators)
- **Email**: SendGrid
- **Deployment**: Heroku
- **Package Management**: Yarn 4.9.2 (Node 22.18.0), Bundler
- **Development Tools**: mise (runtime management)

## Common Development Commands

### Setup
```bash
mise install                    # Install Ruby and Node runtimes
bundle install                  # Install Ruby gems
corepack enable                # Enable Yarn
yarn install                   # Install npm packages
bin/rails db:setup db:migrate # Setup database
```

### Development Servers
```bash
bin/rails s                    # Start Rails server (port 3000)
yarn watch                     # Start Vite dev server with watch mode
```

### Testing
```bash
mise test.unit                 # Run unit tests
mise test.system              # Run system tests (Selenium)
mise test.acceptance          # Run all tests + linting (before deployment)
bin/rails test                # Run Rails tests directly
```

### Linting & Type Checking
```bash
bin/rubocop                   # Ruby linting
yarn typecheck               # TypeScript type checking
```

### Build & Deploy
```bash
yarn build                    # Build frontend assets with Vite
bin/rake assets:precompile   # Precompile all assets
mise deploy                   # Deploy to Heroku (pulls main, pushes to Heroku)
```

### Database Tasks
```bash
bin/rake menu:daily          # Delete old slots & create slots 30 days ahead
bin/rake 'menu:prepare[1,30]' # Create appointment slots for 1 month
bin/rake menu:purge          # Delete past slots without appointments
```

## Architecture

### Frontend Structure
- **Entry Points**: 
  - Patient UI: `/front/packs/app.tsx` → Mounted at root `/`
  - Admin UI: `/front/packs/admin.tsx` → Mounted at `/admin/*`
- **Routing**: React Router handles client-side routing for both UIs
- **API Client**: Axios-based API clients in `/front/features/*/api/`
- **State Management**: React Context API (useMenusContext, useAdminContext)

### Backend Structure
- **API Endpoints**:
  - Public API: `/api/v1/*` (menus, appointments)
  - Admin API: `/api/admin/*` (protected by Devise authentication)
- **Models**: Menu (appointment slots), Appointment, Administrator
- **Services**: 
  - `CreateDailyAppointmentMenuService`: Manages daily slot creation
  - `StatsService`: Generates statistics reports
- **Mailers**: Appointment confirmations and notifications

### Database Schema
- **menus**: Available appointment slots (date, department, time slots)
- **appointments**: Booked appointments (linked to menus)
- **administrators**: System admin users (Devise-based)

### Asset Pipeline
- Vite builds TypeScript/React code to `/dist/assets/`
- Propshaft serves static assets from `/public/assets/`
- Development uses Vite dev server; production uses precompiled assets

## Key Business Logic

1. **Appointment Slots (Menus)**: Created automatically 30 days in advance, with configurable time slots per department (Internal Medicine, Kampo)
2. **Departments**: Two types - Internal Medicine (内科) and Kampo Medicine (漢方内科)
3. **Email Notifications**: Sent to patients, doctors, and developers on appointment creation/deletion
4. **Daily Tasks**: Automated via Heroku Scheduler to maintain appointment slots

## Development Notes

- Use absolute paths when working with files
- Frontend code is in `/front/` directory, not `/app/javascript/`
- Test data is managed through Rails fixtures
- System tests use Selenium WebDriver
- Email configuration uses environment variables (see README for list)