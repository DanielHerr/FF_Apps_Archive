# Design Tokens Documentation

Complete design token system for your Astro web application. All tokens are defined as CSS custom properties for easy theming and consistency.

## 📁 File Structure

```
/src/styles/
├── tokens.css    # Complete design token system
├── fonts.css     # Font imports and declarations
├── theme.css     # Tailwind integration and base styles
└── tailwind.css  # Tailwind configuration
```

## 🚀 Quick Start

### Import in Astro Layout

```astro
---
// src/layouts/Layout.astro
import '../styles/fonts.css';
import '../styles/tokens.css';
import '../styles/theme.css';
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

### Import in Astro Components

```astro
---
// Component.astro
---

<style>
  .button {
    background: var(--primary);
    color: var(--primary-foreground);
    padding: var(--spacing-button-y) var(--spacing-button-x);
    border-radius: var(--radius-button);
    font-family: var(--font-family-primary);
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
  }
</style>
```

## 🎨 Token Categories

### 1. Colors

#### Base Colors
```css
--color-purple-900 to --color-purple-500
--color-neutral-50 to --color-neutral-900
--color-accent-green
--color-accent-red
```

#### Semantic Colors (Light Mode)
```css
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--success, --success-foreground
--warning, --warning-foreground
--border, --ring
```

#### Dark Mode
Apply via `.dark` class or `[data-theme="dark"]` attribute.

### 2. Typography

#### Font Families
```css
--font-family-primary: 'Inter'        /* Body text */
--font-family-heading: 'Metropolis'   /* Headings */
--font-family-brand: 'Public Sans'    /* Brand text */
--font-family-mono                    /* Code */
```

#### Font Sizes
```css
--text-xs: 10px      /* Caption */
--text-sm: 12px      /* Labels */
--text-base: 16px    /* Body */
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px
--text-3xl: 32px     /* Large headings */
```

#### Semantic Text Sizes
```css
--text-caption, --text-label, --text-body
--text-h1, --text-h2, --text-h3, --text-h4
--text-brand-primary, --text-brand-secondary
```

#### Font Weights
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-bold: 700
```

#### Line Heights
```css
--line-height-tight: 1.17
--line-height-snug: 1.25
--line-height-normal: 1.5
--line-height-relaxed: 1.6
```

### 3. Spacing & Sizing

#### Spacing Scale
```css
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-6: 24px
--spacing-8: 32px
--spacing-12: 48px
/* ... up to --spacing-96: 384px */
```

#### Semantic Spacing
```css
--spacing-xs, --spacing-sm, --spacing-md
--spacing-lg, --spacing-xl, --spacing-2xl
```

#### Component Spacing
```css
--spacing-section, --spacing-container
--spacing-card, --spacing-button-x
```

#### Layout Sizes
```css
--max-width-md: 448px
--max-width-lg: 512px
--max-width-xl: 576px
--max-width-container: 1440px
```

#### Element Sizes
```css
--size-icon-sm: 16px
--size-icon-md: 20px
--size-avatar-md: 40px
--size-button-md: 40px
```

### 4. Border Radius
```css
--radius-sm: 2px
--radius-md: 4px        /* Base */
--radius-lg: 6px
--radius-xl: 8px
--radius-full: 9999px   /* Circular */
```

#### Component Radius
```css
--radius-button, --radius-input
--radius-card, --radius-modal
```

### 5. Shadows & Elevation
```css
--shadow-xs, --shadow-sm, --shadow-md
--shadow-lg, --shadow-xl, --shadow-2xl

--elevation-sm, --elevation-md, --elevation-lg

--shadow-card, --shadow-dropdown, --shadow-modal
--shadow-focus
```

### 6. Gradients & Effects
```css
--gradient-primary
--gradient-accent
--gradient-cool
--gradient-overlay-light
--gradient-overlay-dark
```

#### Transitions
```css
--transition-fast: 150ms
--transition-base: 200ms
--transition-slow: 300ms
```

#### Backdrop Effects
```css
--backdrop-blur-sm, --backdrop-blur-md
```

### 7. Chart Colors
```css
--chart-1 through --chart-8
--chart-blue, --chart-green, --chart-red
```

## 💡 Usage Examples

