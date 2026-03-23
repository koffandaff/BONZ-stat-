# GOD'S FAV — SINGLE PAGE BRANDING SITE
## Master Build Prompt v2

---

## ONE-LINE BRIEF

Build a **single-page branding site** for **God's Fav** — a dark underground streetwear label.
No products. No shop. Pure brand identity: who we are, our vision, how to reach us.

Aesthetic: **cybersigilism × occult minimalism × techwear × underground rave**.
Every section must have a **living, animated background** from React Bits.
The site should feel like entering a dimension — not browsing a webpage.

---

## TECH STACK

```bash
# Core
next@15 react@19 typescript tailwindcss@4

# Animation trilogy — use all three together
framer-motion@12
gsap@3 @gsap/react
@studio-freight/lenis

# Material UI — structure + form inputs only. ALWAYS override styles.
@mui/material @mui/icons-material @emotion/react @emotion/styled

# React Bits backgrounds — install each from reactbits.dev CLI
# See BACKGROUND_MAP.md for exactly which component goes in which section

# 3D — required for Hyperspeed and Ballpit
three @react-three/fiber @react-three/drei

# Physics — required for Ballpit
matter-js

# Utilities
clsx tailwind-merge react-intersection-observer
```

---

## VISUAL IDENTITY

### Color Palette
```css
:root {
  --c-void:    #000000;    /* pure black — main bg */
  --c-deep:    #080808;    /* section bg */
  --c-surface: #111111;    /* raised cards */
  --c-ash:     #2A2A2A;    /* borders, dividers */
  --c-blood:   #8B0000;    /* primary accent — crimson */
  --c-ember:   #CC2200;    /* hover accent */
  --c-bone:    #E8E2D9;    /* warm off-white text */
  --c-ghost:   #555555;    /* muted text */
  --c-white:   #FFFFFF;    /* headlines */
  --glow-red:  0 0 40px rgba(139,0,0,0.5), 0 0 100px rgba(139,0,0,0.2);
}
```

### Typography (all via next/font/google)
```
Bebas Neue        — Hero title, section headings (90–160px desktop, 50–80px mobile)
Cinzel Decorative — Brand statements, ceremonial sub-headings
Space Mono        — Body copy, labels, form fields (13–14px, line-height 2.2)
Barlow Condensed  — Nav links, CTAs, tags, overlines (uppercase, letter-spacing 0.25em)
```

### Global CSS
```css
/* globals.css */

/* No rounded corners — anywhere */
* { border-radius: 0 !important; }

/* Animated film grain — sits over everything */
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.07;
  pointer-events: none;
  z-index: 9999;
  animation: grain 0.4s steps(2) infinite;
}
@keyframes grain {
  0%,100% { transform: translate(0,0); }
  25%      { transform: translate(-2px,1px); }
  75%      { transform: translate(1px,-2px); }
}
```

---

## ANIMATED BACKGROUND ASSIGNMENTS

Each section gets its own React Bits animated background component.
These live behind all content (position: absolute, inset: 0, z-index: 0).
Content always sits at z-index: 1 or higher.

```
LOADING SCREEN  →  Particles        (dark crimson particles floating)
NAVIGATION      →  Threads          (thin fiber lines, low opacity, crimson tint)
HERO            →  Hyperspeed       (warp-speed star field) 
                   + Orb            (pulsing crimson glow at center)
                   + Aurora         (dark red ambient wash)
MARQUEE TICKER  →  Floating Lines   (horizontal lines drifting slowly)
ABOUT (left)    →  Threads          (reused, darker, tighter)
ABOUT (right)   →  Silk             (flowing iridescent silk — tinted dark red)
                   + Iridescence    (subtle color shift overlay)
VISION          →  Plasma           (dark crimson plasma field)
                   + Dark Veil      (deep black overlay on top)
                   + Ripple Grid    (very faint, pointer-reactive grid)
CONTACT         →  Waves            (slow dark waves, crimson)
                   + Grid Scan      (scanning line effect, low opacity)
FOOTER          →  Noise            (React Bits Noise — static grain)
```

---

## SECTIONS

