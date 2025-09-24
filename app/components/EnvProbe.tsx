'use client';
import { useEffect } from 'react';

export default function EnvProbe() {
  useEffect(() => {
    // NEXT_PUBLIC_* está disponível no browser
    // o "as string" remove a queixa do TS
    console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL as string);
  }, []);

  return null; // não renderiza nada
}

