---
name: Sillar Clinical Hospitality
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f88'
  primary: '#002046'
  on-primary: '#ffffff'
  primary-container: '#1c365d'
  on-primary-container: '#879fcc'
  inverse-primary: '#aec7f6'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#20211f'
  on-tertiary: '#ffffff'
  tertiary-container: '#353634'
  on-tertiary-container: '#9f9f9b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f6'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2e476f'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e4e2df'
  tertiary-fixed-dim: '#c7c6c3'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#464745'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  surface-bg: '#f8f9ff'
  glass-border: rgba(0, 32, 70, 0.08)
  glass-white: rgba(255, 255, 255, 0.9)
  accent-green-soft: rgba(16, 185, 129, 0.1)
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The brand identity centers on "Clinical Precision meets High-End Hospitality." It is designed for a premium dental ecosystem where the technical excellence of a clinic is softened by the warmth of a luxury hotel. The aesthetic is sophisticated, airy, and reassuring.

The design style is a refined **Glassmorphism-Modern** hybrid. It utilizes deep-blur background effects, subtle radial gradients, and light-refracting surfaces to create a sense of cleanliness and advanced technology. The UI avoids heavy solid blocks in favor of semi-transparent layers that feel breathable and high-end. High-quality imagery is integrated through "hover-lift" cards that emphasize a human-centric approach.

## Colors

The palette is anchored in **Deep Midnight Blue (#002046)**, representing medical authority and trust. This is balanced by **Clinical Emerald (#10b981)**, used sparingly for accents, icons, and interactive states to signify health, vitality, and growth.

The background uses a tinted off-white **(#f8f9ff)** rather than pure white to reduce eye strain and maintain a premium feel. We employ subtle radial gradients (Emerald and Navy at 5% opacity) in the background corners to provide depth without clutter. High-contrast text is reserved for "On-Surface" roles to ensure accessibility against the translucent glass layers.

## Typography

The system uses a dual-font approach. **Manrope** is used for all display and headline roles, providing a modern, geometric, and confident personality. High-impact headlines (Display LG) utilize an extra-bold weight and tight letter spacing to command attention.

**Source Sans 3** is the workhorse for body text and labels. It offers exceptional legibility in clinical contexts, with a neutral character that doesn't compete with the primary brand typeface. For navigation and "Call to Action" labels, use the uppercase `label-md` with tracking set to `widest` to evoke a premium editorial feel.

## Layout & Spacing

The system follows a **Fixed-Width Grid** model for desktop, centered within a 1280px max-width container. Layouts are constructed using a 12-column grid with a 24px gutter. 

Spacing is based on an 8px base unit. Wide vertical margins (64px+) are encouraged to create a "gallery" feel and prevent the UI from feeling cramped. For mobile devices, horizontal margins compress to 20px, and large display types scale down using the mobile-specific variants defined in the typography section. Multi-column grids (like the portal cards) should collapse to a single column on mobile while maintaining their aspect ratio where possible.

## Elevation & Depth

Depth is achieved through **Tonal Stacking and Blur**, not traditional dark shadows.

1.  **Level 0 (Background):** Solid `#f8f9ff` with faint radial gradients.
2.  **Level 1 (The Glass Card):** A linear gradient (white to light blue) with a 16px backdrop blur. This level uses a very soft, deep shadow: `0 20px 40px rgba(0, 32, 70, 0.08)`.
3.  **Level 2 (Active Panels):** The content area within cards uses a higher backdrop blur (24px) and a semi-transparent white background (`rgba(255, 255, 255, 0.9)`). 
4.  **Interactive State:** Upon hover, elements should "lift" vertically by 12px and double their shadow intensity to `0 40px 80px rgba(0, 32, 70, 0.12)`.

## Shapes

The shape language is generously rounded to convey approachability and softness. Main containers and cards utilize a `3xl` (24px/1.5rem) corner radius. 

A signature design element is the **Asymmetric Glass Panel**: Internal content sections within a card use a large top-only radius (up to 40px/2.5rem) to create a "nested drawer" effect. Small icons and buttons use a `2xl` (16px/1rem) radius to maintain consistency with the larger containers.

## Components

### Portal Cards
Large-format links with high-resolution background imagery. Imagery should have an overlay or be desaturated on hover to ensure text legibility. The bottom content area must be a `glass-panel` that slides up or appears as a floating layer.

### Icon Containers
Icons should be housed in a 64x64px squircle (rounded-2xl) with a 10% opacity version of the secondary color as the background. Add a soft glow effect matching the icon color for high-priority clinical icons.

### Buttons / CTAs
Interactive labels should be uppercase, tracking-wide, and paired with a directional icon (e.g., `arrow_forward`). On hover, the icon should translate horizontally (+8px) to provide micro-feedback.

### Navigation / Header
The header is centered and minimal, utilizing a "diamond" brand anchor and `tracking-tighter` typography for the logo. It should remain fixed or absolute to let the page content scroll beneath its translucent layer.

### Footers
Separated by a subtle `primary/5` border, the footer uses a horizontal layout on desktop with high-contrast links that transition to the secondary emerald color on hover.