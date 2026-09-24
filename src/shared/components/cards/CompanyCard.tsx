import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    industry: string;
    problemCount: number;
    difficultyBreakdown?: {
      easy: number;
      medium: number;
      hard: number;
    };
  };
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group flex flex-col justify-between rounded-xl border border-(--c2c-border) bg-(--c2c-surface) p-5 transition-all duration-200 hover:border-(--c2c-border-strong) hover:bg-(--c2c-surface-raised)"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--c2c-border) bg-(--c2c-surface-raised) p-2">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-contain filter invert opacity-90" />
              ) : (
                <i className="fa-solid fa-building text-[#627eff]"></i>
              )}
            </div>
            <div>
              <h3 className="text-base font-semibold text-(--c2c-text) transition-colors group-hover:text-(--c2c-primary)">
                {company.name}
              </h3>
              <p className="text-xs text-(--c2c-text-muted)">{company.industry}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-medium text-[#627eff] bg-[#627eff]/10 px-2.5 py-1 rounded-full border border-[#627eff]/20">
            {company.problemCount} Problems
          </span>
        </div>

        {company.difficultyBreakdown && (
          <div className="w-full my-3">
            <div className="mb-1 flex justify-between text-[11px] text-(--c2c-text-subtle) font-mono">
              <span className="text-[#48c78e]">Easy: {company.difficultyBreakdown.easy}</span>
              <span className="text-[#f5a623]">Med: {company.difficultyBreakdown.medium}</span>
              <span className="text-[#f87171]">Hard: {company.difficultyBreakdown.hard}</span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-(--c2c-surface-raised)">
              <div
                style={{
                  width: `${(company.difficultyBreakdown.easy / company.problemCount) * 100}%`,
                }}
                className="bg-[#48c78e]"
              />
              <div
                style={{
                  width: `${(company.difficultyBreakdown.medium / company.problemCount) * 100}%`,
                }}
                className="bg-[#f5a623]"
              />
              <div
                style={{
                  width: `${(company.difficultyBreakdown.hard / company.problemCount) * 100}%`,
                }}
                className="bg-[#f87171]"
              />
            </div>
          </div>
        )}
      </div>

      <Link
        to={`/companies/${company.slug}`}
        className="mt-4 inline-flex items-center justify-between border-t border-(--c2c-border) pt-3 text-xs font-semibold text-(--c2c-text-muted) transition-colors group-hover:text-(--c2c-primary)"
      >
        <span>Explore Hiring Guide & Questions</span>
        <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
      </Link>
    </motion.div>
  );
};
