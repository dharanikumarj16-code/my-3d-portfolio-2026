import * as THREE from "three";

/**
 * Exhaustively iterates through known texture slots and shader uniforms to dispose textures.
 */
export function disposeMaterialTextures(material: THREE.Material): void {
  const textureSlots: Array<keyof THREE.Material | string> = [
    "map",
    "alphaMap",
    "aoMap",
    "bumpMap",
    "displacementMap",
    "emissiveMap",
    "envMap",
    "gradientMap",
    "lightMap",
    "metalnessMap",
    "normalMap",
    "roughnessMap",
    "specularMap",
    "transmissionMap",
    "thicknessMap",
    "sheenColorMap",
    "sheenRoughnessMap",
    "clearcoatMap",
    "clearcoatNormalMap",
    "clearcoatRoughnessMap",
  ];

  for (const slot of textureSlots) {
    const texture = (material as Record<string, any>)[slot];
    if (texture && typeof texture.dispose === "function") {
      texture.dispose();
    }
  }

  // Handle Custom ShaderMaterial uniforms with texture references
  if ("uniforms" in material && (material as THREE.ShaderMaterial).uniforms) {
    const uniforms = (material as THREE.ShaderMaterial).uniforms;
    for (const key of Object.keys(uniforms)) {
      const uniformValue = uniforms[key]?.value;
      if (uniformValue && typeof uniformValue.dispose === "function") {
        uniformValue.dispose();
      }
    }
  }
}

/**
 * Recursively disposes all geometry, materials, and textures attached to an Object3D.
 */
export function disposeHierarchy(root: THREE.Object3D | null | undefined): void {
  if (!root) return;

  root.traverse((obj: THREE.Object3D) => {
    // 1. Dispose Geometries
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    // 2. Dispose Materials and associated Texture Maps
    if (mesh.material) {
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      for (const material of materials) {
        disposeMaterialTextures(material);
        material.dispose();
      }
    }

    // 3. Clean up Light shadow maps if present
    const light = obj as THREE.Light;
    if (light.shadow?.map) {
      light.shadow.map.dispose();
    }
  });

  // Clear parent/child references
  while (root.children && root.children.length > 0) {
    const child = root.children[0];
    root.remove(child);
    disposeHierarchy(child);
  }
}

/**
 * Full teardown of the WebGL instance, rendering loop, and context to prevent mobile memory crashes.
 */
export function teardownWebGLInstance(
  renderer: THREE.WebGLRenderer | null | undefined,
  scene: THREE.Scene | null | undefined,
  animationFrameId?: number
): void {
  // Stop animation frame loop
  if (animationFrameId !== undefined) {
    cancelAnimationFrame(animationFrameId);
  }

  // Traverse & dispose entire scene graph
  if (scene) {
    disposeHierarchy(scene);
    scene.clear();
  }

  // Force GPU context loss and release renderer
  if (renderer) {
    try {
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    } catch (err) {
      console.warn("Error tearing down WebGLRenderer:", err);
    }
    (renderer as any).domElement = null;
  }
}

