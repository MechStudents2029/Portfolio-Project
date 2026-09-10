"use client";

import dynamic from "next/dynamic";

const RoboticHandScene = dynamic(() => import("./RoboticHandScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 border border-cadmium/60" />
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
