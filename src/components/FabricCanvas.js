import React, { useRef, useEffect } from 'react';
import './FabricCanvas.css';

const DOT_SPACING = 30;
const DOT_RADIUS = 1.2;
const DOT_COLOR = 'rgba(255,255,255,0.08)';
const INFLUENCE_RADIUS = 150;
const LINE_RADIUS = 200;
const PUSH_STRENGTH = 0.4;
const SPRING_BACK = 0.08;

export default function FabricCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(null);
  const displacedRef = useRef({});
  const lineProgressRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = window.scrollY;
      const mouse = mouseRef.current;
      const mx = mouse.x;
      const my = mouse.y + scrollY;
      const displaced = displacedRef.current;

      // Collect exclusion zones from elements with data-no-dots
      const exclusions = [];
      document.querySelectorAll('[data-no-dots]').forEach(el => {
        const rect = el.getBoundingClientRect();
        exclusions.push({
          left: rect.left - 20,
          right: rect.right + 20,
          top: rect.top + scrollY - 20,
          bottom: rect.bottom + scrollY + 20,
        });
      });

      const isExcluded = (x, y) => {
        for (let i = 0; i < exclusions.length; i++) {
          const z = exclusions[i];
          if (x >= z.left && x <= z.right && y >= z.top && y <= z.bottom) return true;
        }
        return false;
      };

      const pad = INFLUENCE_RADIUS + DOT_SPACING;
      const startRow = Math.max(0, Math.floor((scrollY - pad) / DOT_SPACING));
      const endRow = Math.ceil((scrollY + h + pad) / DOT_SPACING);
      const startCol = Math.max(0, Math.floor(-pad / DOT_SPACING));
      const endCol = Math.ceil((w + pad) / DOT_SPACING);

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          const key = r * 10000 + c;
          const ox = c * DOT_SPACING;
          const oy = r * DOT_SPACING;
          if (isExcluded(ox, oy)) continue;
          if (!displaced[key]) displaced[key] = { x: ox, y: oy };
          const dot = displaced[key];

          if (mouse.active) {
            const dx = ox - mx;
            const dy = oy - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < INFLUENCE_RADIUS && dist > 0) {
              const force = (INFLUENCE_RADIUS - dist) / INFLUENCE_RADIUS;
              const pushX = (dx / dist) * force * PUSH_STRENGTH * INFLUENCE_RADIUS * 0.15;
              const pushY = (dy / dist) * force * PUSH_STRENGTH * INFLUENCE_RADIUS * 0.15;
              dot.x += (ox + pushX - dot.x) * 0.15;
              dot.y += (oy + pushY - dot.y) * 0.15;
            } else {
              dot.x += (ox - dot.x) * SPRING_BACK;
              dot.y += (oy - dot.y) * SPRING_BACK;
            }
          } else {
            dot.x += (ox - dot.x) * SPRING_BACK;
            dot.y += (oy - dot.y) * SPRING_BACK;
          }
        }
      }

      ctx.clearRect(0, 0, w, h);

      const lineProgress = lineProgressRef.current;
      let nearestKey = null;
      let nearestDist = Infinity;
      if (mouse.active) {
        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const key = r * 10000 + c;
            const dot = displaced[key];
            if (!dot) continue;
            const d = Math.sqrt((dot.x - mx) ** 2 + ((dot.y - scrollY) - mouse.y) ** 2);
            if (d < nearestDist) { nearestDist = d; nearestKey = key; }
          }
        }
      }

      const reached = {};
      if (nearestKey !== null) reached[nearestKey] = true;
      for (const lk in lineProgress) {
        if (lineProgress[lk] >= 0.5) {
          const parts = lk.split('-');
          reached[parseInt(parts[0])] = true;
          reached[parseInt(parts[1])] = true;
        }
      }

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          const key = r * 10000 + c;
          const dot = displaced[key];
          if (!dot) continue;
          const screenX = dot.x;
          const screenY = dot.y - scrollY;
          if (screenX < -10 || screenX > w + 10 || screenY < -10 || screenY > h + 10) continue;

          const distToMouse = Math.sqrt((screenX - mx) ** 2 + (screenY - mouse.y) ** 2);

          const neighbors = [[r, c + 1], [r + 1, c], [r, c - 1], [r - 1, c]];
          for (const [nr, nc] of neighbors) {
            const nKey = nr * 10000 + nc;
            const nDot = displaced[nKey];
            if (!nDot) continue;

            const lineKey = Math.min(key, nKey) + '-' + Math.max(key, nKey);
            if (!lineProgress[lineKey]) lineProgress[lineKey] = 0;

            const hash = (Math.sin(key * 127.1 + nKey * 311.7) * 43758.5453) % 1;
            const speedVariation = 0.015 + Math.abs(hash) * 0.045;

            const shouldGrow = mouse.active && distToMouse < LINE_RADIUS && reached[key];
            if (shouldGrow) {
              lineProgress[lineKey] += (1 - lineProgress[lineKey]) * speedVariation;
            } else {
              lineProgress[lineKey] += (0 - lineProgress[lineKey]) * 0.04;
            }

            const prog = lineProgress[lineKey];
            if (prog < 0.005) { delete lineProgress[lineKey]; continue; }

            const nScreenX = nDot.x;
            const nScreenY = nDot.y - scrollY;

            let fromX, fromY, toX, toY;
            if (reached[key] && !reached[nKey]) {
              fromX = screenX; fromY = screenY;
              toX = screenX + (nScreenX - screenX) * prog;
              toY = screenY + (nScreenY - screenY) * prog;
            } else if (reached[nKey] && !reached[key]) {
              fromX = nScreenX; fromY = nScreenY;
              toX = nScreenX + (screenX - nScreenX) * prog;
              toY = nScreenY + (screenY - nScreenY) * prog;
            } else {
              fromX = screenX; fromY = screenY;
              toX = nScreenX; toY = nScreenY;
            }

            const t = Math.max(0, 1 - (distToMouse / LINE_RADIUS));
            const grey = Math.round(120 + t * 80);
            ctx.strokeStyle = 'rgba(' + grey + ',' + grey + ',' + grey + ',' + (0.12 + t * 0.2) * prog + ')';
            ctx.lineWidth = 0.5 + prog * 0.5;
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
          }
        }
      }

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          const key = r * 10000 + c;
          const dot = displaced[key];
          if (!dot) continue;
          const screenX = dot.x;
          const screenY = dot.y - scrollY;
          if (screenX < -10 || screenX > w + 10 || screenY < -10 || screenY > h + 10) continue;

          let color = DOT_COLOR;
          if (mouse.active) {
            const dx = screenX - mx;
            const dy = screenY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < INFLUENCE_RADIUS) {
              const t = 1 - (dist / INFLUENCE_RADIUS);
              const grey = Math.round(120 + t * 80);
              const a = 0.08 + t * 0.4;
              color = 'rgba(' + grey + ',' + grey + ',' + grey + ',' + a + ')';
            }
          }

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    setupCanvas();
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', setupCanvas);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', setupCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fabric-canvas" />;
}
