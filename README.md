# MPS Website

Custom-built landing page for MPS Engineering — a B2B software agency focused on process automation and workflow optimization.

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 3** for styling
- **GSAP** (ScrollTrigger) for scroll-based animations
- **Remotion 4** (`@remotion/player`) for frame-based SVG animations
- **Lucide React** for icons

## Project Structure

```
src/
├── App.jsx              # Main application (all sections)
├── i18n.jsx             # Internationalization (EN/NL translations + context)
├── main.jsx             # Entry point
├── remotion/
│   ├── BlueprintScanner.jsx   # Step 01 animation: ContextMapper
│   ├── BrutalistAssembly.jsx  # Step 02 animation: SystemForge
│   └── OperatorSync.jsx       # Step 03 animation: HandoverBridge
├── App.css
└── index.css
```

## Sections

| Section | Description |
|---------|-------------|
| Navbar | Floating island nav, color-shifts on scroll, language switcher (EN/NL) |
| Hero | Full-viewport intro with background image + GSAP text reveal |
| Features | 3 interactive cards (Diagnostic Shuffler, Telemetry Typewriter, Cursor Scheduler) |
| Philosophy | Parallax manifesto section |
| Protocol | 3 sticky-stacking steps with Remotion animations |
| Footer/CTA | Contact + system status indicator |

## Remotion Animations (Protocol Section)

All animations are pure SVG, use `currentColor` for theme inheritance, and loop seamlessly.

### Step 01: ContextMapper (`BlueprintScanner.jsx`)
- **Duration**: 150 frames (5s) at 30fps
- **Metaphor**: Decomposing chaotic processes to find bottlenecks
- **Timeline**:
  - `0-30` (0-1s): 8 scattered nodes with jitter, tangled connections
  - `30-75` (1-2.5s): Scanner reticle sweeps L→R, detects 3 bottleneck nodes (clay pulse)
  - `75-120` (2.5-4s): Nodes restructure into clean horizontal pipeline (spring stagger)
  - `120-150` (4-5s): Hold + fade to transparent

### Step 02: SystemForge (`BrutalistAssembly.jsx`)
- **Duration**: 120 frames (4s) at 30fps
- **Metaphor**: Industrial prototyping — cutting raw material into a functional system
- **Timeline**:
  - `0-20` (0-0.67s): Raw material block entry (snappy spring with overshoot)
  - `20-50` (0.67-1.67s): Laser cuts vertical + horizontal with glow + sparks
  - `50-75` (1.67-2.5s): 4 quadrants separate and reshape into UI components
  - `75-105` (2.5-3.5s): Components assemble into wireframe layout with assembly arms
  - `105-120` (3.5-4s): Engineering dimension annotations + fade

### Step 03: HandoverBridge (`OperatorSync.jsx`)
- **Duration**: 150 frames (5s) at 30fps
- **Metaphor**: Human-machine synchronization and system handover
- **Timeline**:
  - `0-30` (0-1s): Machine (rotating dashed circles, "SYS") left, organic breathing circle ("OPS") right
  - `30-60` (1-2s): Connectors grow toward center with desynchronized wave pulses
  - `60-105` (2-3.5s): Waves synchronize in frequency, sync node appears at center
  - `105-135` (3.5-4.5s): Handover — center node fills clay, color propagates green outward
  - `135-150` (4.5-5s): Unified waveform flows through bridge + fade

## Internationalization (i18n)

The site supports English and Dutch via a custom React context (`src/i18n.jsx`).

- **Languages**: `en` (default), `nl`
- **Switcher**: Toggle button in the navbar ("NL" / "EN")
- **Scope**: All visible text is translated — hero, features, philosophy, protocol steps, footer
- **Adding a language**: Add a new key to the `translations` object in `i18n.jsx` with all translation keys

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Charcoal | `#1A1A1A` | Primary dark / text |
| Cream | `#F2F0E9` | Primary light / backgrounds |
| Clay | `#CC5833` | Accent / alerts / CTA |
| Moss | `#7A8C70` | Secondary accent / "healthy" state |

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
