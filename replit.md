# Free AI Image Generator

## Overview

This is a free AI image generator web application that allows users to create images from text prompts. The application features a React frontend with a modern UI component library and an Express.js backend with PostgreSQL database support. Users can input text descriptions and generate AI-powered images without requiring signup or payment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Pages located in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Utility functions and API client in `client/src/lib/`

### Backend Architecture
- **Framework**: Express.js 5.x with TypeScript
- **Runtime**: Node.js with tsx for TypeScript execution
- **API Pattern**: RESTful JSON API with endpoints under `/api/`
- **Development Server**: Vite dev server integrated with Express for HMR

The backend provides:
- Image generation endpoint (`POST /api/generate`)
- Generation status retrieval (`GET /api/generate/:id`)
- Static file serving in production

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Managed via `drizzle-kit push` command
- **Current Storage**: In-memory storage implementation with interface ready for database integration

The storage layer uses an interface pattern (`IStorage`) allowing easy swapping between memory storage and database storage.

### Shared Code
- Schema definitions and types are in `shared/` directory
- Validation uses Zod with drizzle-zod for database schema validation
- Types are shared between frontend and backend via path aliases

### Build System
- Development: `npm run dev` - runs tsx with Vite dev server
- Production build: `npm run build` - builds client with Vite, bundles server with esbuild
- Database sync: `npm run db:push` - pushes schema to database

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: Session storage for PostgreSQL

### AI/Image Generation
- **@google/generative-ai**: Google's Generative AI SDK (listed in build allowlist)
- **OpenAI**: OpenAI API client (listed in build allowlist)

### Frontend Libraries
- **Radix UI**: Accessible UI component primitives (accordion, dialog, dropdown, etc.)
- **Embla Carousel**: Carousel/slider component
- **date-fns**: Date formatting utilities
- **cmdk**: Command menu component
- **react-day-picker**: Calendar/date picker
- **recharts**: Charting library
- **react-hook-form**: Form handling with Zod resolver

### Backend Libraries
- **express-rate-limit**: API rate limiting
- **express-session**: Session management
- **passport/passport-local**: Authentication framework
- **multer**: File upload handling
- **nodemailer**: Email sending
- **stripe**: Payment processing (if needed)
- **jsonwebtoken**: JWT token handling

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner