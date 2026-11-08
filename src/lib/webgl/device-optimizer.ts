import * as THREE from "three";

export interface WebGLQualityConfig {
  dpr: number;
  antialias: boolean;
  enableShadows: boolean;
  precision: "highp" | "mediump";
  powerPreference: "high-performance" | "default" | "low-power";
  isMobile: boolean;
}

/**
 * Evaluates client hardware capabilities to prevent mobile GPU thermal throttling.
 */
export function getOptimizedWebGLConfig(): WebGLQualityConfig {
  if (typeof window === "undefined") {
    return {
      dpr: 1,
      antialias: false,
      enableShadows: false,
      precision: "mediump",
      powerPreference: "default",
      isMobile: false,
    };
  }

  const isMobileViewport = window.innerWidth <= 768;
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isMobile = isMobileViewport || isTouchDevice;

  const rawDpr = window.devicePixelRatio || 1;

  // STRICT DPR CLAMP:
  // Mobile: Clamp strictly to 1.0 (or max 1.25 on high-end chipsets).
  // Desktop: Clamp to max 1.5 to 1.75 (avoiding 3x/4x retina fill-rate penalties).
  const dpr = isMobile ? Math.min(rawDpr, 1.0) : Math.min(rawDpr, 1.75);

  return {
    dpr,
    // Turn off MSAA on mobile: TBDR architecture incurs high memory bandwidth bottlenecks
    antialias: !isMobile,
    // Disable real-time dynamic shadow maps on mobile viewports
    enableShadows: !isMobile,
    precision: isMobile ? "mediump" : "highp",
    powerPreference: isMobile ? "default" : "high-performance",
    isMobile,
  };
}

/**
 * Initializes or tunes a THREE.WebGLRenderer for optimal performance across devices.
 */
export function initializeAdaptiveRenderer(
  canvas: HTMLCanvasElement
): { renderer: THREE.WebGLRenderer; config: WebGLQualityConfig } {
  const config = getOptimizedWebGLConfig();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: config.antialias,
    powerPreference: config.powerPreference,
    precision: config.precision,
    alpha: true,
    stencil: false,
    depth: true,
  });

  // Apply clamped pixel ratio & sizing
  renderer.setPixelRatio(config.dpr);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  // Shadow Map Optimization
  if (config.enableShadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = true;
  } else {
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.autoUpdate = false;
  }

  // Linear / sRGB encoding
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  return { renderer, config };
}

/**
 * Safely applies resolution and shadow clamping to an existing renderer instance (e.g., Spline runtime).
 */
export function tuneExistingRenderer(renderer: THREE.WebGLRenderer): WebGLQualityConfig {
  const config = getOptimizedWebGLConfig();
  if (!renderer) return config;

  try {
    renderer.setPixelRatio(config.dpr);
    if (!config.enableShadows && renderer.shadowMap) {
      renderer.shadowMap.enabled = false;
      renderer.shadowMap.autoUpdate = false;
    }
  } catch (err) {
    console.warn("Could not tune existing renderer:", err);
  }

  return config;
}

