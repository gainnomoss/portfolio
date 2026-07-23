"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import clsx from "clsx";
import { useReducedMotion } from "motion/react";
import type { DotLottie } from "@lottiefiles/dotlottie-web";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export function ProjectThumbnail({
  src,
  fit,
  animationSrc,
  isHovered,
}: {
  src: string;
  fit: "cover" | "contain";
  animationSrc: string | null;
  isHovered: boolean;
}) {
  const [canAnimate, setCanAnimate] = useState(false);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!animationSrc || shouldReduceMotion) return;
    setCanAnimate(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [animationSrc, shouldReduceMotion]);

  useEffect(() => {
    if (!canAnimate) return;
    if (isHovered) {
      dotLottieRef.current?.play();
    } else {
      dotLottieRef.current?.stop();
    }
  }, [isHovered, canAnimate]);

  return (
    <>
      <Image
        src={src}
        alt=""
        width={800}
        height={600}
        quality={95}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={clsx(
          "h-full w-full transition-transform duration-base ease-standard group-hover:scale-[1.05]",
          fit === "contain" ? "object-contain" : "object-cover"
        )}
      />
      {canAnimate ? (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-base ease-standard group-hover:opacity-100">
          <DotLottieReact
            src={animationSrc ?? undefined}
            loop
            autoplay={false}
            dotLottieRefCallback={(instance) => {
              dotLottieRef.current = instance;
            }}
            className="h-full w-full"
          />
        </div>
      ) : null}
    </>
  );
}
