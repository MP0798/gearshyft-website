import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import React from 'react';

// Raw block jagged edge path (rough rectangle)
const RAW_PATH = 'M 148,98 L 305,95 L 455,100 L 452,200 L 454,302 L 298,305 L 150,300 L 147,198 Z';

// Target assembled layout positions (wireframe UI)
const ASSEMBLED = [
  { x: 180, y: 115, w: 240, h: 28, label: 'header' },    // Block A - header bar
  { x: 180, y: 150, w: 58, h: 130, label: 'sidebar' },    // Block B - sidebar
  { x: 245, y: 150, w: 175, h: 130, label: 'main' },      // Block C - main content
  { x: 358, y: 290, w: 62, h: 24, label: 'action' },      // Block D - action button
];

// Separated quadrant positions (after cut, before assembly)
const SEPARATED = [
  { x: 155, y: 95, w: 140, h: 95 },   // top-left
  { x: 310, y: 95, w: 140, h: 95 },   // top-right
  { x: 155, y: 210, w: 140, h: 95 },  // bottom-left
  { x: 310, y: 210, w: 140, h: 95 },  // bottom-right
];

export const BrutalistAssembly = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: Raw Material Entry (0-20) ---
  const entryScale = spring({ frame, fps, config: { damping: 8, stiffness: 200 } });
  const rawBlockOpacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });
  const rawBlockVisible = frame < 55;

  // Status dot blink
  const dotOpacity = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.3));
  const dotColor = frame > 98 ? '#7A8C70' : '#CC5833';

  // --- Phase 2: Laser Cut (20-50) ---
  // Vertical cut (frames 20-35)
  const laserVY = interpolate(frame, [20, 35], [90, 310], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const laserVVisible = frame >= 20 && frame <= 38;

  // Horizontal cut (frames 35-50)
  const laserHX = interpolate(frame, [35, 50], [145, 460], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const laserHVisible = frame >= 35 && frame <= 53;

  // Spark particles at intersection (~frame 35)
  const sparkActive = frame >= 34 && frame <= 46;
  const sparkElapsed = frame - 34;

  // --- Phase 3: Separation (50-75) ---
  const quadrants = SEPARATED.map((sep, i) => {
    const sepProgress = spring({
      frame: frame - (50 + i * 3),
      fps,
      config: { damping: 12, stiffness: 150 },
    });

    // Separation offsets
    const offsetX = (i % 2 === 0 ? -12 : 12) * sepProgress;
    const offsetY = (i < 2 ? -12 : 12) * sepProgress;

    // Assembly (Phase 4: 75-105)
    const assembleProgress = spring({
      frame: frame - (78 + i * 5),
      fps,
      config: { damping: 10, stiffness: 100 },
    });

    const target = ASSEMBLED[i];

    // Interpolate from separated+offset to assembled
    const currentX = interpolate(assembleProgress, [0, 1], [sep.x + offsetX, target.x]);
    const currentY = interpolate(assembleProgress, [0, 1], [sep.y + offsetY, target.y]);
    const currentW = interpolate(assembleProgress, [0, 1], [sep.w, target.w]);
    const currentH = interpolate(assembleProgress, [0, 1], [sep.h, target.h]);

    return { x: currentX, y: currentY, w: currentW, h: currentH, sepProgress, assembleProgress, label: target.label };
  });

  const showQuadrants = frame >= 48;

  // --- Phase 4: Lock-in stroke pulse ---
  const lockPulse = interpolate(frame, [95, 100, 105], [1, 2.5, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // --- Phase 5: Annotations (105-120) ---
  const annotOpacity = interpolate(frame, [105, 115], [0, 0.5], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const annotDashOffset = interpolate(frame, [105, 115], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Global fade for loop
  const globalOpacity = interpolate(frame, [116, 120], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', opacity: globalOpacity }}>
      <svg width="100%" height="100%" viewBox="0 0 600 400" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="laserGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Status dot */}
        <circle cx={530} cy={50} r={4} fill={dotColor} opacity={dotOpacity} />
        <text x={505} y={54} fontSize={8} fontFamily="monospace" fill={dotColor} opacity={dotOpacity * 0.7} textAnchor="end">
          {frame > 98 ? 'LIVE' : 'BUILD'}
        </text>

        {/* Raw material block */}
        {rawBlockVisible && (
          <g style={{ transform: `scale(${entryScale})`, transformOrigin: '300px 200px' }} opacity={rawBlockOpacity}>
            <path d={RAW_PATH} fill="currentColor" fillOpacity={0.04} stroke="currentColor" strokeWidth={1.5} />
          </g>
        )}

        {/* Vertical laser cut */}
        {laserVVisible && (
          <line
            x1={300} y1={90} x2={300} y2={laserVY}
            stroke="#CC5833" strokeWidth={1.5} filter="url(#laserGlow)"
          />
        )}

        {/* Horizontal laser cut */}
        {laserHVisible && (
          <line
            x1={145} y1={200} x2={laserHX} y2={200}
            stroke="#CC5833" strokeWidth={1.5} filter="url(#laserGlow)"
          />
        )}

        {/* Spark particles */}
        {sparkActive && [0, 1, 2, 3].map((si) => {
          const angle = (si * 90 + 45) * (Math.PI / 180);
          const dist = interpolate(sparkElapsed, [0, 12], [0, 18 + si * 4], { extrapolateRight: 'clamp' });
          const sparkOp = interpolate(sparkElapsed, [0, 12], [0.9, 0], { extrapolateRight: 'clamp' });
          return (
            <circle
              key={`spark-${si}`}
              cx={300 + Math.cos(angle) * dist}
              cy={200 + Math.sin(angle) * dist}
              r={1.5} fill="#CC5833" opacity={sparkOp}
            />
          );
        })}

        {/* Quadrant blocks */}
        {showQuadrants && quadrants.map((q, i) => (
          <rect
            key={`quad-${i}`}
            x={q.x} y={q.y} width={q.w} height={q.h}
            fill="currentColor"
            fillOpacity={i === 3 ? 0.15 : 0.06}
            stroke={q.assembleProgress > 0.9 ? (i === 3 ? '#7A8C70' : 'currentColor') : 'currentColor'}
            strokeWidth={q.assembleProgress > 0.9 ? lockPulse : 1}
            opacity={0.8}
          />
        ))}

        {/* Assembly arms (briefly visible 78-98) */}
        {frame >= 78 && frame <= 98 && (() => {
          const armProgress = interpolate(frame, [78, 86, 92, 98], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          return (
            <g opacity={armProgress * 0.4}>
              <polyline points="110,200 168,200 168,165" fill="none" stroke="currentColor" strokeWidth={1.5} />
              <polyline points="490,200 432,200 432,235" fill="none" stroke="currentColor" strokeWidth={1.5} />
            </g>
          );
        })()}

        {/* Dimension annotations */}
        {frame > 105 && (
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
