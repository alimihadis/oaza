# Dark Mode Implementation Guide

## Overview

This guide documents the comprehensive dark mode implementation for the Oaza Software website. The dark mode system provides a seamless user experience with automatic theme detection, smooth transitions, and consistent pastel color schemes across both light and dark themes.

## Features

- **Automatic Theme Detection**: Detects user's system preference on first visit
- **Persistent Storage**: Remembers user's theme choice using localStorage
- **Smooth Transitions**: 300ms color transitions for all theme changes
- **Pastel Color Integration**: Maintains the beautiful pastel color palette in both themes
- **Responsive Design**: Dark mode works seamlessly across all device sizes
- **Accessibility**: High contrast ratios and proper color combinations

## Technical Implementation

### 1. Theme Context (`src/contexts/ThemeContext.tsx`)

The core of the dark mode system is the React Context that manages theme state:

```tsx
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

**Key Features:**
- Prevents hydration mismatches with `mounted` state
- Automatically detects system preference
- Persists theme choice in localStorage
- Provides theme toggle functionality

### 2. Theme Toggle Component (`src/components/ui/ThemeToggle.tsx`)

A beautiful animated toggle button with sun/moon icons:

```tsx
<motion.button
  onClick={toggleTheme}
  className="relative w-12 h-12 rounded-full bg-gradient-to-r from-pastel-500 to-dream-end dark:from-pastel-dark-500 dark:to-lavender-dark-500 p-3 text-white"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  {/* Animated icon rotation */}
  <motion.div
    animate={{ rotate: theme === 'dark' ? 180 : 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {theme === 'light' ? <Moon /> : <Sun />}
  </motion.div>
</motion.button>
```

### 3. Tailwind Configuration (`tailwind.config.js`)

Extended with dark mode colors and pastel variants:

```javascript
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Dark mode base colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          // ... up to 950: '#020617'
        },
        // Dark mode pastel variants
        'pastel-dark': {
          50: '#0f172a',
          100: '#1e293b',
          // ... with pastel accent colors
        },
        'lavender-dark': { /* similar structure */ },
        'sky-dark': { /* similar structure */ }
      }
    }
  }
}
```

### 4. Layout Integration (`src/app/layout.tsx`)

The root layout includes the ThemeProvider and base dark mode classes:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo2.variable} font-exo2 bg-white dark:bg-dark-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          {/* ... children */}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Color System

### Light Mode Colors
- **Backgrounds**: White, gray-50, gray-100
- **Text**: gray-900, gray-700, gray-600
- **Accents**: Pastel, Lavender, Sky color palettes
- **Borders**: gray-200, gray-300

### Dark Mode Colors
- **Backgrounds**: dark-950, dark-900, dark-800, dark-700
- **Text**: gray-100, gray-200, gray-300, gray-400
- **Accents**: pastel-dark, lavender-dark, sky-dark variants
- **Borders**: dark-700, dark-600

### Pastel Color Mapping

| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| pastel-500 | pastel-dark-500 | Primary buttons, icons |
| pastel-100 | pastel-dark-200 | Backgrounds, cards |
| pastel-600 | pastel-dark-400 | Hover states, text |
| lavender-500 | lavender-dark-500 | Secondary elements |
| sky-500 | sky-dark-500 | Accent elements |

## Component Updates

### 1. Navigation (`src/components/layout/Navigation.tsx`)

- Added theme toggle button
- Updated all color classes with dark: variants
- Maintained pastel color scheme in both themes

### 2. Hero Section (`src/components/sections/Hero.tsx`)

- Background elements adapt to dark mode
- Text colors transition smoothly
- 3D elements maintain visibility

### 3. Services Section (`src/components/sections/Services.tsx`)

- Card backgrounds adapt to theme
- Icon colors maintain pastel palette
- 3D models use theme-appropriate colors

### 4. About Section (`src/components/sections/About.tsx`)

- Value cards support both themes
- Background gradients adapt
- Stats icons maintain pastel colors

### 5. Portfolio Section (`src/components/sections/Portfolio.tsx`)

- Filter buttons adapt to theme
- Project cards maintain readability
- 3D models use theme colors

### 6. Contact Section (`src/components/sections/Contact.tsx`)

- Form elements support dark mode
- Contact info cards adapt
- 3D background elements adjust

### 7. Footer (`src/components/layout/Footer.tsx`)

- Dark gradient backgrounds
- Text colors maintain contrast
- Social icons and links adapt

## CSS Classes Pattern

### Base Classes
```css
/* Light mode (default) */
.bg-white
.text-gray-900
.border-gray-200

