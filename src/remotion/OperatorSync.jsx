import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

// Generate waveform SVG path
const generateWave = (startX, endX, y, frame, speed, amplitude, isSquare = false) => {
  let d = `M ${startX},${y}`;
  for (let x = startX; x <= endX; x += 3) {
    const val = Math.sin((x + frame * speed) * 0.08);
    const wave = isSquare ? Math.sign(val) * amplitude : val * amplitude;
    d += ` L ${x},${y + wave}`;
  }
  return d;
};

export const OperatorSync = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: Two Worlds (0-30) ---
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  // Machine rotation (constant)
  const machineRotation = interpolate(frame, [0, 150], [0, 360]);
  const machineInnerRotation = interpolate(frame, [0, 150], [360, 0]);

  // Human breathing effect
  const breathe = Math.sin(frame * 0.08) * 3;

  // Labels
  const labelOpacity = interpolate(frame, [8, 18], [0, 0.4], { extrapolateRight: 'clamp' });

  // --- Phase 2: Reaching Out (30-60) ---
  const machineConnectorEnd = interpolate(frame, [30, 55], [140, 195], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const humanConnectorEnd = interpolate(frame, [35, 58], [260, 205], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const connectorOpacity = interpolate(frame, [30, 40], [0, 0.6], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // --- Phase 3: Synchronization (60-105) ---
  const machineSpeed = interpolate(frame, [60, 100], [2.2, 1.3], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const humanSpeed = interpolate(frame, [60, 100], [1.4, 1.3], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const waveAmplitude = interpolate(frame, [60, 95], [8, 5], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  // Square wave softens over time (blend factor)
  const squareness = interpolate(frame, [60, 95], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Sync node at center
  const syncNodeR = spring({
    frame: frame - 92,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // --- Phase 4: Handover (105-135) ---
  const centerFillOpacity = interpolate(frame, [105, 115], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Ring pulse
  const ringActive = frame >= 105 && frame <= 122;
  const ringR = interpolate(frame, [105, 122], [8, 45], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringOpacity = interpolate(frame, [105, 122], [0.7, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Color propagation (green flows outward)
  const colorProgress = interpolate(frame, [112, 128], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const machineColor = colorProgress > 0.5 ? '#7A8C70' : 'currentColor';
  const humanColor = colorProgress > 0.6 ? '#7A8C70' : 'currentColor';

  // Sync label
  const syncLabelOpacity = interpolate(frame, [118, 128], [0, 0.6], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // --- Phase 5: Fade (135-150) ---
  const globalOpacity = interpolate(frame, [142, 149], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Wave paths
  const showWaves = frame >= 35;
  const machineWavePath = showWaves
    ? generateWave(140, 195, 200, frame, machineSpeed, waveAmplitude * squareness + waveAmplitude * (1 - squareness), false)
    : '';
  const humanWavePath = showWaves
    ? generateWave(205, 260, 200, frame, humanSpeed, waveAmplitude, false)
    : '';

  // Unified wave after sync
  const unifiedWavePath = frame > 110
    ? generateWave(110, 290, 200, frame, 1.3, 4, false)
    : '';

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', opacity: globalOpacity }}>
      <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ overflow: 'visible' }}>

        {/* === LEFT: Machine Side === */}
        <g opacity={fadeIn}>
          {/* Outer ring */}
          <circle
            cx={100} cy={200} r={55}
            fill="none" stroke={machineColor} strokeWidth={1}
            strokeDasharray="8 4"
            style={{ transform: `rotate(${machineRotation}deg)`, transformOrigin: '100px 200px' }}
          />
          {/* Inner ring (counter-rotate) */}
          <circle
            cx={100} cy={200} r={32}
            fill="none" stroke={machineColor} strokeWidth={0.5}
            strokeDasharray="3 3"
            opacity={0.5}
            style={{ transform: `rotate(${machineInnerRotation}deg)`, transformOrigin: '100px 200px' }}
          />
          {/* Center dot */}
          <circle cx={100} cy={200} r={4} fill="#CC5833" />
          {/* Label */}
          <text x={100} y={275} fontSize={10} fontFamily="monospace" fill={machineColor} textAnchor="middle" opacity={labelOpacity}>
            SYS
          </text>
        </g>

        {/* === RIGHT: Human Side === */}
        <g opacity={fadeIn}>
          {/* Organic breathing circle */}
          <ellipse
            cx={300} cy={200}
            rx={48 + breathe} ry={48 - breathe * 0.5}
            fill="none" stroke={humanColor} strokeWidth={1}
          />
          {/* Inner pulse */}
          <ellipse
            cx={300} cy={200}
            rx={28 + breathe * 0.6} ry={28 - breathe * 0.3}
            fill="none" stroke={humanColor} strokeWidth={0.5}
            opacity={0.4}
          />
          {/* Center dot */}
          <circle cx={300} cy={200} r={4} fill="#7A8C70" />
          {/* Label */}
          <text x={300} y={275} fontSize={10} fontFamily="monospace" fill={humanColor} textAnchor="middle" opacity={labelOpacity}>
            OPS
          </text>
        </g>

        {/* === CONNECTORS === */}
        {frame >= 30 && (
          <g opacity={connectorOpacity}>
            {/* Machine connector (dashed) */}
            <line
              x1={155} y1={200} x2={machineConnectorEnd} y2={200}
              stroke={colorProgress > 0.3 ? '#7A8C70' : 'currentColor'}
              strokeWidth={1} strokeDasharray="4 2"
            />
            {/* Human connector (solid, slightly wavy) */}
            <line
              x1={humanConnectorEnd} y1={200} x2={245} y2={200}
              stroke={colorProgress > 0.4 ? '#7A8C70' : 'currentColor'}
              strokeWidth={1}
            />
          </g>
        )}

        {/* === WAVE PULSES === */}
        {showWaves && frame < 115 && (
          <g opacity={0.5}>
            <path d={machineWavePath} fill="none" stroke="#CC5833" strokeWidth={0.8} />
            <path d={humanWavePath} fill="none" stroke="#7A8C70" strokeWidth={0.8} />
          </g>
        )}

        {/* Unified wave after handover */}
        {frame > 110 && (
          <path
            d={unifiedWavePath}
            fill="none"
            stroke="#7A8C70"
            strokeWidth={0.8}
            opacity={interpolate(frame, [110, 120], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        )}

        {/* === CENTER SYNC NODE === */}
        {syncNodeR > 0 && (
          <>
            <circle
              cx={200} cy={200} r={syncNodeR * 8}
              fill={centerFillOpacity > 0 ? '#CC5833' : 'none'}
              fillOpacity={centerFillOpacity}
              stroke="#CC5833" strokeWidth={1.5}
            />
            {/* Pulse ring */}
            {ringActive && (
              <circle cx={200} cy={200} r={ringR} fill="none" stroke="#CC5833" strokeWidth={1} opacity={ringOpacity} />
            )}
          </>
        )}

        {/* SYNC label */}
        {syncLabelOpacity > 0 && (
          <text x={200} y={172} fontSize={9} fontFamily="monospace" fill="#7A8C70" textAnchor="middle" opacity={syncLabelOpacity}>
            SYNC
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};