### 1. LOADING SCREEN — `components/ui/Loader.tsx`
```
Background: React Bits Particles
  color: '#8B0000', particleCount: 60, speed: 0.4, size: 1.5
  Connected: false (solo floating particles)

Content (centered):
  Logo: next/image src="/public/logo.png" with error fallback
  Fallback text: "GOD'S FAV" — Cinzel Decorative, 42px, white
  Below: 200px crimson loading bar that fills left→right over 1.2s
         border: none, background: #8B0000, height: 1px

Exit:
  framer-motion: animate={{ opacity: 0 }}, transition: { duration: 0.6 }
  After exit: unmount, trigger rest of page animations
  Total: 1.6s
```

### 2. CUSTOM CURSOR — `components/ui/Cursor.tsx`
```
html { cursor: none }

Crosshair SVG, 36px, color #8B0000:
  Two 1px lines crossing center
  4px center dot

Tracking:
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 600, damping: 30 })
  const springY = useSpring(y, { stiffness: 600, damping: 30 })

Hover state [button, a, [data-cursor]]:
  scale: 1 → 2.0, color: #8B0000 → #fff, outer ring fades in

Trail: 4 dots, each 6px, crimson, opacity decays over 200ms
Hidden on touch devices: display none at < 768px
```

### 3. NAVIGATION — `components/sections/Nav.tsx`
```
Background: React Bits Threads
  color: '#8B0000', opacity: 0.15, speed: 0.3
  (very subtle — threads drift slowly behind nav)

MUI AppBar sx={{ background: 'transparent', boxShadow: 'none' }}
MUI Toolbar — override all padding/color with sx

Fixed top, height: 56px, z-index: 100

LEFT — Logo:
  next/image "/public/logo.png" width:120 height:40
  onError → fallback: "GOD'S FAV" Cinzel Decorative 14px white
  onClick: lenis.scrollTo(0, { duration: 1.2 })

CENTER — Links (Barlow Condensed, 11px, uppercase, tracking-widest):
  ABOUT / VISION / CONTACT
  Default color: #333 → white on hover
  Underline: 1px crimson pseudo-element, scaleX 0→1 on hover (250ms ease)
  Each wrapped in React Bits Magnet (strength: 0.25)
  onClick: lenis.scrollTo('#section-id', { duration: 1.2 })

RIGHT — MUI IconButton (override color: '#555'):
  Instagram SVG icon → open social link
  Email SVG icon → mailto:

SCROLL BEHAVIOR:
  useScroll() from framer-motion
  scrollY > 40: backdrop-filter: blur(24px) + background: rgba(0,0,0,0.85)
  transition: 300ms ease

MOBILE < 768px:
  Hide center links
  Hamburger → X (framer-motion layoutId animation on bars)
  MUI Drawer — full screen, background: #000
  Links: staggerChildren 0.06s, x: -30→0, opacity: 0→1
  Social icons at bottom of drawer

MOUNT:
  { initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.1, duration: 0.4, ease: 'easeOut' } }
```

