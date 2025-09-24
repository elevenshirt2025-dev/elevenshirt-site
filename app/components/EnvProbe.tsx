"use client";

import { useEffect } from "react";

export default function EnvProbe() {
  useEffect(() => {
    console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
  }, []);

  return null; // não mostra nada na tela, só no console
}
