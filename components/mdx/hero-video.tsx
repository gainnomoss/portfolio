import { FramedVideo } from "@/components/ui/framed-video";

export function HeroVideo({ src }: { src: string }) {
  return (
    <div className="mx-auto mt-5 w-full max-w-breakout">
      <FramedVideo src={src} />
    </div>
  );
}
