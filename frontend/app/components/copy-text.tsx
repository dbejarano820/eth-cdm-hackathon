'use client';
import React from 'react';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@tremor/react';

const CopyToClipboardButton = ({ textToCopy }: { textToCopy: string }) => {
  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Text copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy text');
      }
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        alert('Text copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy text');
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <Button
      variant="secondary"
      icon={ClipboardDocumentCheckIcon}
      onClick={() => copyTextToClipboard(textToCopy)}
    >
      {textToCopy}
    </Button>
  );
};

export default CopyToClipboardButton;
