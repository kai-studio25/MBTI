import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [text, setText] = useState("성향 분석 중...");

  useEffect(() => {
    const texts = [
      "답변 데이터 집계 중...",
      "심리학적 패턴 대조 중...",
      "AI 정밀 분석 실행 중...",
      "당신의 우주를 그리는 중..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-transparent border-r-cyan-400 border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
      </div>
      
      <h2 className="text-3xl font-black gradient-text mb-4 animate-pulse">Analyzing...</h2>
      <p className="text-slate-500 font-medium">{text}</p>
    </div>
  );
};

export default Loading;