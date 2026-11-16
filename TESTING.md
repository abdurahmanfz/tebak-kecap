# 🧪 Testing Checklist - Tebak Kecap Sunda

## ✅ Manual Testing Checklist

### 🎮 Core Gameplay

- [ ] **Game Initialization**
  - [ ] Game loads without errors
  - [ ] Random word is selected on start
  - [ ] All UI elements render correctly
  - [ ] Initial state: 6 lives, score 0, streak 0

- [ ] **Letter Guessing (On-screen Keyboard)**
  - [ ] Clicking letters registers correctly
  - [ ] Correct letters reveal in word display
  - [ ] Wrong letters appear in wrong letters list
  - [ ] Letters become disabled after being guessed
  - [ ] Correct letters turn green
  - [ ] Wrong letters turn red

- [ ] **Letter Guessing (Physical Keyboard)**
  - [ ] A-Z keys work correctly
  - [ ] Letters register as guessed
  - [ ] Cannot guess same letter twice
  - [ ] Keyboard input disabled when round is over

- [ ] **Lives System**
  - [ ] Starts with 6 snacks in nyiru
  - [ ] Wrong guess removes one snack
  - [ ] Snacks disappear with animation
  - [ ] Tray shakes when snack is removed
  - [ ] Game ends at 0 lives

- [ ] **Scoring System**
  - [ ] Base 25 points awarded per word
  - [ ] Life bonus calculated correctly (5 per life)
  - [ ] Hint cost deducted (15 points)
  - [ ] Score cannot go below 0
  - [ ] Score persists across rounds

- [ ] **Hint System**
  - [ ] Hint button disabled when score < 15
  - [ ] Hint reveals random unguessed letter
  - [ ] Score reduces by 15 points
  - [ ] Cannot use hint multiple times
  - [ ] Enter key triggers hint
  - [ ] Hint disabled after use

- [ ] **Win Condition**
  - [ ] All letters guessed = win
  - [ ] Result modal shows win state
  - [ ] Victory audio plays
  - [ ] Score increases
  - [ ] Streak increases
  - [ ] Correct points calculation displayed

- [ ] **Loss Condition**
  - [ ] 0 lives = loss
  - [ ] Result modal shows loss state
  - [ ] Defeat audio plays
  - [ ] Streak resets to 0
  - [ ] Word and meaning displayed

### 🎨 User Interface

- [ ] **Header Component**
  - [ ] Logo displays correctly
  - [ ] Score updates in real-time
  - [ ] Streak updates in real-time
  - [ ] Sound toggle works
  - [ ] Sound icon changes (muted/unmuted)

- [ ] **Category Bar**
  - [ ] All 5 categories displayed
  - [ ] Active category highlighted
  - [ ] Clicking category filters words
  - [ ] Category change starts new round
  - [ ] Horizontal scrolling on mobile

- [ ] **Nyiru Tray**
  - [ ] 6 snacks displayed initially
  - [ ] Snack names shown
  - [ ] Emoji displayed correctly
  - [ ] Animations smooth
  - [ ] Empty state shows when 0 lives

- [ ] **Clue Card**
  - [ ] Sundanese clue displayed
  - [ ] English clue displayed
  - [ ] Category badge shown
  - [ ] Hint button visible
  - [ ] Hint button state correct

- [ ] **Word Display**
  - [ ] Letter slots render correctly
  - [ ] Spaces between words
  - [ ] Non-letters (punctuation) always shown
  - [ ] Letters reveal with animation
  - [ ] Wrong letters list updates
  - [ ] Animations smooth

- [ ] **Keyboard**
  - [ ] QWERTY layout correct
  - [ ] All 26 letters present
  - [ ] Visual feedback on hover
  - [ ] Disabled state visual
  - [ ] Correct/wrong colors apply
  - [ ] Responsive sizing

- [ ] **Result Modal**
  - [ ] Opens automatically on round end
  - [ ] Win emoji (🎉) for success
  - [ ] Loss emoji (😢) for failure
  - [ ] Word information displayed
  - [ ] Category badge shown
  - [ ] Trivia displayed
  - [ ] Score breakdown correct
  - [ ] Next round button works
  - [ ] Space key closes modal
  - [ ] Backdrop click closes modal
  - [ ] ESC key closes modal

### 🎵 Audio System

- [ ] **Sound Effects**
  - [ ] Correct guess plays Pelog note
  - [ ] Combo builds musical progression
  - [ ] Wrong guess plays descending pitch
  - [ ] Win plays victory melody
  - [ ] Loss plays defeat melody
  - [ ] Click sound on UI interactions
  - [ ] Sounds work after unmuting

