# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm run dev` - Start Vite development server with hot reload
- `pnpm run build` - TypeScript compilation followed by Vite production build
- `pnpm run preview` - Preview production build locally

### Code Quality
- `pnpm run lint` - Run ESLint with TypeScript parser

### Deployment & Assets
- `pnpm run force-deploy` - Build and deploy to Firebase Hosting
- `pnpm run generate-icons` - Generate React components from SVG files in `src/Icons/svgs/`
- `pnpm run release` - Create a new release using `scripts/create-release.sh`

### Requirements
- Node.js >= 20
- pnpm (yarn and npm are explicitly blocked via package.json engines)

## Architecture Overview

Life Trinket is a Magic the Gathering life counter PWA built with React 19, TypeScript, and Tailwind CSS v4. The application follows an offline-first architecture with localStorage as the primary persistence layer.

### Core Stack
- **React 19.2.0** with functional components and hooks
- **Vite** with SWC for fast compilation
- **Tailwind CSS v4** with `react-twc` for typed, styled components
- **TypeScript** in strict mode
- **Zod** for runtime validation of persisted data
- **Firebase Analytics** for minimal event tracking
- **vite-plugin-pwa** with Workbox for offline functionality

### Application Flow
```
StartMenu → PreStart (optional mini-games) → Play → GameOver (optional) → repeat
```

View routing is controlled by `showPlay` and `playing` flags in GlobalSettingsContext.

## State Management Architecture

The application uses a **two-context architecture** for separation of concerns:

### PlayersContext (`src/Contexts/PlayersContext.tsx`)
Manages all game-specific player state:
- `players: Player[]` - Array of player game state
- `updatePlayer(player)` - Update individual player
- `updateLifeTotal(player, total)` - Update life and return difference for animations
- `resetCurrentGame()` - Reset to initial settings without clearing game score
- `startingPlayerIndex` - Tracks who goes first

**Player State Structure** (`src/Types/Player.ts`):
```typescript
{
  lifeTotal: number,
  color: string,                    // Hex color for card background
  iconTheme: 'light' | 'dark',      // Auto-calculated via WCAG contrast
  commanderDamage: CommanderDamage[], // Damage from each opponent
  extraCounters: ExtraCounter[],    // Poison, energy, experience
  isMonarch: boolean,
  hasLost: boolean,
  isSide: boolean,                  // 90° rotated in layout
  // ... other properties
}
```

### GlobalSettingsContext (`src/Contexts/GlobalSettingsContext.tsx`)
Manages application-wide state and navigation:
- `showPlay` / `playing` - View routing state
- `initialGameSettings` - Game setup configuration (player count, starting life, etc.)
- `settings` - User preferences
- `savedGame` - Full game snapshot for pause/resume functionality
- `gameScore` - Match score tracking across multiple games
- `fullscreen`, `wakeLock` - Device API wrappers
- `version` - Installed vs remote version comparison via GitHub API

### Custom Hooks Pattern
Access contexts through custom hooks that enforce proper provider nesting:
- `usePlayers()` - Access PlayersContext with error boundary
- `useGlobalSettings()` - Access GlobalSettingsContext with error boundary

These hooks throw descriptive errors if used outside their providers, preventing runtime context errors.

## Data Persistence

**LocalStorage Keys**:
- `players` - Current player state array
- `initialGameSettings` - Game setup configuration
- `settings` - User preferences
- `playing` / `showPlay` - View routing flags
- `savedGame` - Full game snapshot (cleared on resume)
- `gameScore` - Match score tracking
- `startingPlayerIndex`, `preStartComplete` - Misc game state

**Validation Strategy**:
1. All persisted data has Zod schemas defined in `src/Types/Settings.ts`
2. On hydration from localStorage, data is validated against schemas
3. Invalid data falls back to defaults rather than crashing
4. Type-safe at compile time, validated at runtime

**Saved Game Pattern**:
The `savedGame` mechanism allows users to pause and resume games. When saving, it captures `initialGameSettings`, `players` array, and optionally `gameScore`. When resuming, state is restored and `savedGame` is cleared from localStorage.

## Layout System

### Dynamic Grid Layouts
The application supports 1-6 players with automatic layout adjustment. All layouts are defined in `tailwind.config.ts` as `twGridTemplateAreas` with 15 predefined configurations for different player counts and orientations (portrait/landscape).

### Player Card Rotation
Player cards are rotated based on their position to face each player around a table:
- Rotation is calculated during player initialization in `src/Data/getInitialPlayers.ts`
- Each player has 4 possible rotation states: 0°, 90°, 180°, 270°
- The `isSide` flag indicates 90° rotations
- All major components (LifeCounter, Health, CommanderDamage, etc.) are rotation-aware

Example: In a 4-player game in portrait orientation:
- Player 0 (bottom): 0° rotation
- Player 1 (left): 90° rotation (`isSide: true`)
- Player 2 (top): 180° rotation
- Player 3 (right): 270° rotation (`isSide: true`)

### Responsive Font Sizing
The Health component uses ResizeObserver to dynamically calculate font sizes based on available container space, ensuring life totals are always legible regardless of player count or device orientation.

## Component Architecture

