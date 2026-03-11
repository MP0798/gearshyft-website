import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import React from 'react';

// Target assembled layout positions (wireframe UI / dashboard)
const ASSEMBLED = [
  { x: 180, y: 115, w: 240, h: 28, label: 'header' },    // Block A - header bar
  { x: 180, y: 150, w: 58, h: 130, label: 'sidebar' },    // Block B - sidebar
  { x: 245, y: 150, w: 175, h: 130, label: 'main' },      // Block C - main content
  { x: 358, y: 290, w: 62, h: 24, label: 'action' },      // Block D - action button
];

// Starting positions (scattered across canvas)
const START_POSITIONS = [
  { x: 80, y: 40 },     // header - from top-left
  { x: 50, y: 300 },    // sidebar - from bottom-left
  { x: 450, y: 50 },    // main - from top-right
  { x: 480, y: 320 },   // action - from bottom-right
];

// Start sizes (uniform squares before assembly)
const START_SIZE = 80;

export const BrutalistAssembly = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: Blocks appear (0-40) ---
  const getBlockEntry = (i) => {
    const delay = i * 8;
    return spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, stiffness: 180 },
    });
  };

  // Gentle float/jitter while blocks are loose
  const jitter = (i) => ({
    x: Math.sin(frame * 0.06 + i * 2.1) * 3,
    y: Math.cos(frame * 0.08 + i * 1.5) * 3,
  });

  // --- Phase 2: Blocks move to dashboard position (40-120) ---
  const getAssembleProgress = (i) => spring({
    frame: frame - (45 + i * 10),
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  // Compute block positions
  const blocks = ASSEMBLED.map((target, i) => {
    const entry = getBlockEntry(i);
    const assemble = getAssembleProgress(i);
    const j = assemble < 0.99 ? jitter(i) : { x: 0, y: 0 };

    const startX = START_POSITIONS[i].x;
    const startY = START_POSITIONS[i].y;

    const x = interpolate(assemble, [0, 1], [startX + j.x, target.x]);
    const y = interpolate(assemble, [0, 1], [startY + j.y, target.y]);
    const w = interpolate(assemble, [0, 1], [START_SIZE, target.w]);
    const h = interpolate(assemble, [0, 1], [START_SIZE, target.h]);

    return { x, y, w, h, entry, assemble, label: target.label };
  });

  // Status dot blink
  const dotOpacity = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.3));
  const dotColor = frame > 140 ? '#7A8C70' : '#CC5833';

  // --- Phase 3: Lock-in + annotations (120-180) ---
  const lockPulse = interpolate(frame, [130, 138, 145], [1, 2.5, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const annotOpacity = interpolate(frame, [145, 160], [0, 0.5], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const annotDashOffset = interpolate(frame, [145, 160], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Assembly arms (briefly visible during assembly)
  const armOpacity = interpolate(frame, [90, 100, 120, 130], [0, 0.4, 0.4, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // --- Phase 4: Hold + fade (180-210) ---
  const globalOpacity = interpolate(frame, [195, 209], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', opacity: globalOpacity }}>
      <svg width="100%" height="100%" viewBox="0 0 600 400" style={{ overflow: 'visible' }}>
        {/* Status dot */}
        <circle cx={530} cy={50} r={4} fill={dotColor} opacity={dotOpacity} />
        <text x={505} y={54} fontSize={8} fontFamily="monospace" fill={dotColor} opacity={dotOpacity * 0.7} textAnchor="end">
          {frame > 140 ? 'LIVE' : 'BUILD'}
        </text>

        {/* Blocks */}
        {blocks.map((b, i) => (
          <rect
            key={`block-${i}`}
            x={b.x} y={b.y} width={b.w} height={b.h}
            fill="currentColor"
            fillOpacity={i === 3 ? 0.15 : 0.06}
            stroke={b.assemble > 0.9 ? (i === 3 ? '#7A8C70' : 'currentColor') : 'currentColor'}
            strokeWidth={b.assemble > 0.9 ? lockPulse : 1}
            opacity={b.entry * 0.8}
          />
        ))}

        {/* Assembly arms */}
        {armOpacity > 0 && (
          <g opacity={armOpacity}>
            <polyline points="110,200 168,200 168,165" fill="none" stroke="currentColor" strokeWidth={1.5} />
            <polyline points="490,200 432,200 432,235" fill="none" stroke="currentColor" strokeWidth={1.5} />
          </g>
        )}

        {/* Dimension annotations */}
        {annotOpacity > 0 && (
          <g opacity={annotOpacity}>
            {/* Top width measurement */}
            <line x1={180} y1={105} x2={420} y2={105} stroke="currentColor" strokeWidth={0.5}
              strokeDasharray={50} strokeDashoffset={annotDashOffset} />
            <line x1={180} y1={102} x2={180} y2={108} stroke="currentColor" strokeWidth={0.5} />
            <line x1={420} y1={102} x2={420} y2={108} stroke="currentColor" strokeWidth={0.5} />
            <text x={300} y={102} fontSize={7} fontFamily="monospace" fill="currentColor" textAnchor="middle" opacity={0.6}>240</text>

            {/* Side height measurement */}
            <line x1={170} y1={115} x2={170} y2={290} stroke="currentColor" strokeWidth={0.5}
              strokeDasharray={50} strokeDashoffset={annotDashOffset} />
            <line x1={167} y1={115} x2={173} y2={115} stroke="currentColor" strokeWidth={0.5} />
            <line x1={167} y1={290} x2={173} y2={290} stroke="currentColor" strokeWidth={0.5} />
            <text x={163} y={205} fontSize={7} fontFamily="monospace" fill="currentColor" textAnchor="end" opacity={0.6}
              transform="rotate(-90, 163, 205)">175</text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
