import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => <Component className={`c2c-container ${className}`}>{children}</Component>;

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  children,
  className = '',
}) => (
  <header className={`c2c-page-header ${className}`}>
    {eyebrow && <p className="c2c-eyebrow">{eyebrow}</p>}
    <h1 className="c2c-title">{title}</h1>
    {description && <p className="c2c-lead">{description}</p>}
    {children}
  </header>
);

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  detail?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, detail }) => (
  <div className="c2c-card flex min-h-24 items-center gap-3 p-4">
    {icon && (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A3E635]/12 text-[#A3E635] light:text-[#4D7C0F]">
        {icon}
      </span>
    )}
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-(--c2c-text-subtle)">{label}</p>
      <p className="mt-1 text-xl font-bold text-(--c2c-text)">{value}</p>
      {detail && <p className="mt-0.5 truncate text-xs text-(--c2c-text-muted)">{detail}</p>}
    </div>
  </div>
);

export const SectionHeader: React.FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ title, description, action }) => (
  <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-(--c2c-text)">{title}</h2>
      {description && <p className="mt-1 text-sm text-(--c2c-text-muted)">{description}</p>}
    </div>
    {action}
  </div>
);

export const ProgressBar: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-(--c2c-text-muted)">
        <span>{label}</span>
        <span className="font-mono">{safeValue}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        className="h-2 overflow-hidden rounded-full bg-(--c2c-surface-raised)"
      >
        <div className="h-full rounded-full bg-(--c2c-success) transition-[width] duration-300" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
};

export const LoadingState: React.FC<{ label?: string }> = ({ label = 'Loading content' }) => (
  <div role="status" className="flex min-h-40 flex-col items-center justify-center gap-3 text-(--c2c-text-muted)">
    <span className="c2c-spinner h-6 w-6" aria-hidden="true" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);
