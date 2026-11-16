# Game Hooks

## useBambooAudio

Custom React hook for traditional Sundanese bamboo/angklung-inspired game audio using the Web Audio API.

### Features

- **Pelog Pentatonic Scale**: Correct guesses play notes from the traditional Sundanese Pelog scale
- **Combo System**: Each consecutive correct guess plays a higher note
- **Victory/Defeat Melodies**: Complete melodic sequences for game outcomes
- **Automatic Initialization**: AudioContext initializes on first user interaction
- **Memory Management**: Automatic cleanup on component unmount
- **Mute Support**: Can be controlled via game state

### Usage

```tsx
import { useBambooAudio } from '@/features/game/hooks';

function GameComponent() {
  const audio = useBambooAudio({ muted: false });

  const handleCorrectGuess = (comboCount: number) => {
    audio.playCorrect(comboCount); // Plays ascending Pelog note
  };

  const handleWrongGuess = () => {
    audio.playWrong(); // Plays descending pitch
  };

  const handleWin = () => {
    audio.playWin(); // Plays victory melody
  };

  return (
    <button onClick={() => audio.playClick()}>
      Click me!
    </button>
  );
}
```

### API

#### Parameters

- `config.muted` (boolean, optional): Enable/disable audio playback

#### Return Value

```typescript
{
  playBambooHit: (frequency?: number) => void;
  playCorrect: (combo?: number) => void;
  playWrong: () => void;
  playWin: () => void;
  playLose: () => void;
  playClick: () => void;
  isReady: boolean;
}
```

### Sound Design

#### playBambooHit(frequency)
- Simulates bamboo tube resonance
- Uses sine wave for fundamental + triangle wave for overtone
- Natural decay envelope (280ms)

#### playCorrect(combo)
- Uses Pelog pentatonic scale: [440, 493.88, 523.25, 659.25, 783.99, 880] Hz
- Combo determines which note to play (cycles through scale)
- Creates melodic progression for consecutive correct guesses

#### playWrong()
- Descending pitch from 175Hz to 92Hz
- Triangle wave for harsher tone
- Quick duration (220ms) for immediate feedback

#### playWin()
- Ascending melody: [440, 523.25, 659.25, 783.99, 880] Hz
- Notes spaced 95ms apart
- Triumphant progression

#### playLose()
- Descending melody: [392, 349.23, 329.63, 261.63] Hz
- Notes spaced 140ms apart
- Melancholic progression

#### playClick()
- Single E5 note (659.25 Hz)
- For UI interactions

### Technical Details

#### Web Audio API
The hook uses the Web Audio API for precise, low-latency audio synthesis. This provides:
- Hardware-accelerated audio processing
- Precise timing control
- No audio file loading delays
- Small memory footprint

#### Browser Compatibility
- Modern browsers: Full support
- Safari iOS: Requires user interaction to activate
- Fallback: Gracefully degrades if Web Audio API not available

#### Performance
- Minimal CPU usage (synthesis is hardware-accelerated)
- No file downloads required
- Instant sound playback
- Automatic resource cleanup

### Integration with Game State

```tsx
function Game() {
  const game = useGame();
  const audio = useBambooAudio({ muted: game.state.isMuted });

  const handleGuess = (letter: string) => {
    const wasCorrect = checkLetter(letter);
    
    if (wasCorrect) {
      audio.playCorrect(game.state.correctCombo);
    } else {
      audio.playWrong();
    }
  };

  return (
    <button onClick={game.actions.toggleMute}>
      {game.state.isMuted ? '🔇' : '🔊'}
    </button>
  );
}
```

### Debugging

To test if audio is working:

```tsx
const audio = useBambooAudio();

// Test basic sound
audio.playClick();

// Test scale progression
[0, 1, 2, 3, 4, 5].forEach((i) => {
  setTimeout(() => audio.playCorrect(i), i * 200);
});

// Check readiness
console.log('Audio ready:', audio.isReady);
```

### Notes

- AudioContext requires user interaction to activate (browser security)
- Hook automatically sets up interaction listeners
- First sound may have slight delay as context initializes
- Subsequent sounds play instantly
