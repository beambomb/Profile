import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-cta text-on-cta font-semibold hover:brightness-110 hover:shadow-[0_8px_28px_-8px_var(--color-cta)]",
  secondary: "border border-border-strong text-text hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-accent",
};

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-2 text-base transition-[filter,color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0";

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };

type ButtonAsLink = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "secondary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    void _v;
    void _c;
    void _ch;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal && !rest.download) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props;
  void _v;
  void _c;
  void _ch;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
