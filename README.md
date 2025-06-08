# ScholarPeak Events

A platform for coding competitions, practice problems, and programming challenges, designed to be hosted at events.scholarpeak.in.

## Features

- Weekly coding competitions in various formats
- Practice problems with different difficulty levels
- Leaderboards to track progress
- Integration with the main ScholarPeak platform

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React
- Shared backend with main ScholarPeak platform

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/scholarpeak_events.git
cd scholarpeak_events
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and API clients
- `/src/styles` - Global styles and Tailwind configuration
- `/src/types` - TypeScript type definitions

## Deployment

This application is designed to be deployed to the events.scholarpeak.in subdomain.

## Backend Integration

This project uses the same backend as the main ScholarPeak platform. API endpoints should be configured to point to the main backend server. 