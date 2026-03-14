# Design Tokens Documentation

Complete design token system extracted from Figma Design Library for the Firefox Apps Archive project. All tokens are defined as CSS custom properties for consistency, theming, and easy maintenance.

## 📁 File Structure

```
/src/styles/
├── colors-primitives.css  # Base color palette (raw values)
├── colors-semantic.css    # Semantic color assignments (light/dark modes)
├── design-tokens.css      # Typography, spacing, sizing, borders, effects
├── fonts.css              # Font imports (Inter, Public Sans, Metropolis)
├── index.css              # Main CSS entry point
├── scrollbar.css          # Custom scrollbar styles
```

## 🎯 Design System Principles

**Font Families:**
- **Metropolis** - Headings (Bold, weights: 400, 700)
- **Inter** - Body text (Regular, weights: 400, 700)
- **Public Sans** - Brand text (weights: 400, 700)

**Color Usage:**
- Use **semantic tokens** in components (e.g., `--surface-light-mid`, `--on-surface-light-regular`)
- Avoid **primitive tokens** unless creating new semantic tokens (e.g., `--violet-50`, `--green-40`)

**Typography Requirements:**
- Always explicitly set: `font-family`, `font-weight`, `font-size`, `line-height`
- Use design token variables for all typography properties

---

## 🚀 Quick Start

### Import in Astro Layout

```astro
---
// src/layouts/Layout.astro
import '../styles/index.css'; // Imports all styles including fonts and tokens
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Basic Component Usage

```astro
---
// Component.astro
---

<div class="card">
  <h2 class="card-title">Card Title</h2>
  <p class="card-body">Card body text</p>
</div>

<style>
  .card {
    background: var(--surface-light-mid);
    border: var(--border-sm) solid var(--on-surface-light-border-low);
    border-radius: var(--radius-md);
    padding: var(--spacing-32);
    gap: var(--spacing-12);
  }
  
  .card-title {
    /* Typography - Metropolis Bold, 20px/24px */
    font-family: var(--font-metropolis);
    font-weight: var(--font-weight-bold);
    font-size: var(--heading-xxs-size);
    line-height: var(--heading-xxs-line);
    color: var(--on-surface-light-regular);
  }
  
  .card-body {
    /* Typography - Inter Regular, 14px/22px */
    font-family: var(--font-inter);
    font-weight: var(--font-weight-regular);
    font-size: var(--body-sm-size);
    line-height: var(--body-sm-line);
    color: var(--on-surface-light-regular);
  }
</style>
```

---

## 🎨 Color Tokens

### Semantic Colors (Light Mode)

Use these semantic tokens in your components:

#### Surface Backgrounds
```css
--surface-light-mid: #ffffff          /* White - primary surface */
--surface-light-low: #fafafa          /* Off-white - secondary surface */
--surface-light-high: #e8e8e8         /* Light gray - elevated surface */
--surface-light-primary-low: #e6dfff  /* Violet tint - primary accent surface */
--surface-light-secondary-low: #ffb4db /* Pink tint - secondary accent surface */
```

#### Surface Gradients
```css
--surface-light-primary-gradient-start: #7543e3  /* Violet 60 */
--surface-light-primary-gradient-end: #582acb    /* Violet 70 */
--surface-light-background-start: #fafafa        /* White to */
--surface-light-background-end: #ffffff          /* Strong white */
```

#### Text & Borders (On Surface)
```css
--on-surface-light-regular: #393473      /* Ink 05 - primary text */
--on-surface-light-faded: rgba(57, 52, 115, 0.7)  /* 70% opacity - secondary text */
--on-surface-light-border-low: rgba(57, 52, 115, 0.2)  /* 20% opacity - borders */
--on-surface-light-primary: #582acb      /* Violet 70 - primary accent */
--on-surface-light-on-primary: #ffffff   /* White - text on primary */
--on-surface-light-scrollbar: rgba(22, 22, 22, 0.3)  /* Black 30% - scrollbar */
```

#### Attention Colors (Context-Independent)
```css
--attention-click: #0060df      /* Blue - interactive elements */
--attention-success: #3fe1b0    /* Green - success states */
--attention-error: #ff6a75      /* Red - error states */
--attention-light-warning: #ffea80  /* Yellow - warning (light mode) */
```

#### Category Colors (Any Mode)
```css
--on-surface-any-blue: #0060e0
--on-surface-any-yellow: #c45a28
--on-surface-any-purple: #b933e1
--on-surface-any-orange: #e25821
--on-surface-any-red: #ff505f
```

### Dark Mode

Dark mode is automatically applied via `@media (prefers-color-scheme: dark)` or explicit theme selection with radio inputs `#light_theme` and `#dark_theme`.