/* Dark mode */
.dark:bg-dark-950
.dark:text-gray-100
.dark:border-dark-700
```

### Transition Classes
```css
/* Smooth transitions for all theme changes */
transition-colors duration-300
```

### Conditional Classes
```css
/* Different colors for different themes */
bg-pastel-100 dark:bg-pastel-dark-200
text-pastel-600 dark:text-pastel-400
```

## Usage Examples

### Adding Dark Mode to New Components

1. **Import the theme hook:**
```tsx
import { useTheme } from '@/contexts/ThemeContext';
```

2. **Use theme-aware classes:**
```tsx
<div className="bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  Content
</div>
```

3. **Add theme toggle if needed:**
```tsx
import ThemeToggle from '@/components/ui/ThemeToggle';

// In your component
<ThemeToggle />
```

### Custom Color Classes

```css
/* In globals.css */
.my-custom-class {
  @apply bg-pastel-100 dark:bg-pastel-dark-200 text-pastel-800 dark:text-pastel-200 transition-colors duration-300;
}
```

## Testing Dark Mode

### Manual Testing
1. Click the theme toggle button in the navigation
2. Verify all components transition smoothly
3. Check contrast ratios for accessibility
4. Test on different screen sizes

### System Preference Testing
1. Change system theme preference
2. Refresh the page
3. Verify automatic theme detection
4. Test localStorage persistence

### Browser Testing
1. Test in Chrome, Firefox, Safari, Edge
2. Verify theme toggle functionality
3. Check for any visual glitches
4. Test responsive behavior

## Performance Considerations

### Optimizations
- **CSS Transitions**: Only animate color properties
- **Lazy Loading**: Theme context loads after hydration
- **Minimal Re-renders**: Theme changes only affect necessary components

### Best Practices
- Use `transition-colors` for smooth animations
- Avoid animating layout properties during theme changes
- Keep dark mode variants close to light mode variants in CSS

## Accessibility Features

### Color Contrast
- All text maintains WCAG AA contrast ratios
- Interactive elements have clear focus states
- Dark mode doesn't reduce readability

### Screen Reader Support
- Theme toggle has proper ARIA labels
- Theme state is announced to screen readers
- No hidden content in either theme

### Motion Preferences
- Respects `prefers-reduced-motion` setting
- Smooth transitions can be disabled
- Maintains functionality without animations

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**
   - Ensure `suppressHydrationWarning` is set on html element
   - Use `mounted` state in ThemeContext

2. **Theme Not Persisting**
   - Check localStorage implementation
   - Verify theme context is wrapping the app

3. **Colors Not Transitioning**
   - Ensure `transition-colors duration-300` is applied
   - Check for conflicting transition classes

4. **Dark Mode Not Working**
   - Verify `darkMode: 'class'` in Tailwind config
   - Check that dark: classes are properly applied

### Debug Commands

```bash
# Check if dark mode is enabled
document.documentElement.classList.contains('dark')

# Check localStorage
localStorage.getItem('theme')

# Force dark mode
document.documentElement.classList.add('dark')

# Force light mode
document.documentElement.classList.remove('dark')
```

## Future Enhancements

### Planned Features
- **Theme Scheduling**: Automatic theme switching based on time
- **Custom Themes**: User-defined color schemes
- **Animation Variants**: Different animations for each theme
- **Performance Metrics**: Track theme change performance

### Potential Improvements
- **CSS Variables**: Use CSS custom properties for dynamic theming
- **Theme Presets**: Multiple dark mode variants
- **Accessibility Tools**: Built-in contrast checker
- **Analytics**: Track user theme preferences

## Conclusion

The dark mode implementation provides a comprehensive, accessible, and performant solution that enhances the user experience while maintaining the beautiful pastel design aesthetic. The system is built with scalability in mind and can easily accommodate future enhancements and customizations.

For questions or issues, refer to the component files or contact the development team.
