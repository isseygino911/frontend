import { useId } from 'react';

/** Two rising slabs on a shared base — the II Design mark, filled with a brushed-gold gradient. */
function BrandMark() {
  const gradient = `brand-gold-${useId()}`;

  return (
    <svg className="brand-logo-mark" viewBox="10 8 270 377" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-gold-light)" />
          <stop offset="1" stopColor="var(--brand-gold)" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradient})`}>
        <path d="M12 75 L70 115 L70 353 L12 383 Z" />
        <path d="M112 10 L170 55 L170 325 L112 355 Z" />
        <path d="M120 359 L278 383 L182 383 L120 364 Z" />
      </g>
    </svg>
  );
}

/**
 * II Design logo, sized by the parent's font-size; the wordmark takes the parent's colour.
 * - inline:  mark beside the wordmark (headers, nav)
 * - stacked: mark over wordmark and tagline (footers, loaders)
 * - mark:    the mark alone (narrow rails)
 */
export default function BrandLogo({ variant = 'inline', className = '' }) {
  return (
    <span className={`brand-logo brand-logo-${variant} ${className}`.trim()} role="img" aria-label="II Design">
      <BrandMark />
      {variant !== 'mark' && <span className="brand-logo-word">IIDESIGN</span>}
      {variant === 'stacked' && (
        <span className="brand-logo-tag">
          <span>Interior Design</span>
          <span>Residential / Commercial</span>
        </span>
      )}
    </span>
  );
}
