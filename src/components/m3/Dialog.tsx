import {
  useEffect,
  useRef,
  useId,
  ReactNode,
  MouseEvent,
} from 'react';

export interface DialogProps {
  /** Controls open/closed state. */
  open: boolean;
  /** The dialog heading text (required for accessible name). */
  title: string;
  /** Called when the user dismisses via Escape or the backdrop click. */
  onClose: () => void;
  children: ReactNode;
  /**
   * Action row (e.g. Cancel + Confirm buttons).
   */
  actions?: ReactNode;
  /**
   * 'standard' — centered card dialog (default).
   * 'fullscreen' — covers the viewport on compact screens.
   */
  variant?: 'standard' | 'fullscreen';
  className?: string;
}

export function Dialog({
  open,
  title,
  onClose,
  children,
  actions,
  variant = 'standard',
  className = '',
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  /* Sync open state with native dialog */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      if (!el.open) {
        el.showModal();
      }
    } else {
      if (el.open) {
        el.close();
      }
    }
  }, [open]);

  /* Handle Escape */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener('cancel', handleCancel);
    return () => el.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  /* Close on backdrop click */
  const handleDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) {
      onClose();
    }
  };

  const classes = [
    'm3-dialog__card',
    variant === 'fullscreen' ? 'm3-dialog__card--fullscreen' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <dialog
      ref={ref}
      className="m3-dialog"
      aria-labelledby={titleId}
      onClick={handleDialogClick}
    >
      <div className={classes}>
        <h2 id={titleId} className="m3-dialog__title">
          {title}
        </h2>
        <div className="m3-dialog__content">{children}</div>
        {actions ? <div className="m3-dialog__actions">{actions}</div> : null}
      </div>
    </dialog>
  );
}

export default Dialog;
