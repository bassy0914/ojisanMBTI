import React from 'react';
import { SPECTRUMS, SPECTRUM_META } from '../data/questions';

export default function ProgressBar({ spectrumIndex, questionInSpectrum, confirmedResults }) {
  return (
    <div className="w-full px-4 pt-4 pb-2">
      {/* Spectrum dots */}
      <div className="flex items-center justify-between mb-2">
        {SPECTRUMS.map((s, i) => {
          const isDone = i < spectrumIndex || confirmedResults[s];
          const isActive = i === spectrumIndex;
          const meta = SPECTRUM_META[s];

          return (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  style={{
                    background: isDone
                      ? meta.color
                      : isActive
                      ? `${meta.color}33`
                      : 'rgba(255,255,255,0.05)',
                    border: isActive
                      ? `2px solid ${meta.color}`
                      : isDone
                      ? 'none'
                      : '2px solid rgba(255,255,255,0.1)',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: isActive ? `0 0 12px ${meta.color}88` : 'none',
                  }}
                >
                  {isDone ? '✓' : meta.icon}
                </div>
                <span
                  className="text-xs mt-1 font-medium"
                  style={{ color: isActive ? meta.color : isDone ? meta.color : '#4b5563' }}
                >
                  {s}
                </span>
              </div>
              {i < SPECTRUMS.length - 1 && (
                <div className="flex-1 h-0.5 mx-1" style={{ background: i < spectrumIndex ? SPECTRUM_META[SPECTRUMS[i]].color : 'rgba(255,255,255,0.1)' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Question counter */}
      <div className="text-center">
        <span className="text-xs text-gray-500">
          {SPECTRUM_META[SPECTRUMS[spectrumIndex]]?.label} — Q{questionInSpectrum + 1}
        </span>
      </div>
    </div>
  );
}
