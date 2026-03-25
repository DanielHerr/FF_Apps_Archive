/**
 * PostCSS Configuration
 * Transpiles CSS custom properties (variables) to static values
 * for Firefox OS v1 (Gecko 18) compatibility
 * 
 * With preserve: true, output includes BOTH:
 * - Static fallback values (for Gecko 18 - light mode only)
 * - var() syntax (for modern browsers - full theming support)
 */
const postcssGlobalData = require('@csstools/postcss-global-data');
const postcssCustomProperties = require('postcss-custom-properties');

const globalDataConfig = {
  files: [
    './src/styles/colors-primitives.css',  // Load primitives first
    './src/styles/design-tokens.css',
    './src/styles/colors-semantic.css'
  ]
};

module.exports = {
  plugins: [
    // First pass: load all CSS variable definitions globally
    postcssGlobalData(globalDataConfig),
    // First resolution pass - preserve both static and var()
    postcssCustomProperties({ preserve: true }),
    // Second pass to resolve chained variables (semantic → primitive)
    postcssGlobalData(globalDataConfig),
    postcssCustomProperties({ preserve: true })
  ]
};
