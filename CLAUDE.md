# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Rails 8.0.2 appointment booking system (kakehashi-appointment2) for a medical clinic that handles patient appointments. The system is deployed on Heroku and uses PostgreSQL as the database.

## Key Commands

### Development Setup
```bash
# Install runtime dependencies (Ruby, etc.)
mise install

# Install gem dependencies
bundle install

# Setup database
bin/rails db:setup db:migrate

# Start development servers
bin/rails s
bin/rails tailwindcss:watch
```

### Testing
```bash
# Run unit tests
mise test.unit
# or
bin/rails test

# Run system tests (uses Selenium)
mise test.system
# or
bin/rails test test/system

# Run all tests and checks before deployment
mise test.acceptance
# This runs:
# - bin/rubocop (linting)
# - bin/rake assets:clobber assets:precompile
# - bin/rails test
# - bin/rails test test/system
```

### Linting
```bash
bin/rubocop
```

### Deployment
```bash
mise deploy
# This pulls from origin/main and pushes to Heroku
```

### Database Tasks
```bash
# Daily task to manage appointment slots
bin/rake menu:daily

# Create appointment slots
bin/rake 'menu:prepare[1,30]'  # Create slots for next 30 days
bin/rake 'menu:prepare[30,30]' # Create slots for day 30

# Delete unused past appointment slots
bin/rake menu:purge
```

## Architecture Overview

### Core Models

1. **Menu** (`app/models/menu.rb`)
   - Represents appointment slots (30-minute blocks)
   - Has department (内科 or 漢方)
   - Validates no overlapping time slots
   - Has many appointments (but restricted deletion if appointments exist)

2. **Appointment** (`app/models/appointment.rb`)
   - Belongs to a Menu (appointment slot)
   - Contains patient information (name, kana, birthday, email, phone)
   - Tracks if first visit or return visit
   - One appointment per menu slot (uniqueness validation)

3. **Administrator** (`app/models/administrator.rb`)
   - Uses Devise for authentication
   - Admin users for managing appointments and slots


### Frontend

- Uses Tailwind CSS for styling (via tailwindcss-rails)
- Propshaft for asset pipeline
- Views use ERB templates

### Email System

- Uses SendGrid for email delivery
- Sends appointment confirmation emails to patients
- Sends notification emails to doctors/administrators

### Testing Approach

- Unit tests in `test/models/`, `test/controllers/`, etc.
- System tests in `test/system/` using Capybara and Selenium
- Always run `mise test.acceptance` before deployment to ensure all tests pass

## Development Notes

- Ruby version: 3.4.5 (managed by mise)
- Rails version: 8.0.2
- Database: PostgreSQL
- The system is timezone-aware (Asia/Tokyo in production)
- Business hours logic is hardcoded in CreateDailyAppointmentMenuService
- The appointment slots are 30 minutes each
