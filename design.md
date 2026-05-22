# Design Language

## Scope

This document describes the design language currently implemented in this repository.

This codebase is not a LerenGO module in its current form. It is a Vite + React single-page cinematic interface branded as `BLACKSIGNAL PROTOCOL`. The experience reads as an interactive hacker dossier / surveillance terminal, not as LerenGO, SkillGO, ForgeGO, CampusGO, MentorGO, or HunterGO.

If this repo is intended to become part of LerenGO, it should not be merged visually as-is. The current design is too dark, theatrical, hostile, and gimmick-heavy for LerenGO's calm, structured, credible, trust-first product language.

## Product Identity

The implemented identity is:

- Dark terminal system
- Hacker-surveillance narrative
- Cinematic portfolio / interactive story
- High motion, high atmosphere, low conventional product utility
- Strong emphasis on anomaly detection, logs, transactions, signals, fragments, and system states

The core brand phrase used throughout the UI is:

`BLACKSIGNAL PROTOCOL`

The interface does not present itself as a standard SaaS app, education platform, marketplace, dashboard, or portfolio site. It presents itself as a fictional system interface observing an unknown subject.

## Current App Structure

The app is composed as a vertical full-screen sequence:

1. `LoadingScreen` - simulated system initialization
2. Hero / `CORE_SYS` - portrait reveal with animated wave-grid background
3. `SignalRecognition` - identity analysis and subject telemetry
4. `MemoryFragments` - archive / project constellation interface
5. `DistortionChamber` - skills / protocols as unstable signal analysis
6. `SystemDescent` - experience / system logs as layered descent
7. `FinalTransaction` - contact / completion as secure transaction
8. `EndScreen` - red breach reveal with client IP lookup

`App.tsx` is the orchestration layer. It sets up smooth scrolling with Lenis, shows the loading state, then renders all sections in sequence.

## Visual Principles

### 1. Interface As System, Not Page

Every section is treated as a system console rather than a normal webpage section. The dominant patterns are:

- Fixed side rails
- Thin top status bars
- Bottom telemetry panels
- Grid overlays
- Reticles and corner brackets
- Terminal text
- Scanlines
- Status labels
- Numeric IDs
- Fragmented metadata

Future UI should continue to feel like an operating interface. Avoid generic cards, marketing sections, feature blocks, testimonials, and soft SaaS layouts.

### 2. Dark First

The base environment is black or near-black:

- `#000000`
- `#050505`
- `black/40`
- `black/60`
- `black/80`

Light is used sparingly through borders, glows, text, and grid lines. The design should not become gray, blue, purple, beige, or gradient-led.

### 3. Acid Signal Accent

The primary accent is acid green:

`#d4ff00`

Use it for:

- Active status
- Signal strength
- Current navigation state
- System confirmation
- Progress markers
- High-value telemetry
- Live indicators

Do not overuse it as a background fill. It works because it is sharp and rare.

### 4. Red Is Only For Breach Or Threat

Red appears mainly in the final breach screen and target/threat states.

Use red for:

- Danger
- Breach
- Compromised state
- High threat
- Access denied

Do not use red for normal emphasis, buttons, decorative accents, or secondary hierarchy.

### 5. Thin Lines Over Heavy Surfaces

The UI language uses thin, low-opacity borders instead of heavy panels:

- `border-white/5`
- `border-white/10`
- `border-white/20`
- `border-[#d4ff00]/20`
- `border-red-500/30`

Panels should feel like HUD overlays, not physical cards. Keep backgrounds transparent, black, or very low alpha.

## Typography

Configured fonts:

- `Geist` for the base UI
- `Averia Serif Libre` for large atmospheric marquee text
- `Lalezar` for large section titles
- Browser monospace / Tailwind `font-mono` for terminal labels, telemetry, IDs, and logs

### Usage Rules

Use `font-mono` for:

- IDs
- Protocol labels
- Percentages
- Logs
- State text
- Small uppercase metadata

Use `font-lalezar` for:

- Cinematic section titles
- Large high-impact labels

Use `font-averia` only for:

