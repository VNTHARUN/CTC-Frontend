import React, { useEffect, useState } from 'react';
import { interviewService } from '../../../services/interviewService';
import interviewData from '../../../mock/data/interviews.json';
import { Badge } from '../../../shared/components/ui/Badge';

export const InterviewPrep: React.FC = () => {
  const [questions, setQuestions] = useState<typeof interviewData>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    interviewService.getQuestions(activeCategory).then((res) => {
      setQuestions(res.data);
    });
  }, [activeCategory]);

  const categories = ['All', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOPS'];

  const toggleExpand = (id: string) => {
    setExpandedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight font-heading">Core Computer Science Interview Questions</h1>
        <p className="text-xs text-gray-400 mt-1 font-sans">
          Frequently asked technical interview questions for DBMS, Operating Systems, Networks, and OOPS.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeCategory === cat
                ? 'bg-[#627eff]/20 text-[#627eff] border-[#627eff]/40 font-semibold'
                : 'bg-[#202225] text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions Accordion List */}
      <div className="flex flex-col gap-3.5">
        {questions.map((q) => {
          const isExpanded = expandedAnswers[q.id];
          return (
            <div
              key={q.id}
              className="bg-[#202225] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="primary">{q.category}</Badge>
                    <span className="text-[11px] font-mono font-semibold text-[#f5a623] bg-[#f5a623]/10 px-2 py-0.5 rounded border border-[#f5a623]/20">
                      Freq: {q.frequency}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-100 mt-1">{q.question}</h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <i className={`fa-solid ${isExpanded ? 'fa-chevron-up text-[#627eff]' : 'fa-chevron-down text-gray-500'} text-sm`}></i>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-white/10 flex flex-col gap-4 text-xs font-sans leading-relaxed text-gray-300">
                  <div className="whitespace-pre-line bg-[#121113] p-4 rounded-xl border border-white/10">
                    {q.answer}
                  </div>

                  {q.codeExample && (
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-gray-400 block mb-1.5">
                        Code / Implementation Example:
                      </span>
                      <pre className="p-3 bg-[#121113] border border-white/10 rounded-lg text-xs font-mono text-[#48c78e] overflow-x-auto">
                        <code>{q.codeExample}</code>
                      </pre>
                    </div>
                  )}

                  {q.companies && q.companies.length > 0 && (
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-building text-gray-500 text-xs"></i>
                      <span className="text-gray-500 font-mono text-[11px]">Asked at:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {q.companies.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] font-mono bg-[#121113] text-gray-400 border border-white/10 px-2 py-0.5 rounded"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
