import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchProblems, toggleSolveProblem } from '../redux/problemSlice';
import { toggleBookmarkItem, fetchBookmarks } from '../../bookmarks/redux/bookmarkSlice';
import { openAuthModal } from '../../auth/redux/authSlice';
import { toast } from 'react-hot-toast';

export const ProblemList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { problems, loading } = useAppSelector((state) => state.problems);
  const { bookmarks } = useAppSelector((state) => state.bookmarks);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [expandedModuleNum, setExpandedModuleNum] = useState<string | null>('01');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Answered' | 'Bookmarked'>('All');

  useEffect(() => {
    dispatch(fetchProblems({ limit: 100 }));
    if (isAuthenticated) {
      dispatch(fetchBookmarks());
    }
  }, [dispatch, isAuthenticated]);

  const handleSolveToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to track your solved problems');
      dispatch(openAuthModal({ mode: 'login' }));
      return;
    }
    dispatch(toggleSolveProblem(id));
    toast.success('Problem solved status updated');
  };

  const handleBookmarkToggle = (q: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to bookmark questions');
      dispatch(openAuthModal({ mode: 'login' }));
      return;
    }
    dispatch(
      toggleBookmarkItem({
        itemId: q.id,
        type: 'PROBLEM',
        title: q.title,
        difficulty: q.difficulty,
        category: q.topic || 'DSA',
      })
    );
    toast.success('Bookmark updated');
  };

  // Ultimate DSA Sheet & GFG 160 Topic Modules
  const dsaModules = [
    { num: '01', title: 'Prerequisites', topic: 'Prerequisites', total: 6, solved: 2 },
    { num: '02', title: 'Time Complexity', topic: 'Time Complexity', total: 4, solved: 2 },
    { num: '03', title: 'Space Complexity', topic: 'Space Complexity', total: 2, solved: 0 },
    { num: '04', title: 'Pattern & String Conversion', topic: 'Pattern', total: 2, solved: 1 },
    { num: '05', title: 'String Basics & KMP', topic: 'Strings', total: 3, solved: 1 },
    { num: '06', title: 'Array Basics & Dutch Flag', topic: 'Arrays & Hashing', total: 4, solved: 2 },
    { num: '07', title: 'Two Pointers Approach', topic: 'Two Pointers', total: 3, solved: 1 },
    { num: '08', title: 'Sliding Window', topic: 'Sliding Window', total: 3, solved: 0 },
    { num: '09', title: 'Binary Search & Answers Range', topic: 'Binary Search', total: 3, solved: 0 },
    { num: '10', title: 'Sorting & Intervals', topic: 'Sorting', total: 3, solved: 1 },
    { num: '11', title: 'Matrixes & Traversals', topic: 'Matrixes', total: 2, solved: 1 },
    { num: '12', title: 'Bit Manipulation', topic: 'Bit Manipulation', total: 2, solved: 1 },
    { num: '13', title: 'Recursion & Backtracking', topic: 'Backtracking', total: 2, solved: 0 },
    { num: '14', title: 'Linked List', topic: 'Linked List', total: 3, solved: 2 },
    { num: '15', title: 'Stack & Queue', topic: 'Stack', total: 3, solved: 1 },
    { num: '16', title: 'Binary Trees', topic: 'Trees', total: 2, solved: 1 },
    { num: '17', title: 'Binary Search Trees', topic: 'BST', total: 2, solved: 1 },
    { num: '18', title: 'Heaps & Priority Queues', topic: 'Heap', total: 2, solved: 1 },
    { num: '19', title: 'Graphs & BFS / DFS', topic: 'Graphs', total: 3, solved: 1 },
    { num: '20', title: 'Dynamic Programming', topic: '1-D Dynamic Programming', total: 3, solved: 0 },
    { num: '21', title: 'Tries & Segment Trees', topic: 'Tries', total: 2, solved: 1 },
  ];

  return (
    <div className="w-full flex flex-col items-center pb-20 font-sans">
      {/* BeyondBasics Hero Header Section - Matching Companies Page Typography */}
      <section id="dsaHero" className="relative mx-auto mt-16 max-w-7xl px-6 text-center md:px-8 flex flex-col items-center">
        <h1 className="animate-fade-in -translate-y-4 text-balance whitespace-nowrap bg-gradient-to-br from-white from-30% to-white/40 bg-clip-text py-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-none tracking-tighter text-transparent opacity-100 font-heading">
          Ultimate DSA Sheet
        </h1>
        <p className="animate-fade-in mb-6 -translate-y-4 text-balance text-lg tracking-tight text-gray-400 opacity-100 md:text-xl font-sans">
          Problem Solving: Everything from Basics to Advanced
        </p>
        <div className="flex justify-center mb-6">
          <div className="shrink-0 bg-white/10 h-0.5 rounded-lg w-60 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]"></div>
        </div>

        {/* Status & Bookmarks Filter Tabs */}
        <div className="flex items-center justify-center gap-2 bg-[#202225] p-1.5 rounded-xl border border-white/10 shadow-md mt-2">
          {(['All', 'Answered', 'Bookmarked'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#A3E635] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {st === 'All' ? 'All Problems' : st === 'Answered' ? 'Answered ✓' : 'Bookmarked'}
            </button>
          ))}
        </div>
      </section>

      {/* DSA Sheet Single Div Per Row List - Matching Companies Page Div Hover Design */}
      <div className="flex flex-col gap-3.5 max-w-5xl w-full mt-10 px-4">
        {dsaModules.map((module) => {
          const isExpanded = expandedModuleNum === module.num;

          const moduleProblems = problems.filter(
            (p) =>
              p.topic?.toLowerCase().includes(module.topic.toLowerCase()) ||
              p.category?.toLowerCase().includes(module.topic.toLowerCase()) ||
              p.title?.toLowerCase().includes(module.topic.toLowerCase())
          );

          let topicQuestions = moduleProblems.length > 0 ? moduleProblems : problems.slice(0, 3);
          
          if (statusFilter === 'Answered') {
            topicQuestions = topicQuestions.filter((q) => q.isSolved);
          } else if (statusFilter === 'Bookmarked') {
            topicQuestions = topicQuestions.filter((q) => bookmarks.some((b) => b.itemId === q.id));
          }

          const solvedInModule = topicQuestions.filter((q) => q.isSolved).length;
          const progressPercent = Math.round((solvedInModule / (topicQuestions.length || 1)) * 100);

          return (
            <div
              key={module.num}
              className={`w-full rounded-lg transition-all duration-200 shadow-md border overflow-hidden ${
                isExpanded
                  ? 'bg-[#2f3136] border-white/40 ring-1 ring-white/20'
                  : 'bg-[#202225] hover:bg-[#2f3136] border-white/10 hover:border-white/30'
              }`}
            >
              {/* Single Div Header Bar - Click to Toggle */}
              <div
                onClick={() => setExpandedModuleNum(isExpanded ? null : module.num)}
                className="group flex items-center justify-between p-5 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#121113] border border-white/10 flex items-center justify-center shrink-0">
                    <span className="text-base font-mono font-bold text-white">
                      {module.num}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white font-heading tracking-tight group-hover:text-white transition-colors truncate">
                      {module.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="w-32 h-1.5 bg-[#121113] rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent || (isExpanded ? 100 : 0)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono text-gray-400 font-sans">
                        {solvedInModule} / {topicQuestions.length} Solved ({progressPercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-400 hidden sm:inline-block bg-[#121113] px-3 py-1 rounded-lg border border-white/5">
                    {topicQuestions.length} Questions
                  </span>
                  <i
                    className={`fa-solid fa-chevron-down text-xs text-gray-400 group-hover:text-white transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-white' : ''
                    }`}
                  ></i>
                </div>
              </div>

              {/* Inline Questions List */}
              {isExpanded && (
                <div className="border-t border-white/10 bg-[#17191c] p-5 flex flex-col gap-3 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
                    <span>{module.title} Questions ({topicQuestions.length})</span>
                    <span>Status &amp; Action</span>
                  </div>

                  {loading ? (
                    <div className="py-4 text-center text-xs font-sans text-gray-400">
                      Loading questions...
                    </div>
                  ) : topicQuestions.length === 0 ? (
                    <div className="py-4 text-center text-xs font-sans text-gray-400">
                      No questions match the current filter ({statusFilter}).
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {topicQuestions.map((q) => {
                        const isBookmarked = bookmarks.some((b) => b.itemId === q.id);

                        return (
                          <div
                            key={q.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#202225] hover:bg-[#2f3136] border border-white/10 hover:border-white/30 rounded-lg transition-all gap-3 shadow-sm"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Tick / Untick Circle Button */}
                              <button
                                onClick={(e) => handleSolveToggle(q.id, e)}
                                className={`text-lg transition-colors shrink-0 cursor-pointer ${
                                  q.isSolved ? 'text-[#A3E635]' : 'text-gray-600 hover:text-gray-400'
                                }`}
                                title={q.isSolved ? 'Mark as Not Answered' : 'Mark as Answered'}
                              >
                                <i className={`fa-solid ${q.isSolved ? 'fa-circle-check' : 'fa-circle'}`}></i>
                              </button>

                              {/* Bookmark Star Button */}
                              <button
                                onClick={(e) => handleBookmarkToggle(q, e)}
                                className={`p-1.5 rounded-md border transition-all text-xs shrink-0 cursor-pointer ${
                                  isBookmarked
                                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                    : 'bg-[#121113] border-white/10 text-gray-500 hover:text-amber-400 hover:border-amber-400/40'
                                }`}
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                              >
                                <i className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-star`}></i>
                              </button>

                              <div className="flex flex-col truncate">
                                <Link
                                  to={`/problems/${q.slug}`}
                                  className="text-sm sm:text-base font-semibold text-white hover:text-gray-200 transition-colors truncate font-sans tracking-tight"
                                >
                                  {q.title}
                                </Link>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span
                                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                                      q.difficulty === 'Easy'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : q.difficulty === 'Medium'
                                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                    }`}
                                  >
                                    {q.difficulty}
                                  </span>

                                  {q.companies && q.companies.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      {q.companies.slice(0, 3).map((comp) => (
                                        <span key={comp} className="text-[10px] font-mono text-gray-400 bg-[#121113] px-1.5 py-0.5 rounded border border-white/5">
                                          {comp}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <Link
                              to={`/problems/${q.slug}`}
                              className="shrink-0 px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-1.5 font-sans"
                            >
                              <span>Solve Problem</span>
                              <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </Link>
                          </div>
                        );
                      })}
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