- Huge decorative marquee words

Use `font-geist` for:

- Navigation shell
- General interface copy when monospace would be too mechanical

Avoid adding more fonts. The current system already has enough typographic contrast.

## Text Style

The current writing style is:

- Uppercase
- Short
- System-like
- Cryptic
- Threat-aware
- Operational

Common patterns:

- `STATUS: ONLINE`
- `SIGNAL STRENGTH`
- `ACCESS DENIED`
- `TRANSACTION COMPLETED`
- `ENTITY UNVERIFIED`
- `SYSTEM MONITORING`
- `BLACKSIGNAL PROTOCOL // ...`

Avoid friendly copy, conversational CTAs, generic marketing claims, or long paragraphs. The design language breaks when the UI starts sounding like a normal landing page.

## Layout System

### Section Shape

Most sections are full viewport:

`w-full h-screen`

They generally use:

- Left rail: `w-[80px]`
- Top header: around `h-[60px]`
- Main content split into fixed-width information columns and flexible visual areas
- Bottom telemetry row between `h-[40px]` and `h-[220px]`

This creates a consistent "system screen" rhythm.

### Repeated Layout Parts

The following patterns should be treated as reusable design primitives:

- Left vertical status rail
- Top protocol header
- Bottom telemetry strip
- Corner-bracketed panel
- Thin bordered metric box
- Dot / line progress indicators
- Radar or signal graphic
- Scanline image frame
- Terminal log list
- Percentage bar / segmented meter

The code currently duplicates these patterns across components. Future cleanup should extract shared primitives instead of continuing copy-paste.

## Motion Language

Motion is central to the current identity.

Allowed motion types:

- Slow marquee
- Scanline movement
- Radar sweep
- Subtle pulsing dots
- Flickering bars
- Floating terminal panels
- Cursor-influenced image reveal
- Wave-grid distortion
- Glitch only in unstable or breach states

Motion should feel like a live system. It should not feel like decorative website animation.

### Motion Restraint

The current app is already close to overanimated. Add new motion only if it communicates:

- scanning
- loading
- signal strength
- system instability
- confirmation
- breach or denial

Do not add decorative parallax, bouncing elements, confetti, generic fade-up sections, or playful transitions.

## Assets

Current visual assets:

- `public/base_hacker.png`
- `public/hover_hacker.png`
- `public/target_man.png`
- `public/target_reticle.png`
- `public/icons.svg`
- `src/assets/hero.png`

The portrait assets define the identity. Replacing them changes the whole product. Any replacement must preserve:

- dark silhouette
- centered subject
- strong contrast
- compatibility with grayscale, scanline, mask, and glitch effects
- enough transparent or dark negative space to sit inside HUD overlays

## Component Notes

### `Navi`

Defines the persistent top navigation. It uses compact uppercase labels, numeric IDs, low-opacity borders, and hover scanline motion.

Issue: `desc` exists in `NAV_ITEMS` but is not rendered. Either use it intentionally or remove it.

### `LoadingScreen`

Strongly aligned with the system identity. It establishes the terminal/HUD language before the main app appears.

Issue: it uses fake packet counts and simulated protocol steps. That is acceptable for a fiction-driven experience, but it would be unacceptable for a credible product interface.

### `HoverMaskReveal`

One of the strongest interactions in the repo. It creates a controlled reveal of the hover image through a cursor-following radial mask.

Keep this interaction as a hero-level feature. Do not reuse it everywhere.

### `InteractiveWaveBackground`

Creates the living background grid. This is a core visual asset, not a normal background decoration.

Risk: the implementation is manually complex and animation-heavy. Test performance on lower-end devices before expanding it.

### `SignalRecognition`

Strongest example of the "surveillance dashboard" design language. It uses side rail, top header, data panel, live feed, subject telemetry, and bottom analytics strip.

Risk: much of the data is fictional. Do not adapt this style directly into MentorGO/HunterGO trust screens without replacing theatrical claims with real verified product states.

### `MemoryFragments`

Uses a constellation/archive metaphor for projects. Visually coherent, but the target/threat language makes it feel hostile.

