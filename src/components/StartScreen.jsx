import React from 'react';

export default function StartScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f5a623, transparent)' }} />

      <div className="relative z-10 max-w-sm w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-ojisan-amber bg-opacity-10 border border-ojisan-amber border-opacity-30 rounded-full px-4 py-1.5 mb-6">
          <span className="text-xs font-bold text-ojisan-amber tracking-widest uppercase">OJISAN MBTI</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black leading-tight mb-3">
          <span className="gradient-text">オジサン</span>
          <br />
          <span className="text-ojisan-cream">性格診断</span>
        </h1>

        <p className="text-sm text-gray-400 mb-2 leading-relaxed">
          あなたはどんなオジサン？
          <br />
          <strong className="text-ojisan-amber">16タイプ</strong>から、今すぐ診断。
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 my-6">
          {['⚡ 最速60秒', '🤖 AI肖像画生成', '💞 相性診断'].map((f) => (
            <span key={f} className="text-xs bg-white bg-opacity-5 border border-white border-opacity-10 rounded-full px-3 py-1 text-gray-300">
              {f}
            </span>
          ))}
        </div>

        {/* Card preview stack */}
        <div className="relative w-48 h-36 mx-auto mb-8">
          {[3, 2, 1, 0].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-2xl border border-white border-opacity-10"
              style={{
                background: 'linear-gradient(135deg, #1e1830, #2d1b69)',
                transform: `rotate(${(i - 1.5) * 3}deg) translateY(${i * 3}px)`,
                zIndex: i,
              }}
            />
          ))}
          <div
            className="absolute inset-0 rounded-2xl z-10 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1e1830, #2d1b69)' }}
          >
            <span className="text-3xl mb-1">🍺</span>
            <span className="text-xs text-gray-400 font-medium">さあ、診断スタート</span>
          </div>
        </div>

        {/* Swipe hint */}
        <p className="text-xs text-gray-500 mb-4">
          ← カードを左右にスワイプして回答 →
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-lg active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #f5a623, #e8941a)',
            boxShadow: '0 0 24px rgba(245,166,35,0.4)',
          }}
        >
          診断スタート！
        </button>

        <p className="text-xs text-gray-600 mt-4">最大15問 • 適応式アルゴリズム採用</p>
      </div>
    </div>
  );
}
