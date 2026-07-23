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

const VIDEO_ANIMATION_PATTERN = /\.(webm|mp4)$/i;

export function ProjectThumbnail({
  src,
  fit,
  animationSrc,
  animationLoop,
  floating,
  isHovered,
}: {
  src: string;
  fit: "cover" | "contain";
  animationSrc: string | null;
  animationLoop: boolean;
  floating: boolean;
  isHovered: boolean;
}) {
  const [canAnimate, setCanAnimate] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isVideoAnimation = animationSrc ? VIDEO_ANIMATION_PATTERN.test(animationSrc) : false;

  useEffect(() => {
    if (!animationSrc || shouldReduceMotion) return;
    setCanAnimate(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [animationSrc, shouldReduceMotion]);

  useEffect(() => {
    if (!isAnimationReady || isVideoAnimation) return;
    if (isHovered) {
      dotLottieRef.current?.play();
    } else {
      dotLottieRef.current?.stop();
      // stop() halts the render loop without redrawing, so the canvas would
      // otherwise keep showing whatever frame played last; force it back to
      // frame 0 so the next hover always restarts from the beginning.
      dotLottieRef.current?.setFrame(0);
    }
  }, [isHovered, isAnimationReady, isVideoAnimation]);

  useEffect(() => {
    if (!isAnimationReady || !isVideoAnimation) return;
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      // Resumes from wherever playback last stopped, so a non-looping clip
      // holds on its last frame across re-hovers instead of restarting.
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered, isAnimationReady, isVideoAnimation]);

  if (animationSrc || floating) {
    return (
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[500px] transition-transform duration-base ease-standard group-hover:scale-[1.05]">
        <Image
          src={src}
          alt=""
          fill
          quality={95}
          sizes="500px"
          className={clsx(
            "object-contain drop-shadow-md transition-opacity duration-base ease-standard",
            isAnimationReady && "pointer-events-none opacity-0"
          )}
        />
        {animationSrc && canAnimate && isVideoAnimation ? (
          <video
            ref={videoRef}
            src={animationSrc}
            loop={animationLoop}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsAnimationReady(true)}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-md"
          />
        ) : null}
        {animationSrc && canAnimate && !isVideoAnimation ? (
          <DotLottieReact
            src={animationSrc}
            loop={animationLoop}
            autoplay={false}
            layout={{ fit: "contain", align: [0.5, 0.5] }}
            renderConfig={{ autoResize: true, devicePixelRatio: window.devicePixelRatio }}
            dotLottieRefCallback={(instance) => {
              dotLottieRef.current = instance;
              instance?.addEventListener("load", () => {
                // Stop synchronously on load (rather than waiting for a React
                // effect round trip) so the player never gets a chance to
                // auto-advance a few frames before settling on frame 0.
                instance.stop();
                setIsAnimationReady(true);
              });
            }}
            className="absolute inset-0 h-full w-full drop-shadow-md"
          />
        ) : null}
      </div>
    );
  }

  return (
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
  );
}
