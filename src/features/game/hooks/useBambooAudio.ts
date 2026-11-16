/**
 * ============================================================================
 * BAMBOO AUDIO HOOK
 * ============================================================================
 * 
 * Custom React hook for traditional Sundanese bamboo/angklung-inspired sounds
 * using the Web Audio API. Provides Pelog-scale musical feedback.
 */

import { useEffect, useRef, useCallback } from 'react';
import { PELOG_SCALE } from '../constants';

/**
 * Audio configuration interface
 */
interface AudioConfig {
  /** Enable/disable audio (can be controlled via state) */
  muted?: boolean;
}

/**
 * Hook return interface
 */
interface UseBambooAudioReturn {
  /** Play a bamboo hit sound at specified frequency */
  playBambooHit: (frequency?: number) => void;
  /** Play correct guess sound (uses Pelog scale) */
  playCorrect: (combo?: number) => void;
  /** Play wrong guess sound */
  playWrong: () => void;
  /** Play win melody */
  playWin: () => void;
  /** Play lose melody */
  playLose: () => void;
  /** Play generic click/tap sound */
  playClick: () => void;
  /** Check if audio context is ready */
  isReady: boolean;
}

/**
 * Custom hook for bamboo-inspired game audio
 * 
 * Features:
 * - Pelog pentatonic scale for correct guesses
 * - Downward pitch for wrong guesses
 * - Victory and defeat melodies
 * - Automatic AudioContext initialization
 * - Memory cleanup on unmount
 * 
 * @param config - Audio configuration
 * @returns Audio playback functions
 * 
 * @example
 * ```tsx
 * function Game() {
 *   const audio = useBambooAudio({ muted: false });
 *   
 *   const handleCorrectGuess = () => {
 *     audio.playCorrect(comboCount);
 *   };
 *   
 *   return <button onClick={handleCorrectGuess}>Guess</button>;
 * }
 * ```
 */
export function useBambooAudio(config: AudioConfig = {}): UseBambooAudioReturn {
  const { muted = false } = config;
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const isReadyRef = useRef(false);

  /**
   * Initialize AudioContext (lazily on first use)
   */
  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) {
      // Resume if suspended
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return audioContextRef.current;
    }

    // Create new AudioContext
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) {
      console.warn('Web Audio API not supported');
      return null;
    }

    const ctx = new AudioCtx();
    audioContextRef.current = ctx;
    isReadyRef.current = true;
    
    return ctx;
  }, []);

  /**
   * Play a single bamboo tube resonance sound
   * Simulates the harmonic overtones of bamboo
   */
  const playBambooHit = useCallback((frequency: number = 523.25) => {
    if (muted) return;
    
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Create oscillators for fundamental and overtone
    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const gain = ctx.createGain();

    // Fundamental frequency (sine wave for pure tone)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    // Overtone at ~2x frequency (triangle for richer harmonics)
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(frequency * 2.01, now);

    // Envelope: quick attack, exponential decay
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    // Connect audio graph
    osc.connect(gain);
    overtone.connect(gain);
    gain.connect(ctx.destination);

    // Schedule playback
    osc.start(now);
    overtone.start(now);
    osc.stop(now + 0.29);
    overtone.stop(now + 0.29);
  }, [muted, initAudioContext]);

  /**
   * Play correct guess sound using Pelog scale
   * Each correct guess in a combo plays a higher note
   */
  const playCorrect = useCallback((combo: number = 0) => {
    const note = PELOG_SCALE[combo % PELOG_SCALE.length];
    playBambooHit(note);
  }, [playBambooHit]);

  /**
   * Play wrong guess sound (descending pitch)
   */
  const playWrong = useCallback(() => {
    if (muted) return;
    
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    
    // Descending pitch from 175Hz to 92Hz
    osc.frequency.setValueAtTime(175, now);
    osc.frequency.exponentialRampToValueAtTime(92, now + 0.22);

    // Envelope
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.23);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }, [muted, initAudioContext]);

  /**
   * Play victory melody (ascending Pelog scale)
   */
  const playWin = useCallback(() => {
    if (muted) return;

    const melody = [440, 523.25, 659.25, 783.99, 880];
    
    melody.forEach((freq, idx) => {
      setTimeout(() => playBambooHit(freq), idx * 95);
    });
  }, [muted, playBambooHit]);

  /**
   * Play defeat melody (descending notes)
   */
  const playLose = useCallback(() => {
    if (muted) return;

    const notes = [392, 349.23, 329.63, 261.63];
    
    notes.forEach((freq, idx) => {
      setTimeout(() => playBambooHit(freq), idx * 140);
    });
  }, [muted, playBambooHit]);

  /**
   * Play generic click sound (for UI interactions)
   */
  const playClick = useCallback(() => {
    playBambooHit(659.25); // E5 note
  }, [playBambooHit]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        isReadyRef.current = false;
      }
    };
  }, []);

  /**
   * Initialize on mount (user interaction will activate)
   */
  useEffect(() => {
    // Pre-initialize context on first user interaction
    const handleFirstInteraction = () => {
      initAudioContext();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [initAudioContext]);

  return {
    playBambooHit,
    playCorrect,
    playWrong,
    playWin,
    playLose,
    playClick,
    isReady: isReadyRef.current,
  };
}
