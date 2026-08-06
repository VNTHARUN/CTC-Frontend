import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const ServerError: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full mb-6">
        <AlertOctagon className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 font-mono">500 - System Exception</h1>
      <p className="text-sm text-gray-400 max-w-md mb-8">
        An unhandled internal server error occurred while processing your request. Please try refreshing.
      </p>
      <Button
        variant="primary"
        size="lg"
        onClick={() => window.location.reload()}
        leftIcon={<RotateCcw className="w-4 h-4" />}
      >
        Reload Page
      </Button>
    </div>
  );
};
