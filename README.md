# GoldCalcPro

A React and TypeScript portfolio interface that estimates gold value from a user-entered USD-per-gram rate, weight, selected purity and currency.

## Implemented

- Interactive calculator with 24K, 22K, 21K and 18K options.
- USD, QAR, EUR, GBP and AED display options.
- Result cards, animated transitions and responsive layout.
- Static example search-insight cards.

## Run

```bash
npm install
npm run dev
```

Build: npm run build. Type check: npm run lint. No Gemini key is needed for the current calculator; calculations run in src/App.tsx.

## Calculation and limitations

The code multiplies the entered USD rate by a fixed purity factor and a hard-coded currency conversion factor, then multiplies by weight. Currency factors and the initial gold rate are demonstration values, not live data. Some interface copy says “live”; there is currently no market-data integration. Export PDF and upgrade buttons are presentation placeholders.

This is a UI/calculation prototype. Before extending it, add input validation, tested calculation functions and a documented data-source integration.

**Stack:** React 19, TypeScript, Vite, Motion and Lucide. The source of truth for scripts and dependencies is package.json.
