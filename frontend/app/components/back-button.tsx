'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@tremor/react';

export function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant="light">
      Atrás
    </Button>
  );
}
