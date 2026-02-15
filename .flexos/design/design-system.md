Excellent. This is a perfect task for creating a structured yet flexible design playbook. I will synthesize the provided `Design Direction` and `Brand Brief` into the requested `.flexos/design/design-system.md` format.

---
type: config
subtype: design-system
title: Design System
---

This document provides the foundational design system for the Wimmer EDV website redesign. It is structured to give an AI builder (you) a clear set of rules and a strong sense of creative direction.

The system has TWO parts:
*   **TOKENS:** These are the non-negotiable, exact values you **must** use for colors, fonts, and core spacing to ensure brand consistency.
*   **CREATIVE DIRECTION:** These are the principles and guidelines that inspire creative layouts and interactions. They define the *feeling* of the site, giving you the freedom to build unique pages that share the same DNA.

---

# PART 1: TOKENS (The Builder MUST Use These)

## Colors

The color palette is designed to feel trustworthy, professional, and modern, moving beyond generic "tech blue." It is built around a sophisticated Slate Blue foundation, a vibrant Green accent for action, and clean, soft neutrals.

**Reasoning:** The **Slate Blue** (`primary`) conveys stability and calm competence. The **Tech Green** (`accent`) signifies success, health, and action, drawing the eye to key CTAs. The optional **Warm Ochre** (`secondary`) can be used for special highlights like partner badges. The `surface` colors are soft and warm, making the generous white space feel more inviting and premium.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAF0F6',
          100: '#D5E1ED',
          200: '#ACC3DB',
          300: '#82A5CA',
          400: '#5987B8',
          500: '#446E9B',
          600: '#2D557F',
          700: '#2D3748', // Base: Slate Blue
          800: '#202835',
          900: '#161C24',
        },
        accent: {
          50: '#EDF9F1',
          100: '#D5F1DE',
          200: '#ADDEC4',
          300: '#85CAAB',
          400: '#5CB691',
          500: '#38A169', // Base: Tech Green
          600: '#2F855A',
          700: '#276749',
          800: '#1F4D38',
          900: '#173628',
        },
        secondary: { // Optional: Warm Ochre
          50: '#FEF8ED',
          100: '#FDF0D5',
          200: '#FAE3AD',
          300: '#F6D684',
          400: '#F0C25A',
          500: '#D69E2E', // Base: Warm Ochre
          600: '#B08226',
          700: '#8A661E',
          800: '#644A16',
          900: '#3E2E0E',
        },
        surface: { // Neutrals
          50: '#F7FAFC',   // Off-White (Page Background)
          100: '#EDF2F7',
          200: '#E2E8F0',  // Light Gray (Borders, Cards)
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',  // Same as primary-700
          800: '#1A202C',  // Dark Text
          900: '#171923',
        },
      }
    }
  }
}
```

**Semantic Colors:**
*   **success:** `#38A169` (use the `accent` base)
*   **warning:** `#D69E2E` (use the `secondary` base)
*   **error:** `#C53030` (a deep, serious red that complements the palette)

## Typography

-   **Heading Font:** **Inter**. It is a modern, highly legible geometric sans-serif designed for UIs. Its confidence and clarity perfectly match the "calm competence" brand personality.
-   **Body Font:** **Inter**. Using a single, versatile font family ensures visual harmony and a professional, cohesive feel across the entire site.

-   **Tailwind Font Size Scale:**
    ```javascript
    // tailwind.config.js -> theme.fontSize
    'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
    'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
    'base': ['1rem', { lineHeight: '1.6' }],         // 16px (Base body)
    'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px (Larger body)
    'xl': ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
    '3xl': ['1.875rem', { lineHeight: '1.4' }],    // 30px (H3)
    '4xl': ['2.25rem', { lineHeight: '1.3' }],     // 36px (H2)
    '5xl': ['3rem', { lineHeight: '1.2' }],        // 48px (H1)
    '6xl': ['3.75rem', { lineHeight: '1.1' }],     // 60px (Hero)
    ```

-   **Font Weight Usage:**
    -   `font-regular` (400): All body copy, paragraphs, and detailed text.
    -   `font-medium` (500): UI elements like navigation links, button text, and captions for emphasis.
    -   `font-semibold` (600): Sub-headings (`<h4>`, `<h5>`) and important labels.
    -   `font-bold` (700): Primary headlines (`<h1>`, `<h2>`, `<h3>`).

## Spacing

-   **Section Vertical Padding:** Generous. Use `py-24` (96px) or `py-32` (128px) between major page sections to create a clean, uncluttered, and premium feel.
-   **Content Max-Width:** `1280px` (`max-w-7xl`). This provides a comfortable reading line-length on large screens.
-   **Container Horizontal Padding:** `px-4` on mobile, `px-6` on `md` screens and up. Ensures content never touches the screen edges.

## Shapes

-   **Border Radius:** Use subtle, modern rounding.
    -   `rounded-md` (6px) or `rounded-lg` (8px): Default for buttons, cards, and input fields.
    -   `rounded-xl` (12px) or `rounded-2xl` (16px): For larger containers and images to give a slightly softer, more modern feel.
    -   `rounded-full`: Only for small, circular elements like avatars, tags, or status indicators.
    -   Avoid sharp corners (`rounded-none`) unless a specific design calls for it.

