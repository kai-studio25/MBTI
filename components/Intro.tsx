import React, { useState } from 'react';

interface IntroProps {
  onStart: (name: string) => void;
  onLibrary: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart, onLibrary }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleStart = () => {
    if (name.trim().length === 0) {
      setError(true);
      return;
    }
    onStart(name);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in relative overflow-hidden bg-[#fafafa]">
       {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-pink-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full glass-panel p-8 md:p-10 rounded-[2.5rem] relative z-10 border border-white/60 shadow-xl backdrop-blur-xl">
        <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full mb-6 tracking-widest uppercase">
          AI Based Analysis
        </div>
        
        <h1 className="text-6xl font-black mb-2 leading-none tracking-tighter text-slate-900">
          MBTI
        </h1>
        <p className="text-xl font-bold text-slate-500 mb-8 tracking-tight">
          나만의 성격 유형 ID 카드 만들기
        </p>

        <div className="relative w-40 h-40 mx-auto mb-8">
           <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full animate-spin-slow opacity-20 blur-xl"></div>
           <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center text-6xl shadow-inner border border-slate-100">
             🔮
           </div>
           {/* Floating emojis */}
           <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
           <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce animation-delay-2000">🧩</div>
        </div>
        
        <p className="text-slate-600 mb-8 leading-relaxed font-medium text-sm">
          "나는 왜 이럴까?"<br/>
          24개의 질문으로 알아보는 나의 <span className="text-indigo-600 font-bold">팩트 폭격</span> 성격 분석.<br/>
          지금 바로 확인해보세요!
        </p>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="이름/닉네임을 입력하세요" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if(e.target.value.trim().length > 0) setError(false);
              }}
              className={`w-full py-4 px-6 rounded-2xl bg-white border-2 text-center text-lg font-bold outline-none transition-all placeholder:text-slate-300 ${error ? 'border-red-400 shake' : 'border-slate-100 focus:border-indigo-400'}`}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            {error && <p className="text-red-500 text-xs font-bold mt-1 absolute -bottom-6 w-full">이름을 입력해주세요!</p>}
          </div>

          <button 
            onClick={handleStart}
            className="group relative w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-indigo-300/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 overflow-hidden text-white bg-slate-900 mt-2"
          >
            <span className="relative flex items-center justify-center gap-2">
              테스트 시작하기
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>

          <button 
            onClick={onLibrary}
            className="w-full py-4 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl font-bold transition-all duration-200 shadow-sm hover:shadow-md text-sm"
          >
            유형 도감 구경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;