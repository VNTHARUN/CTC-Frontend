import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full mb-6">
        <FileQuestion className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 font-mono">404 - Page Not Found</h1>
      <p className="text-sm text-gray-400 max-w-md mb-8">
        The problem route or placement resource you are looking for does not exist or has been moved.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="lg" leftIcon={<Home className="w-4 h-4" />}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
