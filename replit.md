# DSB GENIUS - AI-Powered Manufacturing Optimization Platform

## Overview

DSB GENIUS is an AI-powered manufacturing optimization platform that transforms traditional consulting processes from 30-day manual analysis into 30-minute intelligent solutions. The system generates custom Dynamic Strategic Balance (DSB) solutions with real-time dashboards and continuous intelligence for various industries including pharmaceuticals, electronics, and chemicals.

The platform serves as a comprehensive solution for manufacturing optimization, providing problem analysis, AI-powered solution generation, custom dashboard creation, and implementation roadmaps with ROI projections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React-based SPA with TypeScript, using Vite for development and building
- **Backend**: Express.js server with TypeScript support
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Shared Layer**: Common schema definitions and types accessible by both frontend and backend

### Frontend Architecture
The client application is built using modern React patterns:

- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and API communication
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite with custom configuration for development and production builds

### Backend Architecture
The server implements a REST API with the following key components:

- **Framework**: Express.js with TypeScript for robust API development
- **AI Integration**: OpenAI GPT-4 integration for problem analysis and solution generation
- **Storage Layer**: Abstracted storage interface supporting both in-memory (development) and database persistence
- **Middleware**: Request logging, JSON parsing, and error handling middleware
- **Development Support**: Hot reloading with Vite integration in development mode

### Database Design
PostgreSQL database with four main entities managed through Drizzle ORM:

- **Users**: Authentication and profile information with company/industry context
- **Problem Analyses**: Problem descriptions, industry context, and AI analysis results
- **Solutions**: Generated DSB solutions with custom algorithms, dashboards, and implementation roadmaps  
- **Subscriptions**: User plan management with usage tracking and generation limits

The schema uses UUID primary keys and proper foreign key relationships for data integrity.

### AI Engine Architecture
The AI system is designed around OpenAI's GPT-4 model with structured interfaces:

- **Problem Analysis**: Categorizes problems, identifies root causes, and determines severity levels
- **Solution Generation**: Creates industry-specific DSB solutions with custom algorithms
- **Dashboard Components**: Auto-generates real-time monitoring dashboards and predictive analytics
- **Implementation Planning**: Produces phased roadmaps with timelines and ROI projections

### Development and Build System
Sophisticated build pipeline supporting both development and production environments:

- **Development**: Vite dev server with HMR, TypeScript checking, and Express backend integration
- **Production**: Vite build for frontend assets, ESBuild for server bundling
- **Database Management**: Drizzle Kit for schema migrations and database synchronization
- **Path Resolution**: Custom aliases for clean import statements across the codebase

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL via Neon serverless database platform
- **ORM**: Drizzle ORM for type-safe database operations with PostgreSQL dialect
- **Session Storage**: PostgreSQL-backed session storage with connect-pg-simple

### AI and Machine Learning
- **OpenAI API**: GPT-4 model for problem analysis and solution generation
- **Natural Language Processing**: Custom analysis of manufacturing problems and industry patterns

### UI and Styling
- **Component Library**: Comprehensive shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS for utility-first styling with custom design tokens
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts integration (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)

### Development and Build Tools
- **Build System**: Vite with React plugin and custom Replit integration plugins
- **TypeScript**: Full type safety across frontend, backend, and shared code
- **Development**: tsx for TypeScript execution, ESBuild for production server bundling
- **Validation**: Zod for runtime type validation and form schema generation

### Additional Integrations
- **Date Handling**: date-fns for date manipulation and formatting
- **Carousel Components**: Embla Carousel for interactive UI elements
- **Error Handling**: Custom error overlay plugin for development debugging
- **Environment**: Replit-specific development banner and cartographer plugins