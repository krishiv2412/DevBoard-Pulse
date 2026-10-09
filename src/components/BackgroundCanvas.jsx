import React, { useEffect, useRef } from "react";
import { useEvents } from "../context/EventsContext";
import { ANIMATION_THEMES } from "../data/initialEvents";

export const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const { animationSettings } = useEvents();
  const mouseRef = useRef({ 
    x: window.innerWidth / 2, 
    y: window.innerHeight / 3, 
    targetX: window.innerWidth / 2, 
    targetY: window.innerHeight / 3 
  });

  const activeTheme = ANIMATION_THEMES.find(t => t.id === animationSettings?.themeId) || ANIMATION_THEMES[0];
  const waveSpeedMultiplier = animationSettings?.waveSpeed ?? 1.0;
  const waveAmplitude = animationSettings?.waveAmplitude ?? 20;
  const spotlightRadius = animationSettings?.spotlightRadius ?? 420;
  const showPulseWaves = animationSettings?.showPulseWaves !== false;
  const showProximityGrid = animationSettings?.showProximityGrid !== false;
  const showSpotlight = animationSettings?.showSpotlight !== false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.015 * waveSpeedMultiplier;
      
      // Smoothly interpolate mouse position for fluid spotlight
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Interactive Soft Spotlight that highlights glass cards under cursor
      if (showSpotlight) {
        const spotlightGradient = ctx.createRadialGradient(mx, my, 0, mx, my, spotlightRadius);
        spotlightGradient.addColorStop(0, activeTheme.spotlightColor || "rgba(2, 132, 199, 0.14)");
        spotlightGradient.addColorStop(0.4, activeTheme.spotlightSubColor || "rgba(249, 115, 22, 0.06)");
        spotlightGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = spotlightGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Subtle Creative Waveform (DevBoard "Pulse" Live Activity Stream)
      if (showPulseWaves) {
        ctx.save();
        const waveCount = 2;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const waveY = height * (0.35 + w * 0.25);
          ctx.moveTo(0, waveY);

          for (let x = 0; x <= width; x += 18) {
            // Combination of gentle sine waves modulated by time and distance to mouse
            const distToMouse = Math.abs(x - mx);
            const mouseInfluence = Math.max(0, 1 - distToMouse / 500) * (waveAmplitude * 0.9);
            const y = waveY + 
              Math.sin(x * 0.003 + time * (1 + w * 0.4) + w) * (waveAmplitude * (0.9 + w * 0.5)) +
              Math.cos(x * 0.007 - time * 0.8) * 8 +
              Math.sin(x * 0.001) * mouseInfluence;
            ctx.lineTo(x, y);
          }

          ctx.strokeStyle = w === 0 
            ? (activeTheme.wave1Color || "rgba(56, 189, 248, 0.12)")
            : (activeTheme.wave2Color || "rgba(249, 115, 22, 0.09)");
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Subtle Vertical Grid Lines that light up near the mouse spotlight
      if (showProximityGrid) {
        const gridSpacing = 64;
        ctx.save();
        ctx.lineWidth = 0.5;
        for (let x = 0; x < width; x += gridSpacing) {
          const dist = Math.abs(x - mx);
          if (dist < spotlightRadius * 0.75) {
            const alpha = (1 - dist / (spotlightRadius * 0.75)) * 0.06;
            ctx.strokeStyle = `${activeTheme.gridColor || "rgba(56, 189, 248, "}${alpha})`;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeTheme, waveSpeedMultiplier, waveAmplitude, spotlightRadius, showPulseWaves, showProximityGrid, showSpotlight]);

  return (
    <div className="background-canvas-wrapper static-deep-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="interactive-canvas" />
      <div className="static-vignette-overlay" />
    </div>
  );
};
