import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';

/** Auth modal overlay sits at 10000. Toasts must always paint above it. */
export const AUTH_OVERLAY_Z_CLASS = 'z-10000';
export const TOAST_Z_INDEX = 2_147_483_646;

/**
 * Renders the toast host on document.body so sign-in, sign-up, and forgot-password
 * overlays (and their backdrop-blur) cannot cover backend messages.
 */
export const AppToaster: React.FC = () => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMountNode(document.body);
  }, []);

  if (!mountNode) return null;

  return createPortal(
    <Toaster
      position="top-right"
      containerClassName="c2c-toaster"
      containerStyle={{ zIndex: TOAST_Z_INDEX, isolation: 'isolate' }}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#111827',
          color: '#F9FAFB',
          border: '1px solid #1F2937',
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          zIndex: TOAST_Z_INDEX,
        },
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#111827',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#F43F5E',
            secondary: '#111827',
          },
        },
      }}
    />,
    mountNode
  );
};
