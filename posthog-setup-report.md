# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. Here's what was done:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the `posthog-js` singleton pattern recommended for Next.js 15.3+. Configured with a reverse proxy (`/ingest`), exception capture, and debug mode in development.
- **`next.config.ts`** (updated): Added reverse proxy rewrites routing `/ingest/*` to PostHog's US ingestion endpoint, and `/ingest/static/*` and `/ingest/array/*` to the assets origin. Added `skipTrailingSlashRedirect: true` to support PostHog trailing-slash API requests.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture("explore_events_clicked")` call in the existing button click handler — tracks the top-of-funnel action when users click "Explore Events".
- **`components/EventCard.tsx`** (updated): Added `"use client"` directive and `posthog.capture("event_card_clicked", { title, slug, location, date })` on the Link's `onClick` — tracks which events users navigate to, including useful properties for segmentation.
- **`.env.local`** (updated): Populated `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

## Events tracked

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' button on the home page to scroll to the featured events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view the event detail page | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/396366/dashboard/1508280)
- **Insight**: [Explore Events Clicked - Daily Trend](https://us.posthog.com/project/396366/insights/3LUmXtX9)
- **Insight**: [Event Card Clicked - Daily Trend](https://us.posthog.com/project/396366/insights/SqcW1EQ4)
- **Insight**: [Explore → Event Card Conversion Funnel](https://us.posthog.com/project/396366/insights/NmvaGmve)
- **Insight**: [Most Clicked Events by Title](https://us.posthog.com/project/396366/insights/yY3IBOf2)
- **Insight**: [Overall Engagement - Combined Events](https://us.posthog.com/project/396366/insights/n1HSGRxC)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
