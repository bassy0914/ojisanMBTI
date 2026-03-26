import React, { useEffect, useState } from 'react';
import { mbtiTypes } from '../data/mbtiTypes';
import { getCompatibility } from '../data/compatibility';
import { generateOjisanImage } from '../services/geminiService';

const ERROR_MESSAGES = {
  NO_API_KEY: 'APIキーが設定されていません。\n.env ファイルに VITE_GEMINI_API_KEY を設定してください。',
  API_UNAUTHORIZED: 'APIキーが無効です。Google AI Studio で確認してください。',
  API_QUOTA: 'APIの利用上限に達しました。しばらくしてから再試行してください。',
  API_BAD_REQUEST: 'APIリクエストエラー。モデルが利用可能か確認してください。',
  NO_PREDICTION: '画像データが取得できませんでした。',
};

function TypeBadge({ type, label }) {
  const data = mbtiTypes[type];
  return (
    <div
      className="flex items-center gap-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl px-3 py-2"
    >
      <span className="text-base">{data?.emoji || '👤'}</span>
      <div>
        <div className="text-xs font-black" style={{ color: data?.color || '#aaa' }}>{type}</div>
        <div className="text-xs text-gray-400 leading-tight">{data?.name || ''}</div>
      </div>
    </div>
  );
}

export default function ResultScreen({ finalType, onReset }) {
  const [imageState, setImageState] = useState('loading'); // 'loading' | 'done' | 'error'
  const [imageSrc, setImageSrc] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const baseType = finalType.split('-')[0];
  const variant = finalType.split('-')[1]; // 'A' or 'T'
  const typeData = mbtiTypes[baseType];
  const compat = getCompatibility(finalType);

  useEffect(() => {
    let cancelled = false;
    setImageState('loading');

    generateOjisanImage(finalType)
      .then((src) => {
        if (!cancelled) {
          setImageSrc(src);
          setImageState('done');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          const key = err.message?.split(':')[0];
          setErrorMsg(ERROR_MESSAGES[key] || `画像生成に失敗しました\n(${err.message})`);
          setImageState('error');
        }
      });

    return () => { cancelled = true; };
  }, [finalType]);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-ojisan-amber bg-opacity-10 border border-ojisan-amber border-opacity-30 rounded-full px-4 py-1.5 mb-3">
            <span className="text-xs font-bold text-ojisan-amber tracking-widest">RESULT</span>
          </div>
          <h2 className="text-lg font-bold text-gray-300 mb-1">あなたのタイプは…</h2>
          <div className="gradient-text text-4xl font-black tracking-wider">{finalType}</div>
        </div>

        {/* AI Image */}
        <div
          className="result-image-container rounded-3xl overflow-hidden mb-6 aspect-square relative"
          style={{ boxShadow: `0 0 40px ${typeData?.color || '#f5a623'}44` }}
        >
          {imageState === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center shimmer">
              <div className="text-4xl mb-3 animate-bounce">{typeData?.emoji || '🎴'}</div>
              <p className="text-sm text-gray-400 font-medium">AI で肖像画を生成中…</p>
              <p className="text-xs text-gray-600 mt-1">Gemini Imagen 3</p>
            </div>
          )}

          {imageState === 'done' && imageSrc && (
            <img
              src={imageSrc}
              alt={`${finalType} ojisan portrait`}
              className="w-full h-full object-cover animate-fade-in"
            />
          )}

          {imageState === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              style={{ background: 'linear-gradient(135deg, #1e1830, #2d1b69)' }}>
              <div className="text-5xl mb-4">{typeData?.emoji || '👤'}</div>
              <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed">{errorMsg}</p>
            </div>
          )}

          {/* Type overlay badge */}
          <div className="absolute bottom-3 left-3 right-3">
            <div
              className="rounded-2xl px-4 py-2 backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.65)', border: `1px solid ${typeData?.color || '#f5a623'}44` }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{typeData?.emoji}</span>
                <div>
                  <div className="font-black text-white text-sm">{typeData?.nickname}</div>
                  <div className="text-xs" style={{ color: typeData?.color }}>{typeData?.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showDetails && (
          <>
            {/* Variant */}
            <div
              className="rounded-2xl p-4 mb-4 animate-fade-in"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                {variant === 'A' ? '🛡️ 自己確信型 (Assertive)' : '🌊 慎重型 (Turbulent)'}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {variant === 'A' ? typeData?.variantA : typeData?.variantT}
              </p>
            </div>

            {/* Description */}
            <div
              className="rounded-2xl p-4 mb-4 animate-fade-in"
              style={{ background: `${typeData?.color}0f`, border: `1px solid ${typeData?.color}33` }}
            >
              <p className="text-xs font-bold mb-2" style={{ color: typeData?.color }}>キャラクター概要</p>
              <p className="text-sm text-gray-200 leading-relaxed">{typeData?.description}</p>
            </div>

            {/* Compatibility */}
            <div
              className="rounded-2xl p-4 mb-4 animate-fade-in"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">💞 相性診断</p>

              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs">💚</span>
                  <span className="text-xs font-bold text-green-400">ベストマッチ</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {compat.good.map((t) => (
                    <TypeBadge key={t} type={t} />
                  ))}
                </div>
              </div>

              <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs">⚠️</span>
                  <span className="text-xs font-bold text-red-400">要注意タイプ</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {compat.bad.map((t) => (
                    <TypeBadge key={t} type={t} />
                  ))}
                </div>
              </div>
            </div>

            {/* Retry button */}
            <button
              onClick={onReset}
              className="w-full py-4 rounded-2xl font-bold text-base active:scale-95 transition-transform animate-fade-in"
              style={{
                background: 'rgba(245,166,35,0.1)',
                border: '2px solid rgba(245,166,35,0.4)',
                color: '#f5a623',
              }}
            >
              もう一度診断する
            </button>

            <p className="text-center text-xs text-gray-600 mt-4 mb-8">
              Powered by Gemini Imagen 3
            </p>
          </>
        )}
      </div>
    </div>
  );
}