### 4. HERO — `components/sections/Hero.tsx`
```
Height: 100svh, overflow: hidden, position: relative

BACKGROUND LAYER STACK (bottom to top, all position:absolute inset:0):

  Layer 1 — Hyperspeed (react-bits):
    The primary hero background: warp-speed star lines flying toward viewer
    effectOptions: {
      onSpeedUp: () => {},
      onSlowDown: () => {},
      distortion: 'turbulentDistortion',
      length: 400,
      roadWidth: 9,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSteps: 5,
      lightPairsPerRoadWay: 30,
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0000,
        background: 0x000000,
        shoulderLines: 0x8B0000,
        brokenLines: 0x1a0000,
        leftCars: [0x8B0000, 0x4a0000, 0xcc2200],
        rightCars: [0x1a0000, 0x0d0000, 0x050505],
        sticks: 0x8B0000,
      }
    }

  Layer 2 — Orb (react-bits):
    position: absolute, centered (top:50%, left:50%, transform: translate(-50%,-50%))
    hue: 0 (red), size: 300, blur: 80
    opacity: 0.6, animation: pulse 4s ease-in-out infinite

  Layer 3 — Aurora (react-bits):
    colorStops: ['#1a0000', '#000000', '#0d0000']
    amplitude: 1.2, blend: 0.15, opacity: 0.8

  Layer 4 — Dark perspective grid (CSS):
    background-image: linear-gradient lines (1px, rgba(139,0,0,0.08))
    background-size: 50px 50px
    transform: perspective(600px) rotateX(42deg) scale(1.7)
    transform-origin: 50% 100%
    opacity: 0.5

  Layer 5 — Radial vignette (CSS):
    radial-gradient(ellipse at 50% 40%,
      transparent 20%, rgba(0,0,0,0.75) 65%, rgba(50,0,0,0.6) 100%)

  Layer 6 — React Bits Noise:
    opacity: 0.08

  Layer 7 — SVG corner brackets (4 corners):
    L-brackets, #8B0000, stroke-width: 1.5, arm: 34px
    CSS animation: opacity 0.4→1→0.4, 2.5s ease-in-out infinite
    (SVG only — no emoji)

CONTENT (z-index: 2, centered flex column, gap: 8px):

  Eyebrow label:
    "EST. 2025 · UNDERGROUND LABEL"
    Barlow Condensed, 9px, #444, letter-spacing: 0.5em
    { initial: { opacity:0 }, animate: { opacity:1 }, transition: { delay:1.8 } }

  Line 1: "GOD'S"
    Cinzel Decorative, 22px, var(--c-bone), letter-spacing: 0.3em
    { initial: { opacity:0, y:-10 }, animate: { opacity:1, y:0 }, transition: { delay:1.9 } }

  Line 2: "FAV"
    Bebas Neue, 160px desktop / 80px mobile, color: white
    text-shadow: var(--glow-red)
    React Bits SplitText:
      { from: { y: 80, opacity: 0, rotateX: -30 },
        stagger: 0.1, delay: 2.0, duration: 0.7, ease: 'back.out(1.7)' }

  Subtitle: "The chosen wear the void."
    Space Mono, 12px, var(--c-ghost)
    React Bits BlurText: blur 20px→0, opacity 0→1, delay: 2.5s

  CTA button:
    "Discover →"
    Barlow Condensed, 11px, uppercase, letter-spacing: 0.35em
    border: 1px solid var(--c-blood), color: var(--c-blood), bg: transparent
    padding: 10px 28px
    hover: background var(--c-blood), color white, 200ms ease
    Wrapped in React Bits Magnet (strength: 0.3)
    { initial: { opacity:0, y:20 }, animate: { opacity:1, y:0 }, transition: { delay:2.8 } }
    onClick: lenis.scrollTo('#about')

  Scroll indicator (position: absolute, bottom: 20px, centerX):
    1px vertical line, background: linear-gradient(to bottom, #8B0000, transparent)
    CSS keyframe: height 22px→36px→22px, 1.8s ease-in-out infinite
    "SCROLL" text, 7px, Space Mono, #333, rotate: -90deg
```

### 5. MARQUEE TICKER — `components/ui/Marquee.tsx`
```
Background: React Bits Floating Lines
  opacity: 0.12, color: '#8B0000', speed: 0.8

Height: 36px
border-top: 1px solid var(--c-ash)
border-bottom: 1px solid var(--c-ash)
background: #000, overflow: hidden

Content string (duplicate 3×):
"GOD'S FAV  ◆  WEAR THE VOID  ◆  BORN CHOSEN  ◆  DARK CULTURE  ◆  NOT FOR EVERYONE  ◆  SS 2025  ◆  UNDERGROUND  ◆  "
◆ color: var(--c-blood)
Font: Bebas Neue, 13px, white, letter-spacing: 0.35em

framer-motion:
  animate={{ x: ['0%', '-33.33%'] }}
  transition={{ duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}

onMouseEnter: controls.stop()
onMouseLeave: controls.start(...)
```

