
import React, { useRef, useState } from 'react';
import { MBTIResult, Dimension } from '../types';

interface ResultProps {
  result: MBTIResult;
  scores: Record<Dimension, number>;
  userName: string;
  onRetry: () => void;
  onLibrary: () => void;
}

const Result: React.FC<ResultProps> = ({ result, scores, userName, onRetry, onLibrary }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [isSavingReport, setIsSavingReport] = useState(false);

  const calculatePercentage = (val1: number, val2: number) => {
    const total = val1 + val2;
    if (total === 0) return 50;
    return Math.round((val1 / total) * 100);
  };

  const currentDate = new Date().toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' });

  const traits = [
    { left: 'E', right: 'I', lScore: scores.E, rScore: scores.I, color: 'bg-red-400' },
    { left: 'S', right: 'N', lScore: scores.S, rScore: scores.N, color: 'bg-yellow-400' },
    { left: 'T', right: 'F', lScore: scores.T, rScore: scores.F, color: 'bg-green-400' },
    { left: 'J', right: 'P', lScore: scores.J, rScore: scores.P, color: 'bg-blue-400' },
  ];

  const handleSaveImage = async (ref: React.RefObject<HTMLDivElement>, filename: string, setLoading: (b: boolean) => void) => {
    if (!ref.current) return;
    setLoading(true);

    try {
      const html2canvas = (window as any).html2canvas;
      if (html2canvas) {
        const canvas = await html2canvas(ref.current, {
          backgroundColor: null,
          scale: 3, // Higher scale for better clarity
          useCORS: true,
          logging: false,
          allowTaint: true,
          // onclone helps fix text spacing/layout issues during capture
          onclone: (clonedDoc: Document) => {
            const element = clonedDoc.getElementById('capture-target');
            if (element) {
                // Force specific rendering for consistency
                element.style.fontFeatureSettings = '"calt" 0'; 
                element.style.textRendering = 'geometricPrecision'; 
                
                // Reset letter spacing for cloned element
                const nodes = element.querySelectorAll('*');
                nodes.forEach((node: any) => {
                    if (node.style) {
                        node.style.letterSpacing = 'normal';
                        node.style.fontVariantLigatures = 'none';
                    }
                });
                element.style.letterSpacing = 'normal';

                // Fix gradient text
                const gradientTexts = element.querySelectorAll('.gradient-text');
                gradientTexts.forEach((el: any) => {
                    el.style.background = 'none';
                    el.style.webkitTextFillColor = 'initial';
                    el.style.color = '#1e293b'; 
                });
            }
          }
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = filename;
        link.click();
      } else {
        alert("이미지 저장 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Save failed", error);
      alert("이미지 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-6 max-w-3xl mx-auto animate-fade-in-up">
      
      {/* 1. Main ID Card (Shareable Area) */}
      <div className="flex justify-center mb-8">
        <div 
          ref={resultRef} 
          id="capture-target"
          className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500"
          style={{ background: result.color || '#e2e8f0' }}
        >
          {/* Glass Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 backdrop-blur-[2px] z-0"></div>
          
          {/* Card Content */}
          <div className="relative z-10 h-full flex flex-col p-6 text-slate-800">
             {/* Header */}
             <div className="flex justify-between items-center mb-4 border-b border-black/10 pb-3">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">NAME</span>
                    <span className="text-lg font-black tracking-tight">{userName}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">DATE</span>
                    <span className="text-sm font-bold tracking-tight">{currentDate}</span>
                </div>
             </div>

             {/* Type Title */}
             <div className="flex items-center justify-between mb-4">
                 <div>
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 drop-shadow-sm leading-none" style={{fontFamily: 'system-ui'}}>
                      {result.type}
                    </h1>
                    <h2 className="text-xl font-bold leading-tight break-keep mt-1">
                      {result.title}
                    </h2>
                 </div>
                 <div className="text-6xl drop-shadow-md filter animate-pulse-slow">{result.emoji}</div>
             </div>
             
             <p className="text-xs font-bold opacity-80 italic mb-4">
                  "{result.subTitle}"
             </p>

             {/* Hashtags (Stickers) */}
             <div className="flex flex-wrap gap-2 mb-4">
               {result.traits.slice(0,4).map((t, i) => (
                 <span key={i} className="px-2 py-1 bg-white/60 border border-white/40 backdrop-blur-sm rounded-md text-[10px] font-bold shadow-sm">
                   {t}
                 </span>
               ))}
             </div>

             {/* Stats/Graph Visual - Compact Version */}
             <div className="bg-white/40 backdrop-blur-md rounded-xl p-2 border border-white/50 mb-4">
                <div className="space-y-1">
                  {traits.map((t, i) => {
                    const pct = calculatePercentage(t.lScore, t.rScore);
                    return (
                      <div key={i} className="flex items-center gap-1 text-[9px] font-bold">
                        <span className="w-3 text-center opacity-70">{t.left}</span>
                        <div className="flex-1 h-1 bg-white/50 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${t.color}`} style={{width: `${pct}%`}}></div>
                        </div>
                        <span className="w-3 text-center opacity-70">{t.right}</span>
                      </div>
                    )
                  })}
                </div>
             </div>

             {/* Fact Violence Summary */}
             <div className="bg-black/5 rounded-xl p-4 mb-4 border border-black/5">
                <div className="flex items-center gap-1 mb-2 opacity-60">
                    <span className="text-xs">💬</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Fact Check</span>
                </div>
                <p className="text-[11px] font-medium leading-relaxed break-keep text-justify">
                    {/* Fallback to description slice if cardSummary is empty, but slice longer to ~300 chars */}
                    {result.cardSummary || result.description.slice(0, 300) + (result.description.length > 300 ? "..." : "")}
                </p>
             </div>

             {/* Chemistry Footer */}
             <div className="grid grid-cols-2 gap-2 mt-auto">
                 <div className="bg-indigo-500/10 rounded-lg p-2 text-center border border-indigo-500/10">
                     <div className="text-[9px] font-bold uppercase text-indigo-800 opacity-60">Best Chemistry</div>
                     <div className="text-lg font-black text-indigo-700">{result.bestMatch.type}</div>
                 </div>
                 <div className="bg-slate-900/10 rounded-lg p-2 text-center border border-slate-900/10">
                     <div className="text-[9px] font-bold uppercase text-slate-800 opacity-60">Worst Clash</div>
                     <div className="text-lg font-black text-slate-700">{result.worstMatch.type}</div>
                 </div>
             </div>

             {/* Footer Branding */}
             <div className="mt-3 text-center">
               <p className="text-[8px] font-bold opacity-30 uppercase tracking-[0.2em]">MBTI Personal Analysis ID</p>
             </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* 2. Detailed Report Container (Capturable) */}
      <div 
        ref={detailRef}
        className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-white/60 text-slate-800 space-y-6"
      >
        <div className="flex flex-col items-center opacity-60 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500">MBTI Analysis Report</span>
        </div>

        {/* Description */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
           <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
             <span className="text-2xl">🧐</span> 
             팩트 폭격 심층 분석
           </h3>
           <p className="text-slate-700 leading-relaxed font-medium text-lg whitespace-pre-wrap">
             {result.description}
           </p>
        </div>

        {/* Good & Bad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <h4 className="text-blue-600 font-bold mb-3 flex items-center gap-2">
                <span>👍</span> 매력 포인트
              </h4>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm font-medium text-slate-700 flex items-start">
                    <span className="mr-2 text-blue-400">•</span>{s}
                  </li>
                ))}
              </ul>
           </div>
           <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
              <h4 className="text-red-600 font-bold mb-3 flex items-center gap-2">
                <span>👎</span> 솔직히 인정하자
              </h4>
              <ul className="space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm font-medium text-slate-700 flex items-start">
                    <span className="mr-2 text-red-400">•</span>{w}
                  </li>
                ))}
              </ul>
           </div>
        </div>

        {/* Compatibility Detail */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="text-xs font-bold text-slate-400 mb-2 uppercase">Best Chemistry</div>
              <div className="text-2xl font-black text-indigo-500 mb-1">{result.bestMatch.type}</div>
              <p className="text-xs text-slate-500">{result.bestMatch.reason}</p>
           </div>
           <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="text-xs font-bold text-slate-400 mb-2 uppercase">Worst Clash</div>
              <div className="text-2xl font-black text-slate-700 mb-1">{result.worstMatch.type}</div>
              <p className="text-xs text-slate-500">{result.worstMatch.reason}</p>
           </div>
        </div>

        {/* Advice */}
        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
           <h3 className="text-lg font-bold text-indigo-800 mb-3">💌 현실 조언</h3>
           <p className="text-slate-700 text-sm leading-6 font-medium">
             {result.advice}
           </p>
        </div>

        {/* Report Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
           <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
             © 2025 SEUNGHO KANG. All rights reserved.
           </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-10 pb-10">
        <button 
          onClick={() => handleSaveImage(resultRef, `MBTI_${userName}_${result.type}_ID.png`, setIsSavingCard)}
          disabled={isSavingCard}
          className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isSavingCard ? '저장 중...' : '📸 결과 카드 저장하기'}
        </button>

        <button 
          onClick={() => handleSaveImage(detailRef, `MBTI_${userName}_${result.type}_Report.png`, setIsSavingReport)}
          disabled={isSavingReport}
          className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-xl hover:bg-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isSavingReport ? '저장 중...' : '📑 상세 리포트 저장하기'}
        </button>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button 
            onClick={onRetry}
            className="py-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
          >
            다시 하기
          </button>
          <button 
            onClick={onLibrary}
            className="py-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold hover:bg-indigo-100 transition-all"
          >
            모든 유형 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;