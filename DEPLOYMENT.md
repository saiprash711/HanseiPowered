# Deployment Guide

## Frontend Deployment (Vercel)

1. **Push your code to GitHub**
2. **Connect Vercel to GitHub**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `HanseiSolve/client` folder as the root directory

3. **Configure Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `client`

4. **Environment Variables**:
   - Add `VITE_API_URL` with your Render backend URL

## Backend Deployment (Render)

1. **Push your code to GitHub**
2. **Create a new Web Service on Render**:
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Select the `HanseiSolve/server` folder as the root directory

3. **Configure Service Settings**:
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Root Directory: `server`

4. **Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ALLOWED_ORIGIN`: Your Vercel frontend URL
   - `NODE_ENV`: `production`

## Important Notes

1. **Database**: Set up a PostgreSQL database (you can use Render's PostgreSQL or other providers)
2. **CORS**: Update `ALLOWED_ORIGIN` in your backend environment variables to match your Vercel domain
3. **API URL**: Update `VITE_API_URL` in your frontend environment variables to match your Render backend URL

## File Structure After Setup
```
HanseiSolve/
├── client/           # Frontend (deploy to Vercel)
│   ├── src/
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.ts
├── server/           # Backend (deploy to Render)
│   ├── package.json
│   ├── tsconfig.json
│   └── index.ts
└── shared/           # Shared types/schemas
```