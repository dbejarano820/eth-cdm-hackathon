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

  const address = textToCopy; // Asume que textToCopy es tu dirección de Ethereum
  const shortenedAddress = `${address.slice(0, 8)}...${address.slice(-4)}`;

  return (
    <Button
      variant="secondary"
      icon={ClipboardDocumentCheckIcon}
      onClick={() => copyTextToClipboard(textToCopy)}
    >
      {shortenedAddress}
    </Button>
  );
};

export default CopyToClipboardButton;
