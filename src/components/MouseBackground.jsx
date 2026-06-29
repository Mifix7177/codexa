import { useEffect, useRef } from 'react'
import './MouseBackground.css'

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  // Pseudo-random generator
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise
  float noise(in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion (fBm)
  float fbm(in vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
      for (int i = 0; i < 4; ++i) {
          value += amplitude * noise(st);
          st = rot * st * 2.0 + shift;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
      // Normalize pixel coordinates (from 0 to 1)
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      
      // Fix aspect ratio
      st.x *= u_resolution.x / u_resolution.y;

      // Mouse interaction
      vec2 mouse = u_mouse.xy / u_resolution.xy;
      mouse.x *= u_resolution.x / u_resolution.y;
      
      vec2 diff = st - mouse;
      float dist = length(diff);
      float mouseRepel = exp(-dist * 3.5); // How strong the mouse pushes the liquid
      
      // Domain warping (Liquid effect)
      vec2 q = vec2(0.0);
      q.x = fbm(st * 3.0 + 0.05 * u_time);
      q.y = fbm(st * 3.0 + vec2(1.0));

      vec2 r = vec2(0.0);
      r.x = fbm(st * 2.0 + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
      r.y = fbm(st * 2.0 + 1.0 * q + vec2(8.3, 2.8) + 0.12 * u_time);
      
      // Add mouse ripple to the distortion
      r += diff * mouseRepel * 0.6;

      float f = fbm(st * 3.0 + r);

      // Colors: Charcoal, Chrome/Silver, Icy Electric Blue
      vec3 bg = vec3(0.02, 0.02, 0.03); // Deep charcoal
      vec3 icyBlue = vec3(0.0, 0.9, 1.0); // Icy blue accent
      vec3 chrome = vec3(0.85, 0.9, 0.95); // Silver/Chrome

      vec3 color = bg;
      
      // Mix in icy blue based on liquid depth
      color = mix(color, icyBlue, clamp(length(q), 0.0, 1.0) * 0.15); 
      
      // Mix in chrome highlights based on liquid ridges
      color = mix(color, chrome, clamp(length(r.x), 0.0, 1.0) * 0.1); 
      
      // Create shiny, undulating ridges
      float ridge = smoothstep(0.4, 0.6, f) * smoothstep(0.6, 0.4, f) * 5.0;
      color += chrome * ridge * 0.3; 
      
      // Dynamic mouse glow
      color += icyBlue * mouseRepel * 0.2;
      
      // Subtle vignette
      float vignette = smoothstep(1.5, 0.5, length(st - vec2(0.5 * u_resolution.x/u_resolution.y, 0.5)));
      color *= vignette;

      gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function MouseBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Setup full-screen quad
    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      
      // Update glass-card local coordinates
      const cards = document.querySelectorAll('.glass-card');
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cards[i].style.setProperty('--mouse-x', `${x}px`);
        cards[i].style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let startTime = performance.now();

    const render = (time) => {
      // In WebGL, y=0 is bottom, so we invert Y for mouse
      gl.uniform2f(mouseLocation, mouseRef.current.x, canvas.height - mouseRef.current.y);
      gl.uniform1f(timeLocation, (time - startTime) * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Cleanup WebGL resources
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mouse-bg"
      aria-hidden="true"
    />
  );
}
