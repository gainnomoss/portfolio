import Image from "next/image";
import type { ReactNode } from "react";

export function Principles({ children }: { children: ReactNode }) {
  return <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>;
}

export function PrincipleCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-accent-weak bg-canvas p-5 shadow-[0_1px_1px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.10)]">
      {icon ? (
        <Image src={icon} alt="" width={40} height={40} className="h-10 w-10" />
      ) : null}
      <div className="flex flex-col gap-2">
        <p className="text-body-md font-bold text-body">{title}</p>
        <p className="text-body-md text-body">{description}</p>
      </div>
    </div>
  );
}
