import { Fragment } from 'react';

/** Bracketed uppercase caption: [ CAPTION ]. */
export function Caption({ children, className = '' }) {
  return (
    <p className={`lab-caption ${className}`} data-lab-text="caption">
      <span className="lab-caption-bracket" aria-hidden="true" />
      <span>{children}</span>
      <span className="lab-caption-bracket lab-caption-bracket-end" aria-hidden="true" />
    </p>
  );
}

/**
 * Heading split into words and characters for the per-letter reveal.
 * The accessible name comes from aria-label; the split spans are hidden from assistive tech.
 * `lines` renders one block line per entry, like the reference's stacked two-line heads.
 */
export function SplitHeading({ as: Tag = 'h2', lines, className = '', mode = 'rise' }) {
  const label = lines.join(' ');
  return (
    <Tag className={className} aria-label={label} data-lab-split={mode}>
      {lines.map((line, li) => (
        <span className="lab-split-line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 && ' '}
              <span className="lab-split-word">
                {[...word].map((ch, ci) => (
                  <span className="lab-split-char" key={ci}>{ch}</span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** Paragraph split into words for the scrubbed word-by-word fill. */
export function SplitWords({ text, className = '' }) {
  return (
    <p className={className} aria-label={text} data-lab-split="fill">
      {text.split(' ').map((word, i) => (
        <span className="lab-split-char" key={i} aria-hidden="true">{word} </span>
      ))}
    </p>
  );
}
