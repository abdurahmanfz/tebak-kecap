/**
 * ============================================================================
 * HEADER COMPONENT
 * ============================================================================
 * 
 * Game header with logo, title, and stats (score, streak, sound toggle)
 */

import { Card } from '@/shared/components';
import { useGameState, useGameActions } from '../../state';
import { useBambooAudio } from '../../hooks';

export function Header() {
  const { score, streak, isMuted, showVirtualKeyboard } = useGameState();
  const { toggleMute, toggleVirtualKeyboard } = useGameActions();
  const audio = useBambooAudio({ muted: isMuted });

  const handleToggleMute = () => {
    toggleMute();
    // Play sound when unmuting
    if (isMuted) {
      setTimeout(() => audio.playClick(), 100);
    }
  };

  const handleToggleKeyboard = () => {
    audio.playClick();
    toggleVirtualKeyboard();
  };

  return (
    <header className="w-full max-w-4xl mx-auto px-4 pt-3 pb-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          {/* Kujang Emblem Badge */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-800 flex items-center justify-center shadow-lg shadow-amber-900/50 border border-amber-300/30 shrink-0">
            <svg 
              className="w-6 h-6 text-amber-50" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14.5 3C16.5 5.5 17 9 15 12.5C13.5 15 10.5 16.5 9 19.5L7 21L8.5 17.5C6.5 16 5.5 13 7 9.5C8.5 6 12 4 14.5 3Z" />
              <circle cx="11.5" cy="10.5" r="1" fill="currentColor" />
              <circle cx="10" cy="13" r="1" fill="currentColor" />
            </svg>
          </div>
          
          <div>
            <h1 className="font-heritage text-xl sm:text-2xl font-extrabold tracking-tight text-amber-200 leading-none">
              Tebak Kecap Sunda
            </h1>
            <p className="text-[11px] sm:text-xs text-amber-200/65 font-medium mt-0.5">
              Jaga lalawuh dina nyiru ulah nepi ka béak!
            </p>
          </div>
        </div>

        {/* Score & Streak Stats */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Card bamboo padding="sm" className="flex items-center gap-3 sm:gap-4">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold">
                Skor
              </div>
              <div className="text-sm sm:text-base font-extrabold text-amber-300">
                {score}
              </div>
            </div>
            
            <div className="w-px h-6 bg-amber-500/20"></div>
            
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold">
                Runtuyan
              </div>
              <div className="text-sm sm:text-base font-extrabold text-emerald-400">
                {streak}🔥
              </div>
            </div>
          </Card>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Keyboard Toggle */}
            <button
              onClick={handleToggleKeyboard}
              title={showVirtualKeyboard ? "Paké Keyboard Fisik" : "Paké Keyboard Layar"}
              className="bamboo-card w-10 h-10 rounded-xl flex items-center justify-center text-amber-200 hover:border-amber-400/50 transition cursor-pointer"
            >
              {showVirtualKeyboard ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <line x1="6" y1="10" x2="6.01" y2="10"></line>
                  <line x1="10" y1="10" x2="10.01" y2="10"></line>
                  <line x1="14" y1="10" x2="14.01" y2="10"></line>
                  <line x1="18" y1="10" x2="18.01" y2="10"></line>
                  <line x1="6" y1="14" x2="14" y2="14"></line>
                  <line x1="18" y1="14" x2="18.01" y2="14"></line>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-amber-200/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <line x1="6" y1="10" x2="6.01" y2="10" strokeOpacity="0.3"></line>
                  <line x1="10" y1="10" x2="10.01" y2="10" strokeOpacity="0.3"></line>
                  <line x1="14" y1="10" x2="14.01" y2="10" strokeOpacity="0.3"></line>
                  <line x1="18" y1="10" x2="18.01" y2="10" strokeOpacity="0.3"></line>
                  <line x1="6" y1="14" x2="14" y2="14" strokeOpacity="0.3"></line>
                  <line x1="18" y1="14" x2="18.01" y2="14" strokeOpacity="0.3"></line>
                </svg>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleMute}
              title={isMuted ? "Sora (Muted)" : "Sora Angklung"}
              className="bamboo-card w-10 h-10 rounded-xl flex items-center justify-center text-amber-200 hover:border-amber-400/50 transition cursor-pointer"
            >
              {isMuted ? (
                <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
