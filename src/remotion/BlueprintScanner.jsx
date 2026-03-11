import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

// Node positions: chaotic and structured
const CHAOS_POSITIONS = [
  { x: 95, y: 65 }, { x: 480, y: 310 }, { x: 160, y: 260 }, { x: 420, y: 85 },
  { x: 70, y: 175 }, { x: 350, y: 235 }, { x: 510, y: 290 }, { x: 250, y: 120 },
];
const STRUCTURED_X = [75, 150, 225, 300, 375, 450, 525, 600].map((x) => x - 37);
const STRUCTURED_Y = 200;

// Chaotic connections (tangled)
const CHAOS_CONNECTIONS = [
  [0, 3], [0, 7], [1, 5], [1, 6], [2, 4], [2, 5], [3, 7], [4, 7], [5, 6], [0, 2], [3, 6],
];

// Bottleneck nodes and their detection frames
const BOTTLENECKS = [2, 5, 7];
const BOTTLENECK_FRAMES = [40, 54, 68];

export const BlueprintScanner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: Chaos (0-30) ---
  const jitter = (i) => Math.sin(frame * 0.12 + i * 1.7) * 2;

  // --- Phase 2: Scanner (15-85) ---
  const scannerOpacity = interpolate(frame, [15, 25, 75, 85], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Reticle moves to each bottleneck dot, pauses, then moves to the next
  const RETICLE_KEYFRAMES = [
    { frame: 25, x: 300, y: 200 },   // start: center
    { frame: 35, x: CHAOS_POSITIONS[2].x, y: CHAOS_POSITIONS[2].y },   // arrive node 2
    { frame: 40, x: CHAOS_POSITIONS[2].x, y: CHAOS_POSITIONS[2].y },   // pause (detect)
    { frame: 49, x: CHAOS_POSITIONS[5].x, y: CHAOS_POSITIONS[5].y },   // arrive node 5
    { frame: 54, x: CHAOS_POSITIONS[5].x, y: CHAOS_POSITIONS[5].y },   // pause (detect)
    { frame: 63, x: CHAOS_POSITIONS[7].x, y: CHAOS_POSITIONS[7].y },   // arrive node 7
    { frame: 68, x: CHAOS_POSITIONS[7].x, y: CHAOS_POSITIONS[7].y },   // pause (detect)
  ];
  const kfFrames = RETICLE_KEYFRAMES.map(k => k.frame);
  const kfXs = RETICLE_KEYFRAMES.map(k => k.x);
  const kfYs = RETICLE_KEYFRAMES.map(k => k.y);
  const reticleX = interpolate(frame, kfFrames, kfXs, {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const reticleY = interpolate(frame, kfFrames, kfYs, {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // --- Phase 3: Restructure (75-120) ---
  const getNodePos = (i) => {
    const progress = spring({
      frame: frame - (78 + i * 3),
      fps,
      config: { damping: 14, stiffness: 80 },
    });
    const cx = CHAOS_POSITIONS[i].x;
    const cy = CHAOS_POSITIONS[i].y;
    return {
      x: interpolate(progress, [0, 1], [cx, STRUCTURED_X[i]]) + (progress < 1 ? jitter(i) : 0),
      y: interpolate(progress, [0, 1], [cy, STRUCTURED_Y]) + (progress < 1 ? jitter(i + 3) : 0),
    };
  };

  // Chaos lines fade out, structured lines fade in
  const chaosLineOpacity = interpolate(frame, [75, 90], [0.12, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const structLineOpacity = interpolate(frame, [95, 112], [0, 0.3], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const structLineDashOffset = interpolate(frame, [95, 118], [80, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // --- Phase 4: Hold + Fade (120-150) ---
  const globalOpacity = interpolate(frame, [138, 149], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Bottleneck detection: is this node detected yet?
  const isDetected = (nodeIdx) => {
    const bi = BOTTLENECKS.indexOf(nodeIdx);
    if (bi === -1) return false;
    return frame >= BOTTLENECK_FRAMES[bi];
  };

  // Pulse ring for bottleneck detection
  const pulseRing = (nodeIdx) => {
    const bi = BOTTLENECKS.indexOf(nodeIdx);
    if (bi === -1) return null;
    const triggerFrame = BOTTLENECK_FRAMES[bi];
    if (frame < triggerFrame) return null;
    const elapsed = frame - triggerFrame;
    if (elapsed > 18) return null;
    const r = interpolate(elapsed, [0, 18], [5, 28], { extrapolateRight: 'clamp' });
    const opacity = interpolate(elapsed, [0, 18], [0.7, 0], { extrapolateRight: 'clamp' });
    const pos = getNodePos(nodeIdx);
    return (
      <circle cx={pos.x} cy={pos.y} r={r} fill="none" stroke="#CC5833" strokeWidth={1.5} opacity={opacity} />
    );
  };

  // Node color: after restructure, healthy = moss, bottleneck = clay
  const getNodeColor = (i) => {
    if (isDetected(i)) return '#CC5833';
    if (frame > 105) return '#7A8C70';
    return 'currentColor';
  };

  const nodes = CHAOS_POSITIONS.map((_, i) => getNodePos(i));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', opacity: globalOpacity }}>
      {/* Grid Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.04,
      }} />

      <svg width="100%" height="100%" viewBox="0 0 600 400" style={{ overflow: 'visible' }}>
        {/* Chaotic connection lines */}
        {CHAOS_CONNECTIONS.map(([a, b], ci) => (
          <line
            key={`chaos-${ci}`}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="currentColor" strokeWidth={0.8} opacity={chaosLineOpacity}
          />
        ))}

        {/* Structured pipeline lines (sequential) */}
        {nodes.slice(0, -1).map((n, i) => (
          <line
            key={`struct-${i}`}
            x1={nodes[i].x} y1={STRUCTURED_Y}
            x2={nodes[i + 1].x} y2={STRUCTURED_Y}
            stroke="#7A8C70" strokeWidth={1}
            opacity={structLineOpacity}
            strokeDasharray={80}
            strokeDashoffset={structLineDashOffset}
          />
        ))}

        {/* Nodes */}
        {nodes.map((pos, i) => (
          <React.Fragment key={`node-${i}`}>
            {pulseRing(i)}
            <circle
              cx={pos.x} cy={pos.y} r={5}
              fill={getNodeColor(i)}
              stroke={getNodeColor(i)}
              strokeWidth={1}
              opacity={isDetected(i) ? 1 : 0.6}
            />
          </React.Fragment>
        ))}

        {/* Scanner Reticle */}
        {scannerOpacity > 0 && (
          <g opacity={scannerOpacity}>
            <line x1={reticleX} y1={reticleY - 22} x2={reticleX} y2={reticleY + 22} stroke="#CC5833" strokeWidth={1} />
            <line x1={reticleX - 22} y1={reticleY} x2={reticleX + 22} y2={reticleY} stroke="#CC5833" strokeWidth={1} />
            <circle cx={reticleX} cy={reticleY} r={16} fill="none" stroke="#CC5833" strokeWidth={0.8} strokeDasharray="5 3" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
