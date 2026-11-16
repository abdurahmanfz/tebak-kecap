/**
 * ============================================================================
 * MODAL COMPONENT
 * ============================================================================
 * 
 * Full-screen modal with backdrop and animations
 */

import { type ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';

export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Modal content */
  children: ReactNode;
  /** Modal title (optional) */
  title?: string;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Max width className */
  maxWidth?: string;
}

/**
 * Modal component with backdrop and animations
 * 
 * @example
 * ```tsx
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Result">
 *   <p>You won!</p>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  closeOnBackdrop = true,
  closeOnEscape = true,
  maxWidth = 'max-w-md',
}: ModalProps) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape || !onClose) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = () => {
    if (closeOnBackdrop && onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className={`w-full ${maxWidth}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Card bamboo padding="lg" className="border-2 border-amber-400/40 shadow-2xl">
              {title && (
                <h2 className="font-heritage text-2xl sm:text-3xl font-extrabold text-amber-300 mb-4 text-center">
                  {title}
                </h2>
              )}
              {children}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
