# Component Proportion and Styling Fixes

Based on the screenshots provided, the components (Navbar, Hero Stats, and Neon Cards) are suffering from a few critical issues that make them look stretched, broken, or disproportionate, especially on larger screens.

## The Issues Identified
1. **Navbar Squeezing & Stretching**: The Navbar is set to `w-[94%] max-w-7xl`, meaning it stretches across the entire screen. Because it only has a few links, it leaves a massive empty space in the middle, making it look like a very long, flat pill rather than a sleek navigation bar.
2. **Hero Stats Bar**: Similar to the Navbar, the stats bar is set to `max-w-5xl`. With only 4 stats, it looks like a stretched, empty rectangle.
3. **Neon Card Border & Aspect Ratio**: 
   - The `.neon-card` class has a `clip-path` that cuts the bottom-right corner. However, because standard CSS borders are applied to the box model, the `clip-path` slices right through the border, making the border disappear on the cut edges (which looks broken).
   - The cards in the Services and Projects sections stretch to fill the width of the grid columns but have relatively little vertical content, making them look flat and horizontally stretched.

## Proposed Changes

### 1. Make the Navbar Hug its Content
- **File**: `src/components/ui/Navbar.tsx`
- **Fix**: Change the wrapper from `w-[94%] max-w-7xl` to `w-[94%] md:w-auto`. This will make the navbar exactly as wide as it needs to be to hold the logo, links, and button. I will add a `gap-12 md:gap-20` to the internal flex container so the elements remain comfortably spaced without stretching to the screen edges.

### 2. Make the Hero Stats Proportional
- **File**: `src/components/sections/Hero.tsx`
- **Fix**: Change the stats container from `w-full max-w-5xl` to `w-fit mx-auto`. This will ensure the stats strip wraps perfectly around the 4 numbers instead of stretching artificially.

### 3. Fix the Neon Card Styling
- **File**: `src/app/globals.css`
- **Fix**: Remove the `clip-path` from `.neon-card` as it breaks the border rendering. Instead, I will give the neon cards a sleek, fully rounded border (`border-radius: 1.5rem`) with an inner and outer neon glow effect. This keeps the cyberpunk/neon aesthetic but ensures it looks polished and complete on all screen sizes.
- **File**: `src/components/sections/Services.tsx` and `src/components/sections/Projects.tsx`
- **Fix**: Ensure the padding inside the `.neon-card` instances is generous enough vertically so the cards have a solid, premium aspect ratio.

## User Review Required
> [!IMPORTANT]  
> Are you okay with removing the "cut corner" (`clip-path`) from the neon cards and replacing it with a glowing rounded-corner design? The cut corner is what is causing the yellow border to look broken in your screenshot. If you approve, I will proceed with fixing all of these stretched components!
