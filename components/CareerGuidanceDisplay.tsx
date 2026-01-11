import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CareerGuidanceDisplayProps {
  guidance: string;
  onReset: () => void;
}

const CareerGuidanceDisplay: React.FC<CareerGuidanceDisplayProps> = ({ guidance, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 animate-fade-in">
      {/* Main Report Card */}
      <div className="bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden">
        
        {/* Professional Header Accent */}
        <div className="h-2 bg-indigo-600 w-full"></div>

        <div className="p-8 sm:p-12">
          {/* Header Branding */}
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-3xl font-bold text-slate-900">Career Strategy Report</h1>
            <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-semibold">
              Prepared by AI Career Mentor
            </p>
          </div>

          {/* Markdown Content Area */}
          {/* The 'prose' class is what makes headers, lists, and tables look professional */}
          <article className="prose prose-slate lg:prose-lg max-w-none 
            prose-headings:text-slate-900 prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b
            prose-table:border prose-table:rounded-xl prose-table:shadow-sm
            prose-th:bg-slate-50 prose-th:text-indigo-600 prose-th:py-3
            prose-td:py-3
            prose-blockquote:bg-indigo-50 prose-blockquote:text-slate-700 prose-blockquote:border-l-indigo-500 prose-blockquote:italic
            prose-li:marker:text-indigo-600">
            
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {guidance}
            </ReactMarkdown>
          </article>

          {/* Action Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-8 py-3 border border-slate-300 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              Save as PDF
            </button>
            
            <button
              onClick={onReset}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transform transition hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200"
            >
              Generate New Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-center text-slate-400 text-xs mt-6 italic">
        This document is an AI-generated career guide based on provided profile data.
      </p>
    </div>
  );
};

export default CareerGuidanceDisplay;