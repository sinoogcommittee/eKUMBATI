/**
 * e-KUMBATI Mobile Haptic Feedback Engine
 * Graceful tactile pulses on supported mobile devices
 */

export type HapticType = 'light' | 'success' | 'warning' | 'emergency';

export const triggerHaptic = (type: HapticType = 'light'): void => {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  try {
    switch (type) {
      case 'light':
        // Short 10ms micro-pulse for tabs, buttons, copy clicks
        navigator.vibrate(10);
        break;
      case 'success':
        // Double gentle pulse for successfully completed actions
        navigator.vibrate([15, 40, 20]);
        break;
      case 'warning':
        // Attention pulse
        navigator.vibrate([25, 40, 25]);
        break;
      case 'emergency':
        // Noticeable double emergency pulse for PTV and hotlines
        navigator.vibrate([20, 60, 30, 60, 20]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch {
    // Gracefully ignore devices that restrict vibration
  }
};
