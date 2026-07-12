"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { TypedText } from "@/components/ui/typed-text";

const TITLE = "I design clarity into complexity.";
const EASE = [0.4, 0, 0.2, 1] as const;

export function HeroCopy({ avatarSrc }: { avatarSrc: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [titleDone, setTitleDone] = useState(false);
  const revealed = shouldReduceMotion || titleDone;

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <div>
      <motion.div className="flex items-center gap-2" {...fadeUp(0)}>
        <p className="text-body-sm text-muted">Hi, I&apos;m Ke Er</p>
        <span className="relative flex size-[26px] shrink-0 items-center justify-center rounded-full bg-accent/25">
          <Image
            src={avatarSrc}
            alt=""
            width={28}
            height={28}
            className="size-[26px] rounded-full object-cover"
          />
        </span>
      </motion.div>

      <h1 className="mt-3 text-display-xl text-ink">
        <TypedText text={TITLE} onDone={() => setTitleDone(true)} />
      </h1>

      <motion.p className="mt-6 max-w-reading text-body-lg text-body" {...fadeUp(0.1)}>
        Product Designer creating intuitive experiences through research, interaction design, and
        thoughtful execution.
      </motion.p>

      <motion.div className="mt-8 flex flex-wrap gap-4" {...fadeUp(0.2)}>
        <Button href="/work">See my work</Button>
        <Button href="/contact" variant="secondary">
          Get in touch
        </Button>
      </motion.div>
    </div>
  );
}
