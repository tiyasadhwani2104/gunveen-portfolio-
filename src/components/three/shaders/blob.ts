import { SIMPLEX_3D } from "./noise";

/**
 * Vertex displacement: layered simplex noise drifting over time, plus a soft
 * bulge that follows the pointer. Normals are re-derived with a two-tangent
 * finite difference so the lighting tracks the deformed surface.
 */
export const blobVertexShader = /* glsl */ `
uniform float uTime;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uPointerAmp;
uniform vec3  uPointer;

varying vec3 vNormalW;
varying vec3 vPositionW;
varying float vDisplacement;

${SIMPLEX_3D}

float fieldAt(vec3 p) {
  float t = uTime * 0.22;
  // two octaves of drifting noise for an organic, breathing surface
  float n  = snoise(p * uNoiseFreq + vec3(0.0, t, 0.0));
  n       += 0.5 * snoise(p * uNoiseFreq * 2.1 - vec3(t * 1.3, 0.0, t * 0.7));
  n       *= 0.666;

  // pointer bulge: strongest where the surface faces the cursor
  float toward = max(dot(normalize(p), normalize(uPointer + vec3(0.0, 0.0, 1.0))), 0.0);
  float bulge = pow(toward, 3.0) * uPointerAmp;

  return n * uNoiseAmp + bulge;
}

vec3 displace(vec3 p, vec3 n) {
  return p + n * fieldAt(p);
}

void main() {
  vec3 n = normalize(normal);

  // build an orthonormal tangent basis around the normal
  vec3 helper = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(helper, n));
  vec3 bitangent = normalize(cross(n, tangent));

  float eps = 0.035;
  vec3 p0 = displace(position, n);
  vec3 p1 = displace(position + tangent * eps, normalize(position + tangent * eps));
  vec3 p2 = displace(position + bitangent * eps, normalize(position + bitangent * eps));

  vec3 newNormal = normalize(cross(p1 - p0, p2 - p0));
  // the icosahedron winding can flip the derived normal — keep it outward facing
  if (dot(newNormal, n) < 0.0) newNormal = -newNormal;

  vDisplacement = fieldAt(position);
  vNormalW = normalize(mat3(modelMatrix) * newNormal);

  vec4 world = modelMatrix * vec4(p0, 1.0);
  vPositionW = world.xyz;

  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

/**
 * Iridescent gradient built only from the brand hex colors: a fresnel rim of
 * botticelli over a lemon-chiffon-to-coffee-bean body, with a thin-film style
 * hue shift driven by the view angle and the displacement amount.
 */
export const blobFragmentShader = /* glsl */ `
uniform vec3  uColorDeep;
uniform vec3  uColorBase;
uniform vec3  uColorGlow;
uniform vec3  uColorRim;
uniform float uTime;
uniform float uOpacity;

varying vec3 vNormalW;
varying vec3 vPositionW;
varying float vDisplacement;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPositionW);

  float facing = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - facing, 2.4);

  // thin-film style banding — same palette, phase-shifted per channel
  float band = sin(facing * 9.0 - uTime * 0.5 + vDisplacement * 6.0) * 0.5 + 0.5;

  float d = clamp(vDisplacement * 1.6 + 0.5, 0.0, 1.0);

  vec3 color = mix(uColorDeep, uColorBase, d);
  color = mix(color, uColorGlow, band * 0.45 * (0.35 + d * 0.65));
  color = mix(color, uColorRim, fresnel * 0.85);

  // soft key light from the upper left so the form reads as volume
  float key = clamp(dot(N, normalize(vec3(-0.6, 0.8, 0.5))), 0.0, 1.0);
  color *= 0.55 + key * 0.7;

  // bloom pickup: only the rim and the crests push past the threshold
  color += uColorRim * fresnel * 0.5;

  gl_FragColor = vec4(color, uOpacity);
}
`;