-   **Shadow Style:** Diffuse and subtle. Use shadows to lift elements off the background, not to create heavy borders.
    -   Default: Tailwind's `shadow-md`.
    -   On Hover: Transition to `shadow-lg` to indicate interactivity.
    -   The shadow color should be very subtle, based on `primary-700` with low opacity.

---

# PART 2: CREATIVE DIRECTION (Inspire the Builder)

## Visual Personality (3-5 adjectives)

**Confident, Structured, Reassuring, Clean, Professional.**

Every component and layout should feel intentional and organized. This is the digital equivalent of a firm, trustworthy handshake.

## Animation & Motion Language

Motion should be **subtle, smooth, and professional**. It should enhance the user experience by providing feedback and guiding attention, never distracting.

-   **Page transitions**: A simple, quick `fade` is sufficient.
-   **Scroll animations**: Gentle `fade-up` and `slide-in from bottom` for elements as they enter the viewport. Stagger animations for lists or card grids to create a pleasing reveal.
-   **Hover effects**: On cards, a gentle `scale-up` and `shadow lift`. On links, a color shift to `accent-500`. On primary buttons, a subtle brightness shift.
-   **Micro-interactions**: Form fields should get a soft `ring` of `primary-300` on focus. Accordions/menus should expand and collapse smoothly, not snap open.
-   **Speed**: Smooth and reassuring. Use durations of `200ms` to `400ms`.
-   **Easing**: `ease-in-out` for an elegant, professional feel.

**Actionable Tailwind Examples:**
1.  **Card Hover:** `transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1`
2.  **Button Hover:** `transition-colors duration-200 ease-in-out hover:bg-accent-600`
3.  **Scroll-In Fade-Up (for use with Intersection Observer):** `transition-all duration-500 ease-in-out opacity-0 translate-y-4` (and a class that toggles to `opacity-100 translate-y-0`).

## Layout Philosophy

-   **Whitespace:** **Generous.** White space is the most important tool for creating a premium, organized, and calm aesthetic. Do not crowd elements. Let the content breathe.
-   **Grid Rhythm:** Adhere to a **structured grid** (like a 12-column system) for primary content. This reinforces the feeling of order and professionalism. You can break the grid for visual interest with hero images or offset decorative elements, but the core text and UI should be aligned.
-   **Image Treatment:** Images should be clean and well-composed. They can be used as full-bleed background heroes, contained within cards (`rounded-xl`), or placed in grid columns. When featuring people, ensure the photography is high-quality and authentic.
-   **Section Rhythm:** Create a gentle rhythm by alternating section backgrounds between `surface-50` (Off-White) and `surface-100/200` (Light Gray). This visually separates content blocks without needing harsh dividers.

## Photography & Image Style

-   **Style:** **Authentic, human-centric, and professional.** The focus is on the *outcome* of good IT: productive people in clean, modern office environments feeling calm and focused.
-   **Color Treatment:** Bright, natural, and warm. Avoid overly corporate, blue-filtered, or desaturated looks.
-   **Subject Matter:**
    -   **Primary:** Professional, warm photos of the Wimmer EDV team.
    -   **Secondary:** People who look like their target clients (small business owners, office staff).
    -   **Abstract/Icons:** Use clean, minimalist line-art icons to represent services. Avoid 3D or overly-stylized illustrations.

## Inspiration References

-   **Stripe (stripe.com):** For its impeccable typographic hierarchy, generous use of whitespace, and structured layouts. Notice how their CTAs use a clear accent color and how sections are cleanly divided.
-   **Intercom (intercom.com):** For its excellent use of human-centric photography that feels authentic, not staged. Their messaging is clear, benefit-focused, and avoids jargon.
-   **A-Team Systems (a-teamsystems.com):** As a competitor reference. They do a decent job with a clean, professional look. Our goal is to elevate this with a more sophisticated color palette, superior typography, and more authentic imagery.

## Do's and Don'ts

### DO:
*   **Do use generous whitespace** to guide the eye and create a calm, premium feel.
*   **Do lead with clear, benefit-focused headlines** that speak directly to the client's needs ("Focus on your business, not your IT").
*   **Do use authentic photography** of the team and realistic client environments.
*   **Do maintain a strict visual hierarchy.** The most important element on the page should be immediately obvious.
*   **Do use the `accent` green sparingly** but effectively for primary calls-to-action to maximize its impact.

### DON'T:
*   **Don't use generic stock photos** (cheesy handshakes, server room clichés, glowing blue globes).
*   **Don't clutter the page.** When in doubt, remove an element. Less is more.
*   **Don't use overly complex or flashy animations.** Motion should be subtle and serve a purpose.
*   **Don't use pure black (`#000000`) for text.** Use `surface-800` (`#1A202C`) for better readability.
*   **Don't be afraid of empty space.** It is an active and powerful design element.