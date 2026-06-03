"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

type Star = {
  left: string;
  top: string;
  width: string;
  height: string;
  delay: string;
  duration: string;
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const { theme } = useTheme();

  // stars
  useEffect(() => {
    setStars(
      Array.from({ length: 120 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 3 + 2}s`,
      }))
    );
  }, []);

  // canvas globe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let rotation = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const dots: { lat: number; lng: number }[] = [];
    for (let lat = -90; lat <= 90; lat += 4.5) {
      for (let lng = -180; lng <= 180; lng += 4.5) {
        dots.push({ lat, lng });
      }
    }

    const pointInPolygon = (lng: number, lat: number, poly: [number, number][]) => {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], yi = poly[i][1];
        const xj = poly[j][0], yj = poly[j][1];
        const intersect =
          yi > lat !== yj > lat &&
          lng < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-9) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };

    const landPolygons: [number, number][][] = [
      [[-168,72],[-150,72],[-130,70],[-120,66],[-110,62],[-100,56],[-92,52],[-85,49],[-80,45],[-75,42],[-70,40],[-65,36],[-60,33],[-70,26],[-84,25],[-97,22],[-110,20],[-125,22],[-140,28],[-155,40],[-168,55],[-168,72]],
      [[-105,22],[-92,22],[-82,18],[-78,12],[-90,10],[-100,14],[-105,22]],
      [[-82,12],[-74,10],[-66,8],[-58,6],[-50,1],[-44,-8],[-42,-18],[-45,-30],[-54,-44],[-64,-54],[-74,-50],[-80,-35],[-82,-15],[-82,12]],
      [[-18,37],[-5,36],[10,34],[25,33],[40,30],[52,20],[50,5],[45,-10],[40,-22],[30,-35],[10,-35],[-5,-30],[-15,-15],[-18,5],[-18,37]],
      [[-10,72],[5,72],[20,70],[35,68],[55,66],[75,66],[95,62],[115,56],[130,50],[145,45],[150,35],[140,25],[120,18],[100,10],[80,6],[60,5],[45,10],[35,20],[28,30],[20,38],[12,45],[2,50],[-8,58],[-10,72]],
      [[68,24],[74,28],[80,26],[88,22],[92,18],[86,8],[78,6],[72,10],[68,24]],
      [[95,18],[105,20],[115,16],[124,10],[128,2],[122,-6],[112,-8],[102,-4],[95,6],[95,18]],
      [[113,-10],[154,-10],[154,-44],[142,-44],[128,-38],[116,-32],[113,-20],[113,-10]],
      [[-55,84],[-18,84],[-18,60],[-55,60],[-55,84]],
    ];

    const isLand = (lat: number, lng: number) => {
      for (const poly of landPolygons) {
        if (pointInPolygon(lng, lat, poly)) return true;
      }
      return false;
    };

    const rings = [
      { tilt: 15,  speed: 0.003,  phase: 0 },
      { tilt: -25, speed: 0.002,  phase: Math.PI / 3 },
      { tilt: 5,   speed: 0.0015, phase: Math.PI },
    ];

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // ── Always use the blue palette regardless of theme ──
      const cx = w * 0.54;
      const cy = h * 0.52;
      const R = Math.min(w, h) * 0.36;

      // glow behind globe
      const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.35);
      glow.addColorStop(0,    "rgba(47, 107, 255, 0.10)");
      glow.addColorStop(0.55, "rgba(47, 107, 255, 0.06)");
      glow.addColorStop(1,    "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // sphere base — same in both modes
      const sphere = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.25, R * 0.12, cx, cy, R);
      sphere.addColorStop(0,   "rgba(255, 255, 255, 0.98)");
      sphere.addColorStop(0.6, "rgba(240, 246, 255, 0.98)");
      sphere.addColorStop(1,   "rgba(218, 232, 255, 1)");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // dots — always blue
      for (const { lat, lng } of dots) {
        const phi   = ((90 - lat) * Math.PI) / 180;
        const theta = ((lng + rotation * (180 / Math.PI)) * Math.PI) / 180;

        const x3d = Math.sin(phi) * Math.cos(theta);
        const y3d = -Math.cos(phi);
        const z3d = Math.sin(phi) * Math.sin(theta);

        if (z3d < 0) continue;

        const px = cx + x3d * R;
        const py = cy + y3d * R;
        const brightness = 0.35 + z3d * 0.65;

        if (isLand(lat, lng)) {
          // land dots — blue
          ctx.fillStyle = `rgba(47, 107, 255, ${brightness * 0.85})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.55, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // ocean dots — very subtle blue
          ctx.fillStyle = `rgba(40, 90, 170, ${brightness * 0.12})`;
          ctx.beginPath();
          ctx.arc(px, py, 0.95, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // edge highlight — always blue
      const edge = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
      edge.addColorStop(0,    "transparent");
      edge.addColorStop(0.75, "rgba(47, 107, 255, 0.08)");
      edge.addColorStop(1,    "rgba(255, 255, 255, 0.7)");
      ctx.fillStyle = edge;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(47, 107, 255, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // orbits — always blue
      for (const ring of rings) {
        const angle   = rotation * ring.speed * 300 + ring.phase;
        const tiltRad = (ring.tilt * Math.PI) / 180;
        const rw = R * 1.3;
        const rh = R * 0.34 * Math.abs(Math.cos(tiltRad));

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tiltRad * 0.55);

        // orbit track
        ctx.beginPath();
        ctx.ellipse(0, 0, rw, rh, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(49, 108, 181, 0.50)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // moving dot glow
        const dotX = Math.cos(angle) * rw;
        const dotY = Math.sin(angle) * rh;

        const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
        dotGlow.addColorStop(0, "rgba(49, 108, 181, 0.9)");
        dotGlow.addColorStop(1, "transparent");
        ctx.fillStyle = dotGlow;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
        ctx.fill();

        // dot core
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      rotation += 0.003;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <section className="hero">
      <div className="stars" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.width,
              height: s.height,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="headline">
              Wealth Now
              <br />
              Has a
              <br />
              <span className="highlight">Global Benchmark.</span>
            </h1>

            <div className="subtext">
              <p>
                Your wealth was concentrated in a single country with a benchmark that captured a narrow
                opportunity set.
              </p>
              <p>One currency. One business cycle. One regime.</p>
              <p>
                It's time to align your wealth with the world: diversify your risk, protect against currency
                volatility, and invest in places driving innovation and growth.
              </p>
            </div>

            <div className="cta-group">
              <button className="btn-primary" type="button">
                Request Access
              </button>
              <button className="btn-secondary" type="button">
                Get Started with Invitation Code
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="globe-free" aria-hidden="true">
              <canvas ref={canvasRef} className="earth-canvas" />
              <div className="globe-glow" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(html.dark) {
          --bg0: #030b1d;
          --bg1: #071a3a;
          --text: rgba(255, 255, 255, 0.95);
          --muted: rgba(255, 255, 255, 0.66);
          --border: rgba(255, 255, 255, 0.14);
          --borderStrong: rgba(255, 255, 255, 0.28);
          --accent: #316cb5;
          --accent2: #4a89dc;
          --shadow: 0 16px 35px rgba(49, 108, 181, 0.30);
        }

        :global(html.light) {
          --bg0: #f8fbff;
          --bg1: #ffffff;
          --bg: #f5f7fb;
          --text: rgba(10, 20, 40, 0.95);
          --muted: rgba(10, 20, 40, 0.7);
          --border: rgba(10, 20, 40, 0.12);
          --borderStrong: rgba(10, 20, 40, 0.18);
          --accent: #316cb5;
          --accent2: #4a89dc;
          --shadow: 0 16px 35px rgba(47, 107, 255, 0.16);
        }

        .hero {
          position: relative;
          min-height: calc(100vh - 72px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          color: var(--text);
          background:
            radial-gradient(1100px 650px at 18% 18%, var(--bg1) 0%, transparent 55%),
            radial-gradient(900px 600px at 75% 40%, rgba(47, 107, 255, 0.12), transparent 60%),
            linear-gradient(180deg, var(--bg1), var(--bg0));
        }

        /* dark mode background — blue tones only, no green */
        :global(html.dark) .hero {
          background:
            radial-gradient(1100px 650px at 18% 18%, var(--bg1) 0%, transparent 55%),
            radial-gradient(900px 600px at 75% 40%, rgba(49, 108, 181, 0.14), transparent 60%),
            linear-gradient(180deg, var(--bg1), var(--bg0));
        }

        .stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.55; }
        }
        :global(html.light) .stars { opacity: 0.06; }

        .container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 28px;
          flex: 1;
          display: flex;
        }

        .hero-content {
          width: 100%;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 26px;
          padding: 56px 0 30px;
        }

        .headline {
          font-family: var(--font-syne, "Syne", sans-serif);
          font-size: clamp(34px, 3.6vw, 52px);
          font-weight: 800;
          line-height: 1.06;
          margin: 0;
          letter-spacing: -0.035em;
        }

        .highlight { color: #316cb5; }

        .subtext {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.85;
          max-width: 640px;
          margin: 0;
          font-weight: 500;
        }
        .subtext p { margin: 0 0 12px; }
        .subtext p:last-child { margin-bottom: 0; }

        .cta-group {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #316cb5;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 12px 18px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: var(--shadow);
          transition: transform 0.15s, background 0.2s;
        }
        .btn-primary:hover {
          background: #1f6ef5;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--borderStrong);
          border-radius: 999px;
          padding: 12px 18px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.15s, background 0.2s;
        }
        .btn-secondary:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.06);
        }
        :global(html.light) .btn-secondary:hover {
          background: rgba(10, 20, 40, 0.04);
        }

        .hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 520px;
        }

        .globe-free {
          position: relative;
          width: min(520px, 100%);
          aspect-ratio: 1 / 1;
        }

        .earth-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* globe glow — always blue */
        .globe-glow {
          position: absolute;
          inset: -60px;
          background: radial-gradient(circle at 50% 55%, rgba(47, 107, 255, 0.16), transparent 60%);
          pointer-events: none;
          filter: blur(2px);
        }

        @media (max-width: 980px) {
          .hero-content {
            grid-template-columns: 1fr;
            padding: 40px 0 20px;
          }
          .hero-right { min-height: 420px; }
        }

        @media (max-width: 520px) {
          .container { padding: 0 16px; }
        }
      `}</style>
    </section>
  );
}