### Button Component
```astro
<button class="btn-primary">Click me</button>

<style>
  .btn-primary {
    background: var(--color-purple-700);
    color: var(--primary-foreground);
    padding: var(--spacing-3) var(--spacing-6);
    border-radius: var(--radius-button);
    font-family: var(--font-family-primary);
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    transition: var(--transition-base);
    box-shadow: var(--shadow-button);
  }
  
  .btn-primary:hover {
    box-shadow: var(--shadow-button-hover);
    opacity: 0.9;
  }
</style>
```

### Card Component
```astro
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>

<style>
  .card {
    background: var(--card);
    color: var(--card-foreground);
    padding: var(--spacing-card);
    border-radius: var(--radius-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
  }
  
  .card h3 {
    font-family: var(--font-family-heading);
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-4);
  }
  
  .card p {
    font-family: var(--font-family-primary);
    font-size: var(--text-base);
    line-height: var(--line-height-normal);
  }
</style>
```

### Typography Styles
```astro
<h1 class="heading-1">Main Heading</h1>
<p class="body-text">Body paragraph text</p>
<span class="caption">Caption text</span>

<style>
  .heading-1 {
    font-family: var(--font-family-heading);
    font-size: var(--text-h1);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-normal);
    color: var(--foreground);
  }
  
  .body-text {
    font-family: var(--font-family-primary);
    font-size: var(--text-base);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-normal);
    color: var(--foreground);
  }
  
  .caption {
    font-family: var(--font-family-primary);
    font-size: var(--text-caption);
    font-weight: var(--font-weight-normal);
    color: var(--muted-foreground);
  }
</style>
```

### Gradient Background
```astro
<div class="hero-section">
  <h1>Welcome</h1>
</div>

<style>
  .hero-section {
    background: var(--gradient-primary);
    padding: var(--spacing-section);
    border-radius: var(--radius-xl);
  }
  
  .hero-section h1 {
    color: white;
    font-family: var(--font-family-heading);
    font-size: var(--text-3xl);
  }
</style>
```

### Layout Container
```astro
<div class="container">
  <slot />
</div>

<style>
  .container {
    max-width: var(--max-width-container);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--spacing-container);
    padding-right: var(--spacing-container);
  }
</style>
```

## 🌓 Dark Mode Implementation

### Using Class Toggle
```astro
---
// Layout.astro
---

<html lang="en" class="dark">
  <!-- Your content -->
</html>

<script>
  // Toggle dark mode
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
</script>
```

### Using Data Attribute
```astro
<html lang="en" data-theme="dark">
  <!-- Your content -->
</html>

<script>
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>
```

### Automatic System Preference
```astro
<script>
  // Detect system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
  
  // Listen for changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
</script>
```

## 🎯 Best Practices

1. **Always use tokens instead of hard-coded values**
   - ✅ `color: var(--foreground)`
   - ❌ `color: #393473`

2. **Use semantic names for clarity**
   - ✅ `var(--spacing-button-x)`
   - ❌ `16px`

3. **Leverage component-specific tokens**
   - Use `--radius-button` instead of `--radius-md` for buttons

4. **Follow the spacing scale**
   - Stick to the predefined spacing values for consistency

5. **Use font family tokens**
   - Always reference `--font-family-primary`, `--font-family-heading`, etc.

6. **Test in both light and dark modes**
   - Ensure your components look good in both themes

## 🔧 Customization

To customize tokens, edit `/src/styles/tokens.css`:

```css
:root {
  /* Override any token */
  --color-purple-700: rgba(100, 50, 200, 1.00);
  --radius-base: 8px;
  --font-family-primary: 'Your Font', sans-serif;
}
```

## 📦 Integration with Tailwind

Your tokens are already integrated with Tailwind CSS v4 via `theme.css`. You can use Tailwind utilities with your design system:

```html
<div class="bg-background text-foreground p-4 rounded-md">
  Content
</div>
```

## 🔍 Token Reference

For a complete reference of all available tokens, see `/src/styles/tokens.css`.

## 📝 Notes

- **Metropolis Font**: This font needs to be hosted locally or purchased. Update `/src/styles/fonts.css` with the correct font files.
- **Opacity Values**: Transparent colors use opacity tokens for consistency.
- **Z-Index**: Use the predefined z-index layers to avoid stacking conflicts.
- **Transitions**: All transitions use easing functions for smooth animations.

---

**Questions or need help?** Refer to the inline comments in `tokens.css` for additional guidance.
