/**
 * Configures touch gestures on a WebGL canvas to prevent page scroll hijacking.
 */
export function configureMobileTouchControls(
  canvas: HTMLCanvasElement,
  controls?: { enabled: boolean; touches?: { ONE?: number; TWO?: number } }
) {
  if (!canvas) return;

  // Set CSS touch-action to pan-y so vertical scrolling works natively
  canvas.style.touchAction = "pan-y";

  // Check if touch is supported
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // If using Three.js OrbitControls, prevent single-touch orbit from blocking vertical scroll
  if (controls && controls.touches && isTouch) {
    // 0 corresponds to THREE.TOUCH.NONE in Three.js
    controls.touches.ONE = 0;
  }

  // Ensure touchstart doesn't block scrolling with non-passive listeners
  canvas.addEventListener(
    "touchstart",
    (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Single finger swipe: permit browser native scrolling
        return;
      }
    },
    { passive: true }
  );
}
