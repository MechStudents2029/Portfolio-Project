"use client";

import dynamic from "next/dynamic";

const RoboticHandScene = dynamic(() => import("./RoboticHandScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-sky-start via-sky-mid to-sky-end opacity-40 blur-md" />
    </div>
  ),
});

export default function Hero3D() {
  return (
    <div className="h-full w-full">
      <RoboticHandScene />
    </div>
  );
}
