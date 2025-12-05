import React, { useState } from 'react';
import { Question, Dimension } from '../types';

interface TestProps {
  questions: Question[];
  onComplete: (scores: Record<Dimension, number>) => void;
}

const Test: React.FC<TestProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<Dimension, number>>({
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (type: Dimension) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnimating(false);
      } else {
        onComplete(newScores);
      }
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-2xl mx-auto relative">
      {/* Background blobs for mobile feeling */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto mb-10 px-2">
        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
          <span>Question {currentQuestionIndex + 1}</span>
          <span>{questions.length}</span>
        </div>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner border border-slate-100">
          <div 
            className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className={`w-full transition-all duration-300 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-500 rounded-full text-xs font-bold mb-4 border border-indigo-100">
                {question.category === 'EI' ? 'Energy Flow' : 
                 question.category === 'SN' ? 'Information' :
                 question.category === 'TF' ? 'Decision Making' : 'Lifestyle'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug break-keep">
            {question.text}
            </h2>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleAnswer(question.options.A.type)}
            className="group relative p-6 bg-white/80 hover:bg-white border-2 border-white hover:border-indigo-400 rounded-2xl text-left shadow-lg hover:shadow-indigo-200/50 transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-center">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center mr-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">A</span>
                <span className="text-lg text-slate-700 font-medium group-hover:text-slate-900">{question.options.A.text}</span>
            </div>
          </button>

          <button
            onClick={() => handleAnswer(question.options.B.type)}
            className="group relative p-6 bg-white/80 hover:bg-white border-2 border-white hover:border-cyan-400 rounded-2xl text-left shadow-lg hover:shadow-cyan-200/50 transition-all duration-200 active:scale-[0.98]"
          >
             <div className="flex items-center">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 font-bold flex items-center justify-center mr-4 group-hover:bg-cyan-500 group-hover:text-white transition-colors">B</span>
                <span className="text-lg text-slate-700 font-medium group-hover:text-slate-900">{question.options.B.text}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;