# ER Crowd Prediction System

AI-Powered Emergency Department Capacity Forecasting — an enterprise-grade healthcare analytics platform for hospitals and healthcare administrators.

## Features

- **Dashboard Overview** — KPI cards with sparklines, AI prediction center, live monitoring, risk management
- **Predictions** — ML-powered ER density forecasting with confidence scores and staffing recommendations
- **Live Monitoring** — Real-time patient, bed, and staff metrics with auto-refresh
- **Advanced Analytics** — Hourly trends, weekly heatmaps, seasonal analysis, capacity utilization
- **Historical Data** — Searchable, sortable, paginated prediction history table
- **Reports** — PDF/Excel export and automated report generation
- **ML Insights** — Model accuracy metrics and feature importance visualization
- **Settings** — Profile, hospital config, notifications, dark mode

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Recharts
- Lucide React
- React Router

## Dataset

The application uses `er_dataset.csv` (5,000 ER visit records) as the primary data source. The file is loaded from `public/er_dataset.csv` on startup and powers all KPIs, charts, predictions, and historical data.

**CSV columns:** Visit ID, Patient ID, Hospital ID, Hospital Name, Region, Visit Date, Day of Week, Season, Time of Day, Urgency Level, Nurse-to-Patient Ratio, Specialist Availability, Facility Size, Wait Times, Patient Outcome, Patient Satisfaction.

Users can also upload additional CSV files via the **Dataset Ekle** button on the Historical Data page.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Design System

| Token | Value |
|-------|-------|
| Primary | `#2563EB` |
| Secondary | `#0EA5E9` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Critical | `#EF4444` |
| Background | `#F8FAFC` |
| Dark Background | `#0F172A` |

## License

MIT