### Component Hierarchy
```
App
├── PlayersProvider
│   └── GlobalSettingsProvider
│       └── LifeTrinket (main router)
│           ├── StartMenu (setup and configuration)
│           │   ├── InfoDialog
│           │   ├── SettingsDialog
│           │   └── LayoutOptions
│           └── Play (active game view)
│               ├── PreStart (optional randomizers/mini-games)
│               ├── Players (grid container)
│               │   └── LifeCounter (per player)
│               │       ├── Health (life total + ±buttons)
│               │       ├── CommanderDamageBar
│               │       ├── ExtraCountersBar
│               │       ├── PlayerMenu (swipe-to-open)
│               │       └── LoseGameButton (conditional)
│               └── GameOver (when winner determined)
```

### Component Communication
- **Props**: Top-down data flow for display values
- **Context Hooks**: Bottom-up state updates via `usePlayers()` and `useGlobalSettings()`
- **Gesture Events**: Touch/click handlers with custom long-press detection

### Typed Tailwind Components
The codebase uses `react-twc` to create typed, styled components. This provides TypeScript autocomplete for Tailwind classes while maintaining component composition:

```typescript
import { twc } from 'react-twc';

const StyledDiv = twc.div`flex items-center justify-center`;
```

## Gesture Detection Patterns

### Life Counter Interactions
- **Tap**: ±1 life (immediate)
- **Long Press** (>300ms): ±10 life (defined by `lifeLongPressMultiplier` in `src/Data/constants.ts`)

Implementation uses custom touch event handlers with:
- Touch start/end tracking
- Movement threshold (20px max to still count as tap)
- Timer-based long press detection
- Prevention of scroll during interactions

### Counter Interactions
- **Tap**: Increment counter
- **Long Press**: Decrement counter

### Player Menu
Uses `react-swipeable` for swipe-to-open drawer on each player card. Accessible via swipe gesture or dedicated button.

## Color & Contrast Handling

The `src/Utils/checkContrast.ts` utility calculates WCAG contrast ratios to determine if icons should be light or dark on each player's background color:

1. Convert hex color to RGB
2. Calculate relative luminance
3. Compute contrast ratio against white/black
4. Set `iconTheme: 'light' | 'dark'` accordingly

This ensures all UI elements remain legible regardless of the player's chosen color.

## Player Initialization Logic

`src/Data/getInitialPlayers.ts` contains complex logic for creating player objects:

1. **Color Assignment**: Random colors from preset palette (8 colors, excluding duplicates)
2. **Rotation Calculation**: Based on player count, position, and device orientation
3. **Commander Damage Tracking**: Initializes damage tracking between all opponent pairs
4. **Extra Counters**: Sets up poison, energy, and experience counters per player
5. **Layout Flags**: Sets `isSide` for 90°/270° rotations

When modifying player initialization, ensure all rotation states are tested for 1-6 players in both portrait and landscape orientations.

## Platform-Specific Handling

The application detects iOS/iPad and stores flags on the window object:
```typescript
window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
window.isIPad = /iPad/.test(navigator.userAgent)
```

These are used for platform-specific behaviors like wake lock handling and PWA detection.

## Firebase Analytics Integration

Analytics are wrapped in `src/Hooks/useAnalytics.ts`:
- **Development Mode**: Console logs instead of sending events
- **Auto-Versioning**: All events include app version
- **Graceful Degradation**: Fails silently if Firebase unavailable
- **Minimal Tracking**: Only "Games started" and "Back to start" events (as stated in README)

Current tracked events:
- `game_start` - When starting a new game
- `reset_game` - When returning to start menu

## Version Management

The app checks for updates via GitHub API:
- Installed version from `package.json` via `import.meta.env.VITE_APP_VERSION`
- Remote version fetched from GitHub repository
- Comparison uses `semver` library
- Update notification shown in UI if newer version available

## PWA Configuration

PWA settings in `vite.config.ts`:
- **Auto-update**: Service worker updates automatically
- **Skip Waiting**: New service worker activates immediately
- **Clients Claim**: Takes control of all clients immediately
- **Offline Support**: Full offline functionality after initial load

Manifest configuration in `index.html` includes theme colors, icons, and display settings.

## Important Considerations

### When Adding New Settings
1. Add Zod schema in `src/Types/Settings.ts`
2. Update localStorage key mapping
3. Add to appropriate context provider
4. Ensure validation fallback behavior is sensible

### When Modifying Layouts
1. Update `twGridTemplateAreas` in `tailwind.config.ts`
2. Test all player counts (1-6) in both orientations
3. Verify rotation calculations in `getInitialPlayers.ts`
4. Ensure font sizing remains legible

### When Adding New Counter Types
1. Update `ExtraCounter` type in `src/Types/Player.ts`
2. Add counter creation logic in `getInitialPlayers.ts`
3. Update `ExtraCountersBar` component rendering
4. Consider lose conditions (like poison at 10)

### When Modifying Commander Damage
Commander damage is bidirectional between all players. When adding/modifying:
1. Update in player's `commanderDamage` array
2. Index corresponds to opponent's index in `players` array
3. Each `CommanderDamage` object has `amount` and `isPartner` flag
4. Lose condition is ≥21 damage from any single commander

### Testing Gestures
Long-press and tap behaviors have specific timing and distance thresholds defined in `src/Data/constants.ts`. When modifying gesture detection:
- Test on actual touch devices (mouse events behave differently)
- Verify accidental scroll prevention
- Ensure long-press doesn't trigger tap
- Check that movement cancels long-press appropriately
