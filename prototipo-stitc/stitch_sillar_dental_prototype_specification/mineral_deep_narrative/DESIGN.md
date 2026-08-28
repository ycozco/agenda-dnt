---
name: Mineral Deep Narrative
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8f9097'
  outline-variant: '#44474d'
  surface-tint: '#b9c7e4'
  primary: '#b9c7e4'
  on-primary: '#233148'
  primary-container: '#0a192f'
  on-primary-container: '#74829d'
  inverse-primary: '#515f78'
  secondary: '#46fcb4'
  on-secondary: '#003824'
  secondary-container: '#00df9a'
  on-secondary-container: '#005d3e'
  tertiary: '#9bcbff'
  on-tertiary: '#003256'
  tertiary-container: '#001a30'
  on-tertiary-container: '#1286d6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#4affb7'
  secondary-fixed-dim: '#0fe29c'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#d0e4ff'
  tertiary-fixed-dim: '#9bcbff'
  on-tertiary-fixed: '#001d34'
  on-tertiary-fixed-variant: '#004a7a'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
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
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered to evoke a sense of clinical precision fused with high-end hospitality. The brand personality is authoritative yet approachable, shifting the medical experience from sterile to sophisticated. 

The aesthetic leverages **Modern Glassmorphism** layered over a **Minimalist** foundation. By using deep, nocturnal foundations contrasted with vibrant action states, the UI creates a "dark-mode-first" luxury feel that reduces eye strain and emphasizes high-value data. The visual narrative is driven by depth, using translucent surfaces and organic curves inspired by natural architectural arches to soften the professional tone.

## Colors

The palette centers on **Deep Navy (#0a192f)** for primary surfaces and "Mineral" immersion. **Action Green (#00df9a)** is reserved exclusively for high-priority conversion points and success states, providing a high-visibility contrast against the dark base.

**Sillar White (#f8fafc)** serves as the high-contrast background for content-heavy internal sections, while **Teal (#4facfe)** and **Slate (#94a3b8)** provide sophisticated accents for iconography, borders, and secondary metadata. Use subtle gradients combining Primary and Tertiary colors to imply depth in glassmorphic headers.

## Typography

This design system utilizes **Manrope** across all roles to maintain a unified, technical aesthetic. Dramatic scale differences between display titles and body text create a clear information hierarchy. 

Headlines must use **tight negative letter-spacing** and heavy weights to achieve a modern, "editorial" look. Body text maintains generous line-heights to ensure legibility in clinical contexts. Labels and small caps should utilize increased letter-spacing for clarity at small sizes.

## Layout & Spacing

The layout follows a **Fluid Grid** model based on an 8px base unit. Desktop layouts utilize a 12-column structure with wide 64px outer margins to create a "premium" sense of space and focus. 

Mobile layouts transition to a 4-column structure with 20px margins. Use dynamic vertical padding (ranging from 48px to 96px) between major sections to allow the "Sillar Arch" container shapes to breathe. Content should reflow vertically on mobile, with glassmorphic cards stacking rather than shrinking.

## Elevation & Depth

Depth is established through three distinct layers:
1.  **The Canvas:** The deep navy or soft off-white foundation.
2.  **Glass Layers:** Semi-transparent panels with a `20px` backdrop blur and `10%` white border-stroke to simulate light catching the edge of glass.
3.  **Floating Elements:** Components like primary CTAs use "Soft & Deep" shadows. These shadows use the Primary color (#0a192f) at `15%` opacity with a high blur radius (`40px`) and a significant vertical offset (`20px`) to create a sense of hovering weightlessness.

## Shapes

The design system employs a **Rounded** (12px) base for standard components like buttons and input fields. 

A signature "Sillar Arch" organic shape is used for top-level containers and image masks—these are defined by asymmetrical rounding where one or two corners utilize a significantly larger radius (e.g., `80px`) to mimic architectural arches. This provides a distinctive, flowing silhouette that differentiates the product from standard grid-based medical software.

## Components

*   **Buttons:** Primary CTAs use Action Green (#00df9a) with dark text. Secondary buttons use a glassmorphic style (blurred background with white border).
*   **Cards:** Use a combination of a 1px "inner glow" stroke and a deep ambient shadow. On dark backgrounds, cards should be slightly lighter than the base; on light backgrounds, cards should be pure white.
*   **Inputs:** Minimalist fields with only a bottom border that transforms into a full-rounded container on focus.
*   **Chips:** High-contrast capsules with 50% opacity backgrounds of their respective status colors (e.g., a Teal chip for "Confirmed").
*   **Clinical Imagery:** All photos must feature soft depth-of-field (bokeh) and clean, natural lighting. Images should be housed in "Sillar Arch" containers to maintain the organic flow of the design system.