The semantic tokens (e.g., `--surface-light-mid`) are automatically remapped to dark equivalents:
- `--surface-light-mid` → `#1f2033` (Gray Marketing 90)
- `--on-surface-light-regular` → `#ededf0` (Gray Marketing 20)
- etc.

---

## 📝 Typography Tokens

### Font Families
```css
--font-metropolis: 'Metropolis', sans-serif    /* Headings */
--font-inter: 'Inter', sans-serif              /* Body text */
--font-public-sans: 'Public Sans', sans-serif  /* Brand text */
```

### Font Weights
```css
--font-weight-regular: 400
--font-weight-bold: 700
```

### Heading Sizes (Metropolis Bold)

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--heading-billboard-size` | 128px | auto | Hero/billboard text |
| `--heading-xxl-size/line` | 64px / 72px | Extra large headings |
| `--heading-xl-size/line` | 56px / 64px | Large headings |
| `--heading-lg-size/line` | 48px / 56px | Section headings |
| `--heading-md-size/line` | 40px / 44px | Page headings |
| `--heading-sm-size/line` | 32px / 36px | Sub-headings |
| `--heading-xs-size/line` | 24px / 28px | Card headings |
| `--heading-xxs-size/line` | 20px / 24px | Small headings |
| `--heading-xxxs-size/line` | 16px / 20px | Tiny headings (H2) |

### Body Sizes (Inter Regular)

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--body-lg-size/line` | 18px / 36px | Large body text |
| `--body-md-size/line` | 16px / 24px | Standard body text |
| `--body-sm-size/line` | 14px / 22px | Small body text |
| `--body-xs-size/line` | 12px / 18px | Caption text |
| `--body-xxs-size/line` | 10px / 16px | Micro text |

### Brand Sizes (Public Sans)

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--brand-bold-md-size/line` | 24px / 20px | 700 | Brand headlines |
| `--brand-regular-md-size/line` | 20px / 20px | 400 | Brand subtext |
| `--brand-bold-sm-size/line` | 18px / 20px | 700 | Small brand text |
| `--brand-regular-sm-size/line` | 16px / 20px | 400 | Brand body |

---

## 📏 Spacing & Sizing Tokens

### Spacing Scale (8-point system)
```css
--spacing-2: 2px
--spacing-4: 4px
--spacing-8: 8px
--spacing-12: 12px
--spacing-16: 16px
--spacing-20: 20px
--spacing-24: 24px
--spacing-28: 28px
--spacing-32: 32px
--spacing-36: 36px
--spacing-40: 40px
--spacing-44: 44px
--spacing-48: 48px
--spacing-52: 52px
--spacing-56: 56px
--spacing-60: 60px
--spacing-64: 64px
```

### Icon Sizes
```css
--icon-xxxxs: 8px    /* Tiny badge */
--icon-xxxs: 10px    /* Small badge */
--icon-xxs: 12px     /* Badge/indicator */
--icon-xs: 14px      /* Small icon */
--icon-sm: 16px      /* Standard icon */
--icon-md: 24px      /* Medium icon */
--icon-lg: 32px      /* Large icon */
```

### App Icon Sizes
```css
--app-icon-sm: 52px
--app-icon-md: 92px
--app-icon-lg: 138px
```

### Layout Sizes
```css
--layout-min-width: 320px
--layout-max-width: 1000px
--content-width: 400px
--full-width: 1268px
```

### Breakpoints
```css
--breakpoint-mobile-lg: 481px
--breakpoint-tablet-md: 769px
--breakpoint-desktop-sm: 1200px
```

---

## 🔲 Border & Radius Tokens

### Border Thickness
```css
--border-sm: 0.5px
--border-md: 1px
--border-lg: 2px
--border-xl: 4px
```

### Border Radius
```css
--radius-md: 4px     /* Base radius */
--radius-lg: 12px    /* Large radius */
--radius: 4px        /* Legacy alias */
```

---

## ✨ Effects Tokens

### Shadows
```css
--shadow-app-icon: 0px 1px 1px 0px rgba(0, 0, 0, 0.1)
```

### Blur
```css
--blur-app-header: 25px
```

### Opacity
```css
--opacity-app-image: 0.15
--opacity-contrast: 1
```

---

## 💡 Usage Examples

### Button with Hover States

```astro
<button class="btn-primary">Click me</button>

<style>
  .btn-primary {
    /* Layout */
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-8);
    padding: var(--spacing-12) var(--spacing-24);
    
    /* Typography - Inter Regular, 16px */
    font-family: var(--font-inter);
    font-weight: var(--font-weight-regular);
    font-size: var(--body-md-size);
    line-height: var(--body-md-line);
    
    /* Colors */
    background: linear-gradient(
      135deg,
      var(--surface-light-primary-gradient-start),
      var(--surface-light-primary-gradient-end)
    );
    color: var(--on-surface-light-on-primary);
    border: var(--border-sm) solid var(--on-surface-light-border-low);
    border-radius: var(--radius-md);
    
    /* Interaction */
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn-primary:hover:not(:focus-visible) {
    opacity: 0.9;
  }
  
  .btn-primary:focus-visible {
    outline: var(--border-lg) solid var(--attention-click);
    outline-offset: 2px;
  }
  
  .btn-primary:active {
    transform: scale(0.98);
  }
  
  .btn-primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
```

### Card with Border Overlay Pattern

```astro
<div class="card">
  <div class="border-overlay" aria-hidden="true"></div>
  <h3 class="card-title">Card Title</h3>
  <p class="card-description">Card description text goes here.</p>
</div>

<style>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12);
    padding: var(--spacing-32);
    background: var(--surface-light-mid);
    border-radius: var(--radius-lg);
  }
  
  /* Border overlay with shadow */
  .border-overlay {
    position: absolute;
    inset: 0;
    border: var(--border-sm) solid var(--on-surface-light-border-low);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-app-icon);
    pointer-events: none;
  }
  
  .card-title {
    /* Typography - Metropolis Bold, 24px/28px */
    font-family: var(--font-metropolis);
    font-weight: var(--font-weight-bold);
    font-size: var(--heading-xs-size);
    line-height: var(--heading-xs-line);
    color: var(--on-surface-light-regular);
    margin: 0;
  }
  
  .card-description {
    /* Typography - Inter Regular, 14px/22px */
    font-family: var(--font-inter);
    font-weight: var(--font-weight-regular);
    font-size: var(--body-sm-size);
    line-height: var(--body-sm-line);
    color: var(--on-surface-light-faded);
    margin: 0;
  }
</style>
```

### Icon with Badge

```astro
<div class="icon-wrapper">
  <svg class="icon"><!-- icon path --></svg>
  <span class="badge"></span>
</div>

<style>
  .icon-wrapper {
    position: relative;
    display: inline-block;
    width: var(--icon-md);
    height: var(--icon-md);
  }
  
  .icon {
    width: 100%;
    height: 100%;
    color: var(--on-surface-light-regular);
  }
  
  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: var(--icon-xxxxs);
    height: var(--icon-xxxxs);
    background: var(--attention-error);
    border-radius: 50%;
    border: var(--border-sm) solid var(--surface-light-mid);
  }
