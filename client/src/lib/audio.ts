// Singleton pattern for audio context
let audioContext: AudioContext | null = null;

// Initialize or get audio context
function getAudioContext(): AudioContext | null {
  if (audioContext === null) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error('Web Audio API is not supported in this browser');
      return null;
    }
  }
  return audioContext;
}

/**
 * Play a tone for comparison operations
 * @param value The array value to base frequency on
 */
export function playComparisonSound(value: number): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const frequency = 200 + value * 5; // Scale frequency based on value (increased multiplier for smaller numbers)
  playTone(ctx, frequency, 0.1, 0.1);
}

/**
 * Play a tone for swap operations
 * @param value The array value to base frequency on
 */
export function playSwapSound(value: number): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const frequency = 300 + value * 7; // Different frequency scaling for swaps (increased for smaller numbers)
  playTone(ctx, frequency, 0.1, 0.15);
}

/**
 * Generic tone generator
 */
function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number = 0.1,
  volume: number = 0.1
): void {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  // Configure oscillator
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  
  // Configure gain (volume)
  gainNode.gain.value = volume;
  gainNode.connect(ctx.destination);
  
  // Schedule envelope
  const now = ctx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);
  
  // Play and stop
  oscillator.start();
  oscillator.stop(now + duration);
}

/**
 * Resume audio context if it was suspended (browser policy)
 */
export function resumeAudioContext(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
}
