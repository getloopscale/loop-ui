import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../../lib/cn.js";

/**
 * Button — primitive action element.
 *
 * Variants:
 *   - primary    neutral fill (ink on paper, bone on ink): the default action
 *   - secondary  surface with hairline border
 *   - accent     lime fill: the one highlighted action on a screen
 *   - ghost      transparent, hover lifts surface
 *   - link       text-only, brand color, underline on hover
 *   - destructive  for irreversible actions
 *
 * Sizes: sm (32px) · md (40px, default) · lg (48px) · icon (square 40px)
 *
 * `asChild` swaps the root for the consumer's element (Radix Slot pattern).
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg",
    "font-medium font-sans tracking-tight",
    "transition-[box-shadow,background-color,color,transform] duration-base ease-out-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Tailwind v4 dropped the `button { cursor: pointer }` preflight rule
    // (https://tailwindcss.com/docs/upgrade-guide#default-button-cursor) so
    // every <button> now shows the default arrow cursor. Restore the
    // "clickable hand" explicitly for the Button primitive; the
    // `disabled:pointer-events-none` rule below short-circuits cursor
    // application for disabled state (no events → cursor is moot).
    // `aria-disabled:cursor-default` is a belt-and-suspenders override
    // for paths where pointer-events still flow.
    "cursor-pointer disabled:cursor-default aria-disabled:cursor-default",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-foreground text-background",
          "hover:bg-foreground/90",
          "active:scale-[0.98] active:bg-foreground/80",
        ],
        secondary: [
          "border border-border bg-secondary text-secondary-foreground",
          "hover:bg-muted",
          "active:scale-[0.98]",
        ],
        accent: ["bg-accent text-accent-foreground", "hover:bg-accent-deep", "active:scale-[0.98]"],
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted",
          "active:scale-[0.98] active:bg-secondary",
        ],
        link: [
          "bg-transparent text-primary underline-offset-4",
          "hover:text-primary-deep hover:underline",
          "h-auto p-0",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
          "active:scale-[0.98]",
        ],
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        // md: tier adjustable via density (CSS var on :root). See D3 ADR of
        // faang-density-tightening plan. Default `comfortable` density makes
        // this 36px (--loopscale-control-h: 2.25rem). sm and lg stay hardcoded.
        md: "h-[var(--loopscale-control-h,2rem)] px-[var(--loopscale-control-px,0.75rem)] text-body-sm",
        lg: "h-11 px-4 text-body-md",
        icon: "h-[var(--loopscale-control-h,2rem)] w-[var(--loopscale-control-h,2rem)] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
