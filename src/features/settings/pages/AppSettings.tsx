import React from 'react';

export const AppSettings: React.FC = () => {
  const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight font-heading">Platform & API Integration Settings</h1>
        <p className="text-xs text-gray-400 mt-1 font-sans">
          Inspect your architecture status, API transportation layer, and backend readiness.
        </p>
      </div>

      <div className="p-6 bg-[#202225] border border-white/10 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#627eff]/10 border border-[#627eff]/20 text-[#627eff] rounded-xl text-base">
              <i className="fa-solid fa-server"></i>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-100 font-heading">Data Source Mode</h3>
              <p className="text-xs text-gray-400 font-sans">
                {isMock ? 'Currently using local JSON mock service adapter' : 'Connected to Java Spring Boot REST APIs'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 bg-[#627eff]/15 text-[#627eff] border border-[#627eff]/30 rounded-full">
            {isMock ? 'V1 static data' : 'V2 Spring Boot'}
          </span>
        </div>

        <div className="flex flex-col gap-3 text-xs font-mono">
          <div className="flex justify-between items-center p-3 bg-[#121113] border border-white/10 rounded-xl">
            <span className="text-gray-400">Backend Base URL (.env)</span>
            <span className="text-gray-200">{apiBase}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#121113] border border-white/10 rounded-xl">
            <span className="text-gray-400">Auth Token Strategy</span>
            <span className="text-[#48c78e]">JWT Bearer Header</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#121113] border border-white/10 rounded-xl">
            <span className="text-gray-400">JSON Naming Protocol</span>
            <span className="text-[#627eff]">camelCase</span>
          </div>
        </div>

        <div className="p-4 bg-[#627eff]/10 border border-[#627eff]/20 rounded-xl text-xs text-gray-300 flex items-start gap-3">
          <i className="fa-solid fa-[#627eff] fa-shield-halved text-base shrink-0 mt-0.5"></i>
          <div>
            <span className="font-bold text-white block mb-0.5 font-heading">Zero-Frontend-Change Spring Boot Integration</span>
            To connect to your friend's Java Spring Boot backend when ready, simply update{' '}
            <code className="text-white bg-[#121113] px-1 rounded font-mono">VITE_USE_MOCK=false</code> in your{' '}
            <code className="text-white bg-[#121113] px-1 rounded font-mono">.env</code> file. No code edits required!
          </div>
        </div>
      </div>
    </div>
  );
};
