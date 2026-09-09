import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items matching your current filters or query.',
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div role="status" className="c2c-card my-4 flex flex-col items-center justify-center border-dashed p-8 text-center sm:p-12">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--c2c-surface-raised)] text-[var(--c2c-text-muted)]">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="mb-1 text-base font-semibold text-[var(--c2c-text)]">{title}</h3>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-[var(--c2c-text-muted)]">{description}</p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
