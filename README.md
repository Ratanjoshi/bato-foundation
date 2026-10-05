# BATO Foundation Website

A Next.js + TypeScript + Tailwind CSS website for BATO Foundation with Framer Motion animations.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Main pages

- `/`
- `/about`
- `/programs`
- `/programs/[slug]`
- `/donate`
- `/contact`

## Images

Replace the placeholder files in `public/images/` with the final BATO Foundation photos using the same filenames. The UI also has a fallback placeholder if an image cannot be loaded.

## Notes

The donation and contact forms are frontend-only in this version. Connect them to your backend/payment provider when those details are available.
