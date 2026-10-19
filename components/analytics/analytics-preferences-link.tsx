'use client';

import type { CSSProperties } from 'react';

type AnalyticsPreferencesLinkProps = {
  className?: string;
  style?: CSSProperties;
};

export function AnalyticsPreferencesLink({ className, style }: AnalyticsPreferencesLinkProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={className}
      style={style}
      onClick={() => window.dispatchEvent(new Event('analytics-open-consent'))}
    >
      Preferências de cookies
    </button>
  );
}
