# BACKGROUND MAP — GOD'S FAV
## React Bits Component Assignment Per Section

Quick reference. Agent uses this alongside MASTER_PROMPT.md.

---

## SECTION → BACKGROUND(S) → CONFIG

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SECTION        │  REACT BITS BG(S)                  │  KEY SETTINGS        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Loader         │  Particles                          │  color:'#8B0000'     │
│                 │                                     │  count:60 speed:0.4  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Navigation     │  Threads                            │  color:'#8B0000'     │
│                 │  (very low opacity, slow drift)     │  opacity:0.12        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Hero           │  PRIMARY: Hyperspeed                │  warp star field     │
│                 │  + Orb (centered, pulse)            │  hue:0 size:300      │
│                 │  + Aurora (ambient wash)            │  colors: dark reds   │
│                 │  + Depth grid (CSS)                 │  CSS perspective     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Marquee        │  Floating Lines                     │  opacity:0.12        │
│                 │                                     │  color:'#8B0000'     │
├─────────────────────────────────────────────────────────────────────────────┤
│  About (left)   │  Threads                            │  opacity:0.12        │
│                 │  (tighter, darker than nav)         │  speed:0.25          │
├─────────────────────────────────────────────────────────────────────────────┤
│  About (right)  │  Silk (primary)                     │  opacity:0.35        │
│                 │  + Iridescence (overlay)            │  opacity:0.15        │
│                 │  Both tinted dark red               │  speed:1.2           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Vision         │  Plasma (primary)                   │  opacity:0.8         │
│                 │  + Dark Veil (darkens)              │  opacity:0.7         │
│                 │  + Ripple Grid (pointer-reactive)   │  opacity:0.04        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Contact        │  Waves (primary)                    │  opacity:0.3         │
│                 │  + Grid Scan (scan line overlay)    │  opacity:0.04        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Footer         │  Noise                              │  opacity:0.06        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## BACKGROUND COMPONENT PATTERN

Every background follows this structure:

```tsx
// In any section component:
<section style={{ position: 'relative', overflow: 'hidden' }}>

  {/* BG Layer — ALWAYS z-index 0 */}
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <HyperspeedComponent /* or Plasma, Silk, Threads etc */ />
  </div>

  {/* If stacking multiple BGs */}
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <OrbComponent />
  </div>

  {/* Content — ALWAYS z-index 1 */}
  <div style={{ position: 'relative', zIndex: 1 }}>
    {/* Section content here */}
  </div>

</section>
```

---

## COLOR TINTING BACKGROUNDS

All React Bits backgrounds need to be tinted to match the color system.
Use these values when the component accepts color props:

```typescript
// Primary tint: deep crimson
color: '#8B0000'
color1: '#1a0000'
color2: '#8B0000'

// For Hyperspeed (uses hex numbers not strings):
roadColor: 0x080808
islandColor: 0x0a0000
background: 0x000000
shoulderLines: 0x8B0000
leftCars: [0x8B0000, 0x4a0000, 0xcc2200]
rightCars: [0x0d0000, 0x050505, 0x1a0000]

// For Plasma:
color1: '#3a0000'
color2: '#8B0000'
speed: 0.6

// For Aurora:
colorStops: ['#1a0000', '#000000', '#0d0000']
amplitude: 1.2
blend: 0.15

// For Silk + Iridescence:
// Pass dark red/crimson tones
// Keep opacity low (0.15–0.35) so content is always readable

// For Waves:
// Dark red lines on black — amplitude low (15–25px), thin strokes

// For Threads:
// crimson threads, very low opacity, slow speed

// For Orb:
// hue: 0 (red), blur high (60–80), opacity: 0.5–0.7
```

---

## OPACITY GUIDELINES

Backgrounds must NEVER drown out content text.
Maximum opacity per background type:

```
Hyperspeed    → full (it IS the hero)
Orb           → 0.55 max
Aurora        → 0.80 max
Plasma        → 0.80 max (Dark Veil reduces it further)
Silk          → 0.35 max
Iridescence   → 0.15 max
Threads       → 0.15 max
Waves         → 0.30 max
Grid Scan     → 0.05 max
Floating Lines→ 0.12 max
Ripple Grid   → 0.05 max
Noise         → 0.08 max
Particles     → 0.70 (loader only — no content overlap)
```

---

## PERFORMANCE NOTES

1. Hyperspeed uses WebGL (Three.js) — only one instance on page
2. Ballpit and Orb use Three.js — avoid using both in the same viewport
3. Plasma uses pixel-level canvas — limit to one section
4. Use `React.lazy()` + `Suspense` for all heavy bg components
5. Disable all canvas animations when `prefers-reduced-motion: reduce`
6. Hyperspeed, Orb, Aurora = hero only (heaviest components)
7. All others are lightweight canvas/CSS — safe to use freely

```tsx
// Wrap heavy backgrounds:
const Hyperspeed = React.lazy(() => import('@/components/reactbits/Hyperspeed'))
const Orb = React.lazy(() => import('@/components/reactbits/Orb'))
const Plasma = React.lazy(() => import('@/components/reactbits/Plasma'))

// Reduced motion check:
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) { /* render animated bg */ }
```

---

## QUICK CHEAT SHEET

```
Color system:   #000 void → #8B0000 blood → #E8E2D9 bone
Fonts:          Bebas Neue / Cinzel Decorative / Space Mono / Barlow Condensed
Radius:         0 everywhere
Accent:         #8B0000 crimson ONLY
No emoji:       SVG geometric shapes only
Grain:          body::before, opacity 0.07, always on
BG z-index:     always 0
Content z:      always 1+
```
