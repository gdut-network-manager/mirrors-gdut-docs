import {useState, useEffect, useRef, useCallback} from 'react';
import {createPortal} from 'react-dom';
import type {ComponentProps} from 'react';

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Table(props: ComponentProps<'table'>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('表格详情');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const table = container.querySelector('table');
    if (!table) return;

    const check = () => {
      setOverflow(table.scrollWidth > container.clientWidth + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(container);
    ro.observe(table);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let node = container.previousElementSibling;
    while (node) {
      if (node.tagName === 'H2' || node.tagName === 'H3') {
        setTitle(node.textContent || '表格详情');
        return;
      }
      node = node.previousElementSibling;
    }
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    setTimeout(() => setModalOpen(false), 200);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [modalOpen, closeModal]);

  return (
    <div className="table-expand-container" ref={containerRef}>
      <table {...props} />
      {overflow && (
        <button
          className="table-expand-button"
          onClick={openModal}
          aria-label="展开表格"
        >
          <ExpandIcon />
          <span>展开</span>
        </button>
      )}
      {modalOpen && createPortal(
        <div
          className={`table-modal-backdrop${visible ? ' visible' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className={`table-modal-content${visible ? ' visible' : ''}`}>
            <div className="table-modal-header">
              <span className="table-modal-title">{title}</span>
              <button
                className="table-modal-close"
                onClick={closeModal}
                aria-label="关闭"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="table-modal-body">
              <table {...props} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