- [ ] **Mute Toggle**
  - [ ] Mute button toggles correctly
  - [ ] Icon updates
  - [ ] No sounds when muted
  - [ ] Sounds resume when unmuted
  - [ ] State persists during session

### 📱 Responsive Design

- [ ] **Mobile (320px - 480px)**
  - [ ] All content readable
  - [ ] Buttons touch-friendly (44px min)
  - [ ] Keyboard letters adequately sized
  - [ ] Modal fits screen
  - [ ] Category bar scrolls horizontally
  - [ ] No horizontal scroll on page
  - [ ] Text sizes appropriate

- [ ] **Tablet (481px - 768px)**
  - [ ] Layout adapts correctly
  - [ ] Keyboard size appropriate
  - [ ] Word slots visible
  - [ ] Nyiru tray well-spaced

- [ ] **Desktop (769px+)**
  - [ ] Centered layout with max-width
  - [ ] Adequate spacing
  - [ ] Hover states work
  - [ ] Physical keyboard fully functional

### 🔄 State Management

- [ ] **Category Switching**
  - [ ] Filters words correctly
  - [ ] Starts new round immediately
  - [ ] Clears previous word
  - [ ] Resets guessed letters

- [ ] **Round Lifecycle**
  - [ ] START_ROUND initializes correctly
  - [ ] END_ROUND calculates score
  - [ ] Next round button works
  - [ ] State resets properly

- [ ] **Score Persistence**
  - [ ] Score carries across rounds
  - [ ] Streak increments on wins
  - [ ] Streak resets on loss

### 🌐 Browser Compatibility

- [ ] **Chrome/Edge**
  - [ ] Game functions correctly
  - [ ] Audio works
  - [ ] Animations smooth
  - [ ] No console errors

- [ ] **Firefox**
  - [ ] Game functions correctly
  - [ ] Audio works
  - [ ] Animations smooth
  - [ ] No console errors

- [ ] **Safari**
  - [ ] Game functions correctly
  - [ ] Audio works (after interaction)
  - [ ] Animations smooth
  - [ ] No console errors

### ⚡ Performance

- [ ] **Load Time**
  - [ ] Initial load < 3 seconds
  - [ ] Assets load correctly
  - [ ] No flash of unstyled content

- [ ] **Runtime Performance**
  - [ ] No lag during gameplay
  - [ ] Animations at 60fps
  - [ ] No memory leaks (check DevTools)
  - [ ] Audio playback smooth

### 🔍 Data Validation

- [ ] **Word Data**
  - [ ] All 45 words load correctly
  - [ ] Categories assigned properly
  - [ ] Clues display correctly
  - [ ] Trivia text formatted well
  - [ ] No missing data

### 🐛 Edge Cases

- [ ] **Rapid Input**
  - [ ] Multiple fast clicks handled
  - [ ] Cannot break game state
  - [ ] No duplicate letter guesses

- [ ] **Special Characters**
  - [ ] Words with hyphens work
  - [ ] Words with apostrophes work
  - [ ] Accented characters handled

- [ ] **Empty/Error States**
  - [ ] Loading state displays
  - [ ] Error state shows on data failure
  - [ ] Reload button works

---

## 🛠️ Development Testing

### TypeScript
```bash
npm run type-check
# Should pass with no errors
```

### Build
```bash
npm run build
# Should complete successfully
# Check dist/ folder created
```

### Production Preview
```bash
npm run preview
# Should serve on localhost
# Test all features in production build
```

---

## 🐳 Docker Testing

### Build Image
```bash
docker build -t tebak-kecap-test .
# Should complete without errors
```

### Run Container
```bash
docker run -p 8080:80 tebak-kecap-test
# Access http://localhost:8080
# Verify game works
```

### Health Check
```bash
# Container should report healthy
docker ps
# Check HEALTH column
```

---

## 📊 Testing Results

| Test Category | Pass | Fail | Notes |
|--------------|------|------|-------|
| Core Gameplay | ☐ | ☐ | |
| User Interface | ☐ | ☐ | |
| Audio System | ☐ | ☐ | |
| Responsive Design | ☐ | ☐ | |
| State Management | ☐ | ☐ | |
| Browser Compatibility | ☐ | ☐ | |
| Performance | ☐ | ☐ | |
| Edge Cases | ☐ | ☐ | |

---

## 🐛 Known Issues

*Document any bugs or issues discovered during testing:*

1. 
2. 
3. 

---

## ✅ Sign-off

- [ ] All critical tests passed
- [ ] Performance acceptable
- [ ] No game-breaking bugs
- [ ] Ready for deployment

**Tested by**: _______________  
**Date**: _______________  
**Version**: 1.0.0