### 6. ABOUT — `components/sections/About.tsx`
```
id="about"
min-height: 100svh
Two column grid (1fr 1fr) desktop, single column mobile
border-top: 1px solid var(--c-ash)

LEFT COLUMN:
  Background: React Bits Threads
    color: '#8B0000', opacity: 0.12, speed: 0.25 (slow drift)

  padding: 80px 60px (desktop), 48px 24px (mobile)
  position: relative, overflow: hidden

  Overline: "ABOUT THE BRAND"
    Barlow Condensed, 9px, var(--c-blood), letter-spacing: 0.5em
    React Bits BlurText on scroll enter

  Heading (GSAP SplitText word-by-word, ScrollTrigger start:"top 75%"):
    "We don't follow." — Cinzel Decorative, 44px, var(--c-bone)
    "We lead."         — Cinzel Decorative, 44px, white
    Period: color var(--c-blood)
    each word: { opacity:0, y:30 } → { opacity:1, y:0 }, stagger: 0.08s

  Rule: 48px line, background: var(--c-blood)
    gsap.fromTo(rule, { width:0 }, { width:48, duration:0.6 })
    trigger: "top 80%"

  Body (Space Mono, 13px, var(--c-ghost), line-height: 2.2):
    React Bits BlurText on scroll, delay: 200ms

  Stats row — GSAP counter animation on scroll:
    Each item: large number (Bebas Neue 36px white) + label (Barlow Condensed 9px ghost)
    "001" → Origin Drop
    "∞"   → Always Limited
    "SS25" → Current Season

  1px var(--c-ash) divider on right edge (desktop only)

RIGHT COLUMN:
  Background: React Bits Silk
    speed: 1.2, opacity: 0.35, color: '#8B0000'
    + React Bits Iridescence on top
    opacity: 0.15, speed: 0.8

  padding: 80px 60px (desktop), 48px 24px (mobile)
  background: var(--c-void)

  Main quote (React Bits SpotlightCard wrapper, spotlightColor: rgba(139,0,0,0.14)):
    "Armor, not fashion."
    Cinzel Decorative, 28px, white, centered, mb: 28px
    text-shadow: var(--glow-red)

  Three value cards (stagger 0.15s on scroll, y:30→0 opacity:0→1):
    padding: 14px 18px
    border: 1px solid var(--c-ash)
    background: rgba(0,0,0,0.7) (glassmorphism-lite over silk bg)
    hover: border-color var(--c-blood), 200ms

    [ 4px crimson square dot ]
    Title: Barlow Condensed, 11px, var(--c-bone), uppercase, tracking-wide
    Sub: Space Mono, 10px, var(--c-ghost)

    UNCOMPROMISING — "no dilution, no trend-chasing"
    LIMITED         — "every drop runs out, always"
    UNDERGROUND     — "not made for everyone"
```

### 7. VISION — `components/sections/Vision.tsx`
```
id="vision"
min-height: 80svh, position: relative, overflow: hidden
border-top: 1px solid #141414

BACKGROUNDS (layered):
  Layer 1: React Bits Plasma
    color1: '#3a0000', color2: '#8B0000', speed: 0.6, opacity: 0.8
  Layer 2: React Bits Dark Veil
    opacity: 0.7 (deepens the plasma, keeps it dark)
  Layer 3: React Bits Ripple Grid
    color: '#8B0000', opacity: 0.04, gridSize: 40
    pointer-reactive (subtle grid ripples where cursor moves)

Ghost watermark (position:absolute, centered, z-index:0):
  "GF" — Bebas Neue, 320px, white, opacity: 0.022
  CSS keyframe: rotate 0deg→1.5deg→0deg, 10s ease-in-out infinite

CONTENT (z-index: 1, max-width: 680px, margin: auto, padding: 100px 40px, text-align: center):

  Eyebrow: "Our Vision"
    Barlow Condensed, 9px, var(--c-blood), letter-spacing: 0.5em, mb: 20px
    BlurText on scroll

  Main quote (React Bits TrueFocus sweep on scroll enter):
    "We were not built for now."  — Cinzel Decorative, 38px, var(--c-bone)
    "We were built for forever."  — Cinzel Decorative, 38px, white
    Trailing period: color var(--c-blood)

  Crimson rule (80px, centered):
    CSS keyframe: width 60→100→60px, opacity 0.5→1→0.5, 3s loop

  Manifesto text (Space Mono, 12px, var(--c-ghost), line-height: 2.4, centered):
    "Crafted for the few. Remembered by all.
     Dark culture has a uniform — this is it."

  Three principles (row desktop, column mobile, stagger 0.2s on scroll):
    SVG icon (use simple geometric SVG — crosshair / circle / single line — NO emoji):
      <svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><circle cx="12" cy="12" r="3" fill="none"/></svg>
    Title: Bebas Neue, 24px, white
    Text: Space Mono, 11px, var(--c-ghost)

    THE MARK / THE CLOTH / THE MOVEMENT
```

