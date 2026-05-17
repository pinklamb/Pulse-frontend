# Pulse Frontend

React + Vite dashboard for visualizing pipeline risk and managing at-risk deals.

## Tech Stack

- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- Deployed on **Railway/Vercel**

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/pulse-frontend.git
cd pulse-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
   VITE_API_URL=http://localhost:8000
4. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Environment Variables

 `VITE_API_URL` | Backend API URL | `https://pulse-backend.railway.app` |

## Project Structure
```
src/
├── components/       # React components
│   ├── DealTable.tsx
│   ├── KpiCards.tsx
│   ├── DealDetailPanel.tsx
│   └── ...
├── lib/             # Utilities and API client
│   ├── api.ts       # Backend API calls
│   ├── types.ts     # TypeScript interfaces
│   └── format.ts    # Formatting helpers
├── App.tsx          # Root component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Features

- **Risk-scored deal table** with sortable/filterable columns
- **KPI cards** showing pipeline health metrics
- **Deal detail panel** with explainable risk breakdowns
- **AI-powered email drafts** for re-engaging at-risk deals
- **Rep leaderboard** showing reps with most at-risk pipeline

## Deployment

### Railway

1. Push to GitHub
2. Connect repository to Railway
3. Add environment variable: `VITE_API_URL`
4. Railway auto-detects Vite and deploys

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_API_URL`
4. Deploy
