import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-title-md transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:opacity-90",
  secondary: "border border-border-strong text-ink hover:border-ink",
};

interface ButtonOwnProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkButtonProps = ButtonOwnProps &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & { href: string };

export function Button({ variant = "primary", className, ...props }: ButtonProps | LinkButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (props.href) {
    const { href, target, rel, children } = props as LinkButtonProps;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { children, ...buttonProps } = props as Omit<ButtonProps, "variant" | "className">;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