### 8. CONTACT — `components/sections/Contact.tsx`
```
id="contact"
min-height: 80svh
Two column grid (1fr 1fr) desktop, stacked mobile
border-top: 2px solid var(--c-ash)
position: relative, overflow: hidden

BACKGROUNDS:
  Layer 1: React Bits Waves
    color: '#8B0000', speed: 0.6, opacity: 0.3, amplitude: 20, waveCount: 5
  Layer 2: React Bits Grid Scan
    color: '#8B0000', opacity: 0.04, scanSpeed: 3

Both layers: position absolute inset 0, z-index: 0
All content: z-index: 1

LEFT (padding: 80px 60px desktop):
  Overline: "GET IN TOUCH"
    Barlow Condensed, 9px, var(--c-blood), letter-spacing: 0.5em

  Heading (GSAP SplitText on scroll enter):
    "Let's talk."
    Bebas Neue, 80px desktop / 48px mobile, white
    Stagger: 0.05s per character

  Body: Space Mono, 12px, var(--c-ghost), line-height: 2.1

  Contact links (stagger x:-20→0 on scroll, 0.1s between each):
    Each: padding 13px 16px, border: 1px solid var(--c-ash), full width
    font: Barlow Condensed 10px, color: #333, uppercase
    hover: border-color var(--c-blood), color var(--c-blood), 200ms
    "→" arrow: color var(--c-blood), margin-left: auto

    — Instagram
    — Email us directly
    — Collab Inquiry

RIGHT (padding: 80px 60px, border-left: 1px solid var(--c-ash)):
  MUI TextField variant="standard" — 3 fields:
    Name / Email / Message (multiline minRows:4)

  MUI sx customization:
    '& .MuiInput-root': { color: 'var(--c-bone)', fontFamily: 'Space Mono' }
    '& .MuiInputLabel-root': { color: 'var(--c-ghost)', fontFamily: 'Barlow Condensed', letterSpacing: '0.2em', textTransform: 'uppercase' }
    '& .MuiInput-underline:before': { borderBottomColor: 'var(--c-ash)' }
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'var(--c-blood)' }
    '& .MuiInput-underline:after': { borderBottomColor: 'var(--c-blood)' }

  Submit (React Bits Magnet wrapper, strength: 0.35):
    "Send →" — Barlow Condensed, 11px, uppercase, letter-spacing: 0.35em
    background: var(--c-blood), color: white, padding: 13px 36px
    hover: background var(--c-ember), 200ms ease
    border: none

  Success state (AnimatePresence):
    Replace form with: "Received." Bebas Neue 52px white
    + "We'll be in touch." Space Mono 12px ghost
    { initial: { scale:0.9, opacity:0 }, animate: { scale:1, opacity:1 }, transition: { duration:0.3 } }
```

### 9. FOOTER — `components/sections/Footer.tsx`
```
Background: React Bits Noise (static grain texture)
  opacity: 0.06

background: #000
border-top: 2px solid var(--c-blood)   ← the one bold crimson stripe
padding: 28px 60px

Single row (desktop):
  Left:   Logo (same as nav — text fallback if image absent)
  Center: "© 2025 God's Fav. All Rights Reserved." — Space Mono, 9px, #1a1a1a
  Right:  Instagram · Email (Barlow Condensed, 9px, #1a1a1a → var(--c-blood) on hover)

Mobile: stacked, centered, gap: 16px
```

---

## ANIMATION SEQUENCE (post-loader, times from loader exit)

```
0ms:    Lenis initialized, GSAP ticker connected
100ms:  Nav slides down { y:-20→0, opacity:0→1 }
200ms:  Hero video/Hyperspeed fades in { opacity:0→1, 600ms }
300ms:  Hero Orb pulsing begins
400ms:  Corner brackets pulse in
600ms:  Hero eyebrow label appears
700ms:  "GOD'S" slides in
800ms:  "FAV" SplitText begins (letters stagger 100ms each)
1200ms: Subtitle BlurText starts
1500ms: CTA fades + slides up
1800ms: Scroll indicator appears
```

---

## SMOOTH SCROLL + GSAP SETUP

```typescript
// lib/lenis.ts
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  // Connect Lenis to GSAP ticker (critical)
  gsap.ticker.add((time) => { lenis.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)

  // Refresh ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update)

  return lenis
}
```

---

## MUI THEME OVERRIDE

```typescript
// lib/muiTheme.ts
import { createTheme } from '@mui/material'

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B0000' },
    background: { default: '#000', paper: '#080808' },
    text: { primary: '#E8E2D9', secondary: '#555' },
  },
  shape: { borderRadius: 0 },    // Global 0 radius
  typography: { fontFamily: 'inherit' },
  components: {
    MuiAppBar: {
      styleOverrides: { root: { background: 'transparent', boxShadow: 'none' } }
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 0 } }
    },
  }
})
```

