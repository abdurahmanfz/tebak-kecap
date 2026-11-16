/**
 * ============================================================================
 * AUDIO UTILITIES
 * ============================================================================
 * 
 * Helper functions for audio management
 */

/**
 * Check if Web Audio API is supported in the browser
 */
export function isAudioSupported(): boolean {
  return !!(window.AudioContext || (window as any).webkitAudioContext);
}

/**
 * Get audio context state
 */
export function getAudioContextState(ctx: AudioContext | null): AudioContextState | 'not-initialized' {
  if (!ctx) return 'not-initialized';
  return ctx.state;
}

/**
 * Resume audio context (required after user interaction in some browsers)
 */
export async function resumeAudioContext(ctx: AudioContext): Promise<void> {
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
}

/**
 * Create a simple beep tone
 * Useful for testing audio functionality
 */
export function createBeep(
  ctx: AudioContext,
  frequency: number = 440,
  duration: number = 0.2,
  volume: number = 0.1
): void {
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.frequency.setValueAtTime(frequency, now);
  osc.type = 'sine';

  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

/**
 * Musical note frequencies (A4 = 440Hz standard)
 */
export const NOTE_FREQUENCIES = {
  // Octave 4
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  
  // Octave 5
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  B5: 987.77,
} as const;

/**
 * Convert combo count to note progression
 * Useful for melodic feedback
 */
export function comboToNote(combo: number, scale: readonly number[]): number {
  return scale[combo % scale.length];
}
