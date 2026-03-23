# AGENT CHEATSHEET — GOD'S FAV v2

## WHAT THIS SITE IS
Single page. Brand only. No products. No shop.
Sections: Loader → Nav → Hero → Marquee → About → Vision → Contact → Footer

## ANIMATED BG PER SECTION (non-negotiable)
- Loader   → Particles (crimson)
- Nav      → Threads (opacity 0.12)
- Hero     → Hyperspeed + Orb + Aurora (layered)
- Marquee  → Floating Lines
- About L  → Threads
- About R  → Silk + Iridescence
- Vision   → Plasma + Dark Veil + Ripple Grid
- Contact  → Waves + Grid Scan
- Footer   → Noise

## COLOR (only these)
#000000   void bg
#080808   deep bg
#2A2A2A   ash borders
#8B0000   blood accent
#CC2200   ember hover
#E8E2D9   bone text
#555555   ghost muted

## FONTS (only these)
Bebas Neue        → big headers (all next/font/google)
Cinzel Decorative → ceremonial statements
Space Mono        → body copy 13–14px
Barlow Condensed  → nav, labels, CTAs

## ABSOLUTE DON'TS
- No border-radius (globally: * { border-radius: 0 !important })
- No purple, no blue, no MUI default colors
- No emoji — SVG only for decorative marks
- No white or light backgrounds
- No products or shop UI

## BG Z-INDEX RULE
All backgrounds: position:absolute, inset:0, z-index:0
All content: position:relative, z-index:1

## KEY PACKAGES
framer-motion · gsap + @gsap/react · @studio-freight/lenis
@mui/material · @mui/icons-material · @emotion/react
three · @react-three/fiber · @react-three/drei · matter-js

## LOGO
/public/logo.png — user adds later
Use LogoComponent with useState error fallback → text "GOD'S FAV"

## LENIS + GSAP CONNECT
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
lenis.on('scroll', ScrollTrigger.update)

## MUI OVERRIDES
createTheme({ shape: { borderRadius: 0 }, palette: { mode: 'dark', primary: { main: '#8B0000' } } })
Always override via sx prop — never use default MUI purple/blue
