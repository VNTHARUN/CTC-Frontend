import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchProblemById } from '../redux/problemSlice';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import { toast } from 'react-hot-toast';

export const ProblemDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { selectedProblem: problem, loading } = useAppSelector((state) => state.problems);

  const [activeTab, setActiveTab] = useState<'topics' | 'companies' | 'hints' | 'similar' | null>(null);
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'java' | 'cpp' | 'python' | 'javascript'>('java');

  useEffect(() => {
    if (slug) {
      dispatch(fetchProblemById(slug));
    }
  }, [dispatch, slug]);

  const defaultDriverCode: Record<string, string> = {
    java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
    cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (mp.count(comp)) return {mp[comp], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            comp = target - num
            if comp in seen:
                return [seen[comp], i]
            seen[num] = i
        return []`,
    javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) {
            return [map.get(comp), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`
  };

  const handleCopyCode = () => {
    const codeToCopy = problem?.codeSnippets?.[selectedLang] || defaultDriverCode[selectedLang];
    navigator.clipboard.writeText(codeToCopy);
    setCopiedCode(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (loading || !problem) {
    return (
      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full p-8">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  // Guaranteed examples array with fallbacks
  const displayExamples = problem.examples && problem.examples.length > 0 ? problem.examples : [
    { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
    { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." },
    { input: "nums = [3, 3], target = 6", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]." }
  ];

  const difficultyBadge =
    problem.difficulty.toLowerCase() === 'easy'
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      : problem.difficulty.toLowerCase() === 'medium'
      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto font-sans text-gray-200">
      
      {/* NAVIGATION & BREADCRUMB */}
      <div className="flex items-center justify-between">
        <Link
          to="/problems"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-[#A3E635] transition-all bg-[#202225] border border-white/10 hover:border-[#A3E635]/40 px-4.5 py-2.5 rounded-xl shadow-md group"
        >
          <i className="fa-solid fa-arrow-left text-xs text-[#A3E635] group-hover:-translate-x-1 transition-transform"></i>
          <span>Back to Problem List</span>
        </Link>
      </div>

      {/* HERO PROBLEM TITLE & BADGES */}
      <div className="p-6 sm:p-8 bg-[#202225] border border-white/10 rounded-2xl shadow-xl flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
            {problem.title}
          </h1>

          {/* Difficulty Badge */}
          <div className={`self-start sm:self-auto text-xs sm:text-sm font-bold font-mono px-4 py-1.5 rounded-full border shadow-sm ${difficultyBadge}`}>
            {problem.difficulty}
          </div>
        </div>

        {/* INTERACTIVE CHIPS ROW: TOPICS, COMPANIES, HINTS */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
          {/* Topics Pill */}
          <button
            onClick={() => setActiveTab(activeTab === 'topics' ? null : 'topics')}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-[#121113] border border-white/10 hover:border-[#A3E635]/50 hover:text-[#A3E635] transition-all cursor-pointer shadow-sm ${
              activeTab === 'topics' ? 'border-[#A3E635] text-[#A3E635] bg-[#A3E635]/10' : 'text-gray-300'
            }`}
          >
            <i className="fa-solid fa-tag text-xs text-[#A3E635]"></i>
            <span>Topics</span>
          </button>

          {/* Companies Pill */}
          <button
            onClick={() => setActiveTab(activeTab === 'companies' ? null : 'companies')}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-[#121113] border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition-all cursor-pointer shadow-sm ${
              activeTab === 'companies' ? 'border-amber-400 text-amber-300 bg-amber-400/10' : 'text-gray-300'
            }`}
          >
            <i className="fa-solid fa-building text-xs text-amber-400"></i>
            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent font-bold">
              Companies
            </span>
          </button>

          {/* Hint Pill */}
          <button
            onClick={() => setActiveTab(activeTab === 'hints' ? null : 'hints')}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-[#121113] border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition-all cursor-pointer shadow-sm ${
              activeTab === 'hints' ? 'border-amber-400 text-amber-300 bg-amber-400/10' : 'text-gray-300'
            }`}
          >
            <i className="fa-solid fa-lightbulb text-xs text-amber-400 animate-pulse"></i>
            <span>Hint</span>
          </button>
        </div>

        {/* EXPANDABLE TAB PANELS */}
        {activeTab === 'topics' && (
          <div className="p-4 bg-[#121113] border border-white/10 rounded-xl flex flex-wrap gap-2.5 animate-fade-in">
            <span className="text-xs sm:text-sm font-mono font-semibold px-3.5 py-1.5 rounded-lg bg-[#202225] border border-[#A3E635]/30 text-[#A3E635]">
              {problem.topic}
            </span>
            <span className="text-xs sm:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#202225] border border-white/10 text-gray-300">
              Array
            </span>
            <span className="text-xs sm:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#202225] border border-white/10 text-gray-300">
              Hash Table
            </span>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="p-4 bg-[#121113] border border-white/10 rounded-xl flex flex-wrap gap-2.5 animate-fade-in">
            <span className="text-xs sm:text-sm font-mono font-bold px-3.5 py-1.5 rounded-lg bg-[#202225] border border-amber-400/40 text-amber-300">
              Amazon (Top Asked)
            </span>
            <span className="text-xs sm:text-sm font-mono font-semibold px-3.5 py-1.5 rounded-lg bg-[#202225] border border-amber-400/30 text-amber-200">
              Google
            </span>
            <span className="text-xs sm:text-sm font-mono font-semibold px-3.5 py-1.5 rounded-lg bg-[#202225] border border-amber-400/30 text-amber-200">
              Microsoft
            </span>
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="p-5 bg-[#121113] border border-amber-400/30 rounded-xl flex flex-col gap-2 animate-fade-in text-sm text-gray-200 leading-relaxed font-sans">
            <div className="font-bold text-amber-300 flex items-center gap-2 text-base">
              <i className="fa-solid fa-lightbulb text-amber-400"></i>
              <span>Hint 1:</span>
            </div>
            <p className="text-gray-300">
              A brute-force solution checks every pair of elements in O(N^2) time. Can we use a Hash Map to store previously seen numbers and reduce the lookup time to O(1)?
            </p>
          </div>
        )}
      </div>

      {/* PROBLEM STATEMENT & DESCRIPTION SECTION */}
      <div className="p-6 sm:p-8 bg-[#202225] border border-white/10 rounded-2xl flex flex-col gap-8 shadow-xl">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-bold text-white mb-3">
            Problem Description
          </h2>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans whitespace-pre-line">
            {problem.description}
          </p>
        </div>

        {/* Constraints */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg sm:text-xl font-heading font-bold text-white">
            Constraints
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base font-mono text-gray-200 bg-[#121113] p-5 rounded-xl border border-white/10">
            <li><code className="text-[#38BDF8] font-semibold">2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
            <li><code className="text-[#38BDF8] font-semibold">-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
            <li><code className="text-[#38BDF8] font-semibold">-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
            <li className="text-[#A3E635] font-semibold font-sans">Only one valid solution exists.</li>
          </ul>
        </div>
      </div>

      {/* EXPLICIT INTERACTIVE TEST CASES SECTION */}
      <div className="p-6 sm:p-8 bg-[#202225] border border-white/10 rounded-2xl flex flex-col gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635] shrink-0">
              <i className="fa-solid fa-vial text-base"></i>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-white">
                Interactive Test Cases
              </h2>
              <p className="text-xs text-gray-400 font-sans">
                Sample inputs and expected outputs
              </p>
            </div>
          </div>

          {/* Test Case Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#121113] p-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
            {displayExamples.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTestCaseIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedTestCaseIdx === idx
                    ? 'bg-[#A3E635] text-black shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Case {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Test Case Detail Panel */}
        {displayExamples[selectedTestCaseIdx] && (
          <div className="p-5 bg-[#121113] border border-white/10 rounded-xl flex flex-col gap-4 font-mono text-sm sm:text-base animate-fade-in shadow-inner">
            <div>
              <span className="text-[#38BDF8] font-bold block text-xs uppercase mb-1.5 font-sans">
                Input:
              </span>
              <div className="bg-[#202225] p-3.5 rounded-xl border border-white/10 text-gray-200">
                <code>{displayExamples[selectedTestCaseIdx].input}</code>
              </div>
            </div>

            <div>
              <span className="text-[#A3E635] font-bold block text-xs uppercase mb-1.5 font-sans">
                Expected Output:
              </span>
              <div className="bg-[#202225] p-3.5 rounded-xl border border-white/10 text-gray-200">
                <code>{displayExamples[selectedTestCaseIdx].output}</code>
              </div>
            </div>

            {displayExamples[selectedTestCaseIdx].explanation && (
              <div>
                <span className="text-[#818CF8] font-bold block text-xs uppercase mb-1.5 font-sans">
                  Explanation:
                </span>
                <div className="text-gray-300 font-sans text-sm leading-relaxed bg-[#202225]/50 p-3 rounded-xl border border-white/5">
                  {displayExamples[selectedTestCaseIdx].explanation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CODE DISPLAY CONTAINER (OUR LIME & DSA SHEET PALETTE) */}
      <div className="codeblock-container bg-[#202225] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Editor Buttons Header Bar */}
        <div className="p-4 bg-[#121113] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold font-heading text-white">Solution Code Implementation</span>
            
            {/* Language Selector */}
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value as any)}
              className="bg-[#202225] border border-white/10 text-xs sm:text-sm font-mono text-[#A3E635] font-bold rounded-xl px-3 py-1.5 outline-none focus:border-[#A3E635] cursor-pointer shadow-sm"
            >
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* Copy Button */}
            <button
              onClick={handleCopyCode}
              title="Copy Code"
              className="px-4 py-2 rounded-xl bg-[#202225] border border-white/10 hover:border-[#A3E635]/50 text-xs sm:text-sm font-semibold text-gray-200 hover:text-[#A3E635] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <i className={`fa-regular ${copiedCode ? 'fa-check text-[#A3E635]' : 'fa-copy'}`}></i>
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Content Panel */}
        <div className="p-6 bg-[#121113] font-mono text-sm sm:text-base overflow-x-auto text-gray-200 max-h-[70vh] scrollbar-thin">
          <pre className="leading-relaxed">
            <code>
              {problem.codeSnippets?.[selectedLang] || defaultDriverCode[selectedLang]}
            </code>
          </pre>
        </div>
      </div>

      {/* ACCORDION: SIMILAR QUESTIONS */}
      <div className="border border-white/10 rounded-2xl bg-[#202225] overflow-hidden shadow-md mb-12">
        <button
          onClick={() => setActiveTab(activeTab === 'similar' ? null : 'similar')}
          className="w-full p-5 flex items-center justify-between text-sm sm:text-base font-bold font-heading text-white hover:text-[#A3E635] cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-list-tree text-[#38BDF8]"></i>
            <span>Similar Questions</span>
          </div>
          <i className={`fa-solid fa-chevron-down text-sm text-[#A3E635] transition-transform ${activeTab === 'similar' ? 'rotate-180' : ''}`}></i>
        </button>

        {activeTab === 'similar' && (
          <div className="p-5 bg-[#121113] border-t border-white/10 flex flex-col gap-3 text-sm font-sans">
            <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
              <Link to="/problems/3sum" className="text-gray-200 font-semibold hover:text-[#A3E635]">3Sum</Link>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">Medium</span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
              <Link to="/problems/4sum" className="text-gray-200 font-semibold hover:text-[#A3E635]">4Sum</Link>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">Medium</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