Wrap in `<ThemeProvider theme={muiTheme}>` in `layout.tsx`.

---

## LOGO FALLBACK

```tsx
// Reusable LogoComponent — use in Nav + Loader
const LogoComponent = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const [failed, setFailed] = useState(false)
  const sizes = { sm: [80,28], md: [120,40], lg: [160,52] }
  const [w, h] = sizes[size]

  return failed ? (
    <span className={`font-cinzel text-white tracking-widest uppercase`}
          style={{ fontSize: size === 'lg' ? 20 : size === 'md' ? 14 : 11 }}>
      GOD'S FAV
    </span>
  ) : (
    <Image src="/logo.png" alt="God's Fav" width={w} height={h}
           onError={() => setFailed(true)} priority />
  )
}
```

---

## FILE STRUCTURE

```
app/
├── layout.tsx          # ThemeProvider, Lenis, fonts, metadata
├── page.tsx            # Section composition
└── globals.css         # Variables, grain, resets

components/
├── ui/
│   ├── Cursor.tsx       # Custom crosshair cursor
│   ├── Loader.tsx       # Loading screen with Particles bg
│   ├── Marquee.tsx      # Infinite ticker with FloatingLines
│   └── LogoComponent.tsx
└── sections/
    ├── Nav.tsx          # Threads bg
    ├── Hero.tsx         # Hyperspeed + Orb + Aurora
    ├── About.tsx        # Threads (left) + Silk + Iridescence (right)
    ├── Vision.tsx       # Plasma + DarkVeil + RippleGrid
    ├── Contact.tsx      # Waves + GridScan
    └── Footer.tsx       # Noise

lib/
├── lenis.ts
├── gsap.ts
└── muiTheme.ts

public/
├── logo.png            # User adds later — text fallback active
└── video/
    └── hero.mp4        # Optional — Hyperspeed is the primary hero bg

```

---

## BACKGROUND INSTALLATION (REACT BITS)

React Bits backgrounds are installed via the shadcn CLI pattern:

```bash
# Run these from project root
npx shadcn@latest add "https://reactbits.dev/r/Hyperspeed"
npx shadcn@latest add "https://reactbits.dev/r/Aurora"
npx shadcn@latest add "https://reactbits.dev/r/Orb"
npx shadcn@latest add "https://reactbits.dev/r/Threads"
npx shadcn@latest add "https://reactbits.dev/r/Silk"
npx shadcn@latest add "https://reactbits.dev/r/Iridescence"
npx shadcn@latest add "https://reactbits.dev/r/Plasma"
npx shadcn@latest add "https://reactbits.dev/r/DarkVeil"
npx shadcn@latest add "https://reactbits.dev/r/RippleGrid"
npx shadcn@latest add "https://reactbits.dev/r/Waves"
npx shadcn@latest add "https://reactbits.dev/r/GridScan"
npx shadcn@latest add "https://reactbits.dev/r/FloatingLines"
npx shadcn@latest add "https://reactbits.dev/r/Particles"
npx shadcn@latest add "https://reactbits.dev/r/Noise"
npx shadcn@latest add "https://reactbits.dev/r/SplitText"
npx shadcn@latest add "https://reactbits.dev/r/BlurText"
npx shadcn@latest add "https://reactbits.dev/r/GlitchText"
npx shadcn@latest add "https://reactbits.dev/r/Magnet"
npx shadcn@latest add "https://reactbits.dev/r/SpotlightCard"
npx shadcn@latest add "https://reactbits.dev/r/TrueFocus"
```

Or copy source from reactbits.dev into `components/reactbits/`.

---

## HARD RULES — NEVER VIOLATE

1. Every section must have a React Bits animated background — no plain black panels
2. `border-radius: 0` globally — no exceptions, including MUI components
3. Only crimson `#8B0000` as accent — never MUI's default purple or any blue
4. Fonts: Bebas Neue / Cinzel Decorative / Space Mono / Barlow Condensed only
5. No emoji anywhere — SVG shapes for all decorative elements
6. Grain overlay must always be present (opacity 0.06–0.08)
7. Background components always at z-index: 0 — content always at z-index: 1+
8. Backgrounds must never fully obscure content — keep opacity low enough to read text
9. No products, no shop, no e-commerce elements whatsoever
10. `prefers-reduced-motion` must disable all GSAP + framer animations
