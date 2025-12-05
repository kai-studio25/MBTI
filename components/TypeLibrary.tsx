import React, { useRef, useState } from 'react';
import { ALL_TYPES_INFO } from '../constants';

interface TypeLibraryProps {
  onBack: () => void;
}

const TypeLibrary: React.FC<TypeLibraryProps> = ({ onBack }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const libraryRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const activeTypeInfo = selectedType ? ALL_TYPES_INFO.find(t => t.code === selectedType) : null;

  const handleSaveLibrary = async () => {
    if (!libraryRef.current || isSaving) return;
    setIsSaving(true);

    try {
      const html2canvas = (window as any).html2canvas;
      if (html2canvas) {
        const canvas = await html2canvas(libraryRef.current, {
          backgroundColor: '#f8fafc', // Light slate background
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `MBTI_Collection_Map.png`;
        link.click();
      }
    } catch (error) {
      console.error("Save failed", error);
      alert("이미지 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-6 px-3 md:py-8 md:px-4 bg-slate-50 animate-fade-in flex flex-col items-center">
      {/* Header / Controls */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 md:px-4 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm md:text-base"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          뒤로가기
        </button>
        
        <button 
          onClick={handleSaveLibrary}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 md:px-6 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all font-bold disabled:opacity-50 text-sm md:text-base"
        >
          {isSaving ? '저장 중...' : '📸 도감 저장'}
        </button>
      </div>

      {/* Capture Area */}
      <div className="w-full flex justify-center pb-10">
        <div 
          ref={libraryRef}
          className="w-full max-w-6xl bg-slate-50 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem]"
        >
          {/* Poster Header */}
          <div className="text-center mb-6 md:mb-10 mt-2 md:mt-4">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">MBTI UNIVERSE</h1>
            <p className="text-slate-500 font-medium text-sm md:text-lg">16가지 성격 유형 완벽 분석 도감</p>
          </div>

          {/* The Grid: 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {ALL_TYPES_INFO.map((info) => (
              <div 
                key={info.code}
                onClick={() => setSelectedType(info.code)}
                className="cursor-pointer group relative bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-40 md:h-48 justify-between overflow-hidden"
              >
                {/* Background Decoration */}
                <div className={`absolute -top-10 -right-10 w-20 h-20 md:w-24 md:h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500`} style={{backgroundColor: info.color}}></div>

                <div className="flex justify-between items-start z-10">
                  <span className="text-lg md:text-2xl font-black text-slate-800 tracking-tighter group-hover:text-indigo-600 transition-colors">
                    {info.code}
                  </span>
                  <span className="text-xl md:text-2xl filter drop-shadow-sm transform group-hover:rotate-12 transition-transform duration-300">
                    {info.emoji}
                  </span>
                </div>
                
                <div className="z-10 mt-1 md:mt-0">
                  <h3 className="font-bold text-xs md:text-sm text-slate-800 mb-1 leading-tight break-keep">
                    {info.title}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {info.summary}
                  </p>
                </div>

                <div className="flex gap-1 mt-2 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                   {info.tags.slice(0, 2).map((tag, i) => (
                     <span key={i} className="text-[8px] md:text-[9px] px-1.5 py-0.5 bg-slate-100 rounded-md text-slate-500 font-medium truncate max-w-[48%]">
                       {tag}
                     </span>
                   ))}
                </div>
                
                {/* Hover Overlay Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-400 rounded-2xl transition-colors pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12 mb-2 md:mb-4">
             <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wide">© 2025 SEUNGHO KANG. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {activeTypeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in" onClick={() => setSelectedType(null)}>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] max-w-lg w-full shadow-2xl relative border border-white/50 animate-bounce-in" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedType(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-inner bg-slate-50">
                    {activeTypeInfo.emoji}
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-black gradient-text">{activeTypeInfo.code}</h2>
                    <h3 className="text-base md:text-lg font-bold text-slate-700">{activeTypeInfo.title}</h3>
                </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-4 md:p-5 mb-6 border border-slate-100">
                <p className="text-slate-600 leading-relaxed text-sm font-medium">
                "{activeTypeInfo.summary}"
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeTypeInfo.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-white border border-indigo-100 text-indigo-600 text-xs font-bold shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="w-full pt-4 border-t border-slate-100">
              <button 
                onClick={() => setSelectedType(null)}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeLibrary;