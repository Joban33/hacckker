# BLACKSIGNAL Protocol

A cinematic hacker-style portfolio interface built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP, and Lenis.

Live site: [hacckker.vercel.app](https://hacckker.vercel.app/)

## Overview

BLACKSIGNAL Protocol is a scroll-driven, HUD-inspired web experience. The site presents a portfolio as a sequence of system phases: core boot, identity recognition, memory archive, distortion chamber, system logs, final transaction, and breach finale.

The design language is intentionally sharp, monochrome, and terminal-like, with acid-lime telemetry, hard panel borders, scanlines, glitch layers, scroll-reactive indicators, and hover-driven reveal mechanics.

## Features

- Cinematic loading sequence and scroll-controlled page progression.
- Fixed navigation with active section tracking.
- Scroll phase telemetry rail for desktop viewports.
- Fluid hover reveal on the hero portrait.
- Animated archive, distortion, protocol, and transaction panels.
- Mobile-specific layout overrides for dense HUD sections.
- Local deterministic visual noise, avoiding fragile remote texture dependencies.
- No live IP lookup or external tracking dependency in the finale.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- GSAP
- Lenis smooth scrolling
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.tsx
  index.css
  components/
    BackgroundContent.tsx
    DistortionChamber.tsx
    EndScreen.tsx
    FinalTransaction.tsx
    HoverMaskReveal.tsx
    InteractiveWaveBackground.tsx
    LoadingScreen.tsx
    MemoryFragments.tsx
    Navi.tsx
    ScrollPhaseTelemetry.tsx
    SignalRecognition.tsx
    SystemDescent.tsx
```

## Design Notes

The design system is documented in [design.md](./design.md). Keep new UI aligned with the existing BLACKSIGNAL language:

- sharp typography
- dark system panels
- acid-lime telemetry highlights
- low-noise glitch and scanline effects
- motion that feels like instrument feedback, not decorative animation

Avoid generic SaaS sections, rounded card-heavy layouts, unrelated gradients, and soft decorative blobs.

## Quality Checks

Before pushing changes, run:

```bash
npm run lint
npm run build
```

The production build may warn about a large JavaScript chunk. That is expected for the current single-page animation-heavy build, but future work should consider route or component-level code splitting if the project grows.