If this becomes a portfolio, rename threat language into archive/project language.

### `DistortionChamber`

The most aggressive visual section. It is appropriate for an unstable signal / skills metaphor, but it should not become the default section style.

Risk: high glitch density can reduce readability.

### `SystemDescent`

The best candidate for experience/history presentation because it already has a layered timeline/log structure.

Issue: uses many fixed dimensions and absolute panels. Mobile behavior needs tighter testing.

### `FinalTransaction`

Frames contact/completion as a secure transaction. Visually consistent, but conceptually risky if there is no real transaction.

Avoid fake financial or blockchain credibility claims unless the product actually has those mechanics.

### `EndScreen`

The red "YOU GOT HACKED" reveal fetches client IP/location data from `https://ipapi.co/json/`.

This is a trust and privacy risk. If this is only a joke, it still needs clear intent and consent before collecting or displaying location/IP data. It should not be used in a LerenGO trust-first product.

## Accessibility And Responsiveness Risks

Current risks:

- Many sections use fixed `h-screen` layouts with dense content.
- Several columns use fixed widths such as `w-[380px]`, `w-[450px]`, and `w-[350px]`.
- Some sections are not meaningfully responsive below desktop sizes.
- The UI relies heavily on low-contrast text like `text-white/30` and `text-white/40`.
- Continuous animation has no reduced-motion handling.
- Some images lack meaningful alt text or use decorative images without `aria-hidden`.
- The final IP/location reveal can create privacy concerns.
- Comments and some symbols appear mojibake-corrupted in the source, which indicates encoding damage.

Minimum fixes before production:

- Add `prefers-reduced-motion` handling.
- Audit mobile layouts section by section.
- Raise contrast for essential text.
- Remove or gate IP/location fetch.
- Clean corrupted source comments and visible corrupted symbols.
- Extract repeated HUD primitives.

## Design Rules For Future Changes

Do:

- Keep the black terminal environment.
- Use acid green only for active/live/verified signal states.
- Use red only for breach, denied, or threat states.
- Build with thin lines, corner brackets, grids, and telemetry strips.
- Keep labels uppercase and operational.
- Prefer compact system panels over large rounded cards.
- Reuse side rail, top header, bottom telemetry, metric bars, and scanline frames.
- Make every decorative element represent a system concept.

Do not:

- Add generic SaaS gradients.
- Add soft rounded cards everywhere.
- Add cheerful illustrations.
- Add fake testimonials, fake company logos, or fake credibility claims.
- Add more fonts.
- Use random colors outside black, white alpha, acid green, and threat red.
- Add large friendly CTA sections.
- Turn the UI into a normal portfolio template.
- Use IP/location data without an explicit product reason and consent boundary.

## If This Must Become LerenGO

This visual language conflicts with LerenGO's expected product direction.

For LerenGO, keep only selected technical ideas:

- Structured dashboards
- Status clarity
- Verification states
- Skill/project evidence visualization
- Clear role-based panels
- Dense but organized data surfaces

Remove or heavily reduce:

- hacker threat language
- breach reveal
- IP lookup
- hostile surveillance framing
- red warning banners
- excessive glitch effects
- fake transaction/crypto language
- theatrical "target" framing

LerenGO should be calm and credible. This repo is intentionally tense and theatrical. That is not a small styling difference; it is a product identity conflict.

## Current Quality Assessment

The design language is visually coherent, but the implementation is not yet production-clean.

Strengths:

- Strong and consistent visual identity
- Clear repeated HUD patterns
- Memorable hero interaction
- Effective use of limited color
- Good cinematic sequencing

Weaknesses:

- No real project/spec documentation
- README is still Vite boilerplate
- Many duplicated layout patterns
- Several fake metrics and fictional claims
- Privacy risk in `EndScreen`
- Heavy animation without reduced-motion support
- Fixed desktop-heavy layouts
- Source encoding corruption

The next correct step is not to add more sections. The next correct step is to clean the foundation: document the product purpose, remove trust risks, extract shared UI primitives, and verify mobile/performance behavior.