</style>
```

---

## 🎯 Best Practices

### ✅ DO:
1. **Always use semantic color tokens** (e.g., `--on-surface-light-regular`)
2. **Always set explicit typography** (font-family, font-weight, font-size, line-height)
3. **Use spacing scale tokens** (e.g., `--spacing-12`, never `12px`)
4. **Follow hover/focus pattern**: `:hover:not(:focus-visible)` for proper accessibility
5. **Add active scale**: `:active { transform: scale(0.98); }` for tactile feedback
6. **Use border overlay pattern** for cards/modals with borders and shadows

### ❌ DON'T:
1. **Never use primitive color tokens** directly (e.g., `--violet-50`, `--green-40`)
2. **Never hardcode values** (use tokens instead)
3. **Never use Tailwind classes** in Astro components (this project doesn't have Tailwind)
4. **Never mix focus and hover states** (hover should be overridden by focus)
5. **Never use fonts** other than Metropolis, Inter, or Public Sans

---

## 🌓 Dark Mode Implementation

Dark mode is automatically handled via CSS media queries and can be manually controlled with theme toggles.

### Automatic (System Preference)
```css
@media (prefers-color-scheme: dark) {
  /* Semantic tokens automatically remap to dark values */
}
```

### Manual Theme Selection
```html
<!-- In your layout HTML -->
<input type="radio" name="theme" id="light_theme" />
<input type="radio" name="theme" id="dark_theme" />
<input type="radio" name="theme" id="auto_theme" checked />

<body>
  <!-- Your content -->
</body>
```

The CSS automatically handles theme switching:
- `#light_theme:checked` forces light mode
- `#dark_theme:checked` forces dark mode
- `#auto_theme:checked` respects system preference

---

## 📊 Primitive Color Reference

### Color Scales Available

The following primitive color scales are defined in `colors-primitives.css`:

**Chromatic Colors:**
- Green: `--green-05` to `--green-90` (10 shades)
- Blue: `--blue-05` to `--blue-90` (10 shades)
- Violet: `--violet-05` to `--violet-90` (10 shades)
- Purple: `--purple-05` to `--purple-90` (10 shades)
- Pink: `--pink-05` to `--pink-90` (10 shades)
- Red: `--red-05` to `--red-90` (10 shades)
- Orange: `--orange-05` to `--orange-90` (10 shades)
- Yellow: `--yellow-05` to `--yellow-90` (10 shades)

**Neutrals:**
- Standard: `--neutral-black`, `--neutral-white`, `--neutral-gray-*`
- Marketing Gray: `--gray-marketing-10` to `--gray-marketing-99` (10 shades)
- Ink (Brand Purple): `--ink-05` to `--ink-90` (10 shades)

**Special:**
- Opacity variants: `--black-30`, `--white-80`, `--ink-05-70`, etc.

> ⚠️ **Note:** Use semantic tokens instead of primitives in components!

---

## 🔧 Customization

To customize the design system, edit the appropriate CSS files:

### Modify Colors
Edit `/src/styles/colors-primitives.css` for base colors or `/src/styles/colors-semantic.css` for semantic assignments.

### Modify Typography
Edit `/src/styles/design-tokens.css`:
```css
:root {
  --heading-xxxs-size: 18px;  /* Changed from 16px */
  --body-md-size: 15px;       /* Changed from 16px */
}
```

### Modify Spacing
Edit `/src/styles/design-tokens.css`:
```css
:root {
  --spacing-12: 14px;  /* Changed from 12px */
}
```

## 📝 Notes

- **Metropolis Font**: This font is loaded locally. If font files aren't available, update `/src/styles/fonts.css` with proper font file paths.
- **No Tailwind**: This Astro project does NOT use Tailwind CSS. All styling must use regular CSS with design tokens.
- **Semantic First**: Always prefer semantic tokens over primitive tokens for consistency across light/dark modes.
- **Typography is Explicit**: Unlike Tailwind, typography styles are never inherited. Always set font-family, font-weight, font-size, and line-height explicitly.

---
