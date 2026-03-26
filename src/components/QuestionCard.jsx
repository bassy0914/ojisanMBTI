import React, { useState, useRef, useCallback } from 'react';
import { SPECTRUM_META } from '../data/questions';

const SWIPE_THRESHOLD = 90;

export default function QuestionCard({ question, spectrum, onAnswer }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [leavingDir, setLeavingDir] = useState(null); // 'A' | 'B'
  const startPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const meta = SPECTRUM_META[spectrum];

  const handlePointerDown = useCallback((clientX, clientY) => {
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  }, []);

  const handlePointerMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return;
      setOffset({
        x: clientX - startPos.current.x,
        y: (clientY - startPos.current.y) * 0.3,
      });
    },
    [isDragging]
  );

  const triggerAnswer = useCallback(
    (answer) => {
      if (leavingDir) return;
      setLeavingDir(answer);
      setTimeout(() => {
        setOffset({ x: 0, y: 0 });
        setLeavingDir(null);
        onAnswer(answer);
      }, 380);
    },
    [leavingDir, onAnswer]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (offset.x > SWIPE_THRESHOLD) {
      triggerAnswer('A');
    } else if (offset.x < -SWIPE_THRESHOLD) {
      triggerAnswer('B');
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [isDragging, offset.x, triggerAnswer]);

  // Mouse events
  const onMouseDown = (e) => handlePointerDown(e.clientX, e.clientY);
  const onMouseMove = (e) => { if (isDragging) handlePointerMove(e.clientX, e.clientY); };
  const onMouseUp = () => handlePointerUp();

  // Touch events
  const onTouchStart = (e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e) => { e.preventDefault(); handlePointerMove(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchEnd = () => handlePointerUp();

  const rotation = offset.x * 0.07;
  const aOpacity = Math.min(1, Math.max(0, offset.x / SWIPE_THRESHOLD));
  const bOpacity = Math.min(1, Math.max(0, -offset.x / SWIPE_THRESHOLD));

  let leaveStyle = {};
  if (leavingDir === 'A') {
    leaveStyle = { transform: 'translate(120%, -20px) rotate(25deg)', opacity: 0, transition: 'transform 0.38s ease-in, opacity 0.38s ease-in' };
  } else if (leavingDir === 'B') {
    leaveStyle = { transform: 'translate(-120%, -20px) rotate(-25deg)', opacity: 0, transition: 'transform 0.38s ease-in, opacity 0.38s ease-in' };
  }

  const dragStyle = !leavingDir
    ? {
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }
    : leaveStyle;

  if (!question) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
      {/* Card */}
      <div
        ref={cardRef}
        className="swipe-card relative w-full max-w-sm"
        style={{ ...dragStyle }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Swipe A indicator */}
        <div
          className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-white text-sm font-black border-2 border-white border-opacity-30"
          style={{
            background: 'linear-gradient(135deg, #5acea0, #2ecc71)',
            opacity: aOpacity,
            transform: `scale(${0.8 + aOpacity * 0.2})`,
          }}
        >
          A ✓
        </div>

        {/* Swipe B indicator */}
        <div
          className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-white text-sm font-black border-2 border-white border-opacity-30"
          style={{
            background: 'linear-gradient(135deg, #e05a5a, #e74c3c)',
            opacity: bOpacity,
            transform: `scale(${0.8 + bOpacity * 0.2})`,
          }}
        >
          B ✓
        </div>

        {/* Card body */}
        <div
          className="rounded-3xl p-6 select-none"
          style={{
            background: 'linear-gradient(135deg, #1e1830 0%, #2d1b50 100%)',
            border: `1.5px solid ${meta.color}44`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${meta.color}22`,
            minHeight: '260px',
          }}
        >
          {/* Spectrum tag */}
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold mb-4"
            style={{ background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}44` }}
          >
            <span>{meta.icon}</span>
            <span>{meta.label}</span>
          </div>

          {/* Question text */}
          <p className="text-ojisan-cream text-xl font-bold leading-snug mb-6" style={{ lineHeight: '1.55' }}>
            {question.text}
          </p>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}55, transparent)` }} />

          {/* Swipe hint */}
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>← B を選ぶ</span>
            <span>A を選ぶ →</span>
          </div>
        </div>
      </div>

      {/* Option buttons */}
      <div className="w-full max-w-sm mt-4 flex flex-col gap-3">
        <button
          onClick={() => triggerAnswer('A')}
          disabled={!!leavingDir}
          className="w-full text-left py-4 px-5 rounded-2xl text-sm font-medium leading-snug active:scale-98 transition-all"
          style={{
            background: 'rgba(90,206,160,0.08)',
            border: '1.5px solid rgba(90,206,160,0.3)',
            color: '#e2fef5',
          }}
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black mr-2 flex-shrink-0"
            style={{ background: 'rgba(90,206,160,0.25)', color: '#5acea0' }}>A</span>
          {question.optionA.text}
        </button>

        <button
          onClick={() => triggerAnswer('B')}
          disabled={!!leavingDir}
          className="w-full text-left py-4 px-5 rounded-2xl text-sm font-medium leading-snug active:scale-98 transition-all"
          style={{
            background: 'rgba(224,90,90,0.08)',
            border: '1.5px solid rgba(224,90,90,0.3)',
            color: '#fee2e2',
          }}
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black mr-2 flex-shrink-0"
            style={{ background: 'rgba(224,90,90,0.25)', color: '#e05a5a' }}>B</span>
          {question.optionB.text}
        </button>
      </div>
    </div>
  );
}
