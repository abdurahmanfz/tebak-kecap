# Changelog - Tebak Kecap Sunda

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-11-16

### ✨ Initial Release

#### Added
- Complete React + TypeScript migration from HTML
- 42 Sundanese words across 4 cultural categories
- Full game loop with letter guessing mechanics
- Lives system with 6 traditional snacks
- Scoring system with combo bonuses and hints
- Category filtering (Kadaharan, Budaya & Seni, Basa & Paribasa, Tempat & Alam)
- Physical keyboard support (A-Z, Enter, Space)
- On-screen QWERTY keyboard
- Web Audio API with Pelog-scale sounds
- Framer Motion animations throughout
- Responsive design (mobile-first)
- Docker deployment configuration
- Comprehensive documentation

#### Components
- **Header**: Score, streak, sound toggle
- **CategoryBar**: Category selector with horizontal scroll
- **NyiruTray**: Lives display with 6 snacks and animations
- **ClueCard**: Bilingual clues and hint system
- **WordDisplay**: Letter slots with reveal animations
- **Keyboard**: Interactive QWERTY layout
- **ResultModal**: Win/loss modal with word information

#### Features
- **Audio System**
  - Bamboo hit sounds (Web Audio synthesis)
  - Pelog-scale melodies for correct guesses
  - Victory and defeat music sequences
  - UI click feedback
  - Mute toggle with state persistence

- **Scoring**
  - Base: 25 points per word
  - Life bonus: +5 per remaining life
  - Hint cost: -15 points
  - Streak tracking

- **State Management**
  - Context API + useReducer pattern
  - TanStack Query for data fetching
  - Local JSON fallback
  - Category-based caching

#### Technical
- Vite 4.5.2 (Node 16 compatible)
- React 18 with TypeScript strict mode
- Tailwind CSS with custom theme
- Clean architecture (feature-based structure)
- Docker multi-stage builds
- Nginx with gzip and security headers

---

## Bug Fixes & Improvements During Development

### Phase 1: Foundation
- ✅ Fixed Vite 5 compatibility issue with Node 16 (downgraded to Vite 4.5.2)
- ✅ Resolved Tailwind CSS configuration for bamboo theme
- ✅ Fixed path aliases (@/) in tsconfig.json

### Phase 2: Components
- ✅ Fixed property naming mismatches (wrongGuesses → wrongLetters)
- ✅ Fixed category state naming (category → selectedCategory)
- ✅ Resolved selector function calls (isGameOver vs isGameOver())
- ✅ Fixed useWords API structure (direct category vs object)
- ✅ Aligned WordEntry type with JSON data structure

### Phase 3: Integration
- ✅ Fixed audio feedback timing in Game component
- ✅ Resolved TypeScript strict mode errors
- ✅ Fixed Modal className prop (removed unsupported prop)
- ✅ Removed unused imports and variables
- ✅ Fixed AnimatePresence import in WordDisplay

### Phase 4: Polish
- ✅ Verified production build (324KB JS, 20KB CSS gzipped)
- ✅ Confirmed JSON data integrity (42 words, all complete)
- ✅ TypeScript compilation passes with zero errors
- ✅ All components render without console errors

---

## Known Limitations

1. **Word Count**: Currently 42 words (expandable via JSON)
2. **Browser Audio**: Requires user interaction to initialize AudioContext (Web Audio API standard)
3. **Node Version**: Requires Node 16+ for Vite 4.5.2 compatibility
4. **Offline Support**: No service worker/PWA features (future enhancement)
5. **Multiplayer**: Single-player only (future feature consideration)

---

## Testing Status

### ✅ Completed
- TypeScript compilation
- Production build verification
- JSON data validation
- Component integration
- Responsive design (mobile-first CSS)

### Manual Testing Required
See `TESTING.md` for comprehensive checklist:
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile device testing (iOS, Android)
- [ ] Audio verification in different browsers
- [ ] Physical keyboard testing
- [ ] Touch interaction testing
- [ ] Category switching
- [ ] Win/loss scenarios
- [ ] Hint system
- [ ] Score calculation accuracy

---

## Deployment

### Production Ready
- ✅ Dockerfile with multi-stage builds
- ✅ nginx.conf with optimizations
- ✅ docker-compose.yml configuration
- ✅ Health check endpoints
- ✅ Gzip compression
- ✅ Security headers
- ✅ Static asset caching (1 year)

### Deployment Options
1. **Docker** (recommended): `docker-compose up -d`
2. **Static hosting**: Deploy `dist/` folder
3. **Reverse proxy**: See DEPLOYMENT.md

---

## Documentation

- ✅ **README.md**: Project overview, features, quick start
- ✅ **DEPLOYMENT.md**: VPS deployment guide (3 options)
- ✅ **TESTING.md**: Comprehensive testing checklist
- ✅ **PROGRESS.md**: Development status tracker
- ✅ **CHANGELOG.md**: This file

---

## Future Enhancements (Potential v2.0)

### High Priority
- [ ] Add more Sundanese words (target: 100+)
- [ ] Implement difficulty levels
- [ ] Add word pronunciation audio
- [ ] Create leaderboard system
- [ ] Add PWA support for offline play

### Medium Priority
- [ ] Multiplayer mode
- [ ] Daily challenge words
- [ ] Achievement system
- [ ] Social sharing features
- [ ] Word etymology information

### Low Priority
- [ ] Theme customization
- [ ] Animation preferences
- [ ] Custom word lists
- [ ] Export game statistics

---

## Credits

### Development
- Built with React, TypeScript, and modern web technologies
- Inspired by traditional Sundanese culture and language

### Audio
- Pelog-scale sounds based on traditional Sundanese music
- Web Audio API synthesis

### Data
- 42 Sundanese words with cultural context
- Educational content about Sundanese heritage

---

## License

Open source - Educational purposes

---

**Version**: 1.0.0  
**Release Date**: November 16, 2024  
**Status**: Production Ready 🎉
