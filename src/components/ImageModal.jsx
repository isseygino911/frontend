import { useEffect, useRef } from 'react';
import '../styles/modal.css';

/**
 * Full-screen image viewer built on native <dialog> (focus trap + Esc for free).
 * Controlled: pass `index` (null = closed) and update it via `onChange`.
 *
 * images: [{ src, alt, caption? }]
 */
export default function ImageModal({ images, index, onChange, onClose }) {
  const dialogRef = useRef(null);
  const open      = index !== null && images[index] !== undefined;
  const multiple  = images.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // React 18 does not wire onClose on <dialog>; listen natively so Esc, ×, and backdrop share one path
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const step = (dir) => onChange((index + dir + images.length) % images.length);

  const handleKeyDown = (e) => {
    if (!multiple) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft')  step(-1);
  };

  const close = () => dialogRef.current.close();

  const image = open ? images[index] : null;

  return (
    <dialog
      ref={dialogRef}
      className="image-modal"
      aria-label={image?.alt ?? 'Image viewer'}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {image && (
        <>
          <figure className="image-modal__figure">
            <img key={image.src} className="image-modal__img" src={image.src} alt={image.alt} />
            <figcaption className="image-modal__caption">
              {image.caption && <span>{image.caption}</span>}
              {multiple && (
                <span className="image-modal__count">
                  {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
              )}
            </figcaption>
          </figure>

          <button className="image-modal__close" onClick={close} aria-label="Close">×</button>
          {multiple && (
            <>
              <button className="image-modal__nav image-modal__nav--prev" onClick={() => step(-1)} aria-label="Previous image">←</button>
              <button className="image-modal__nav image-modal__nav--next" onClick={() => step(1)} aria-label="Next image">→</button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
