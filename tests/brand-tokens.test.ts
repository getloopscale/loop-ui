/**
 * The default theme is the LoopScale brand: ink and paper neutrals, one brand color (lime),
 * Hanken Grotesk and JetBrains Mono.
 *
 * This file pins the brand's own values in `src/styles/tokens.css` and checks the contrast of
 * every pair a component puts text on. A token edit that drifts from the brand, or that drops a
 * pair below WCAG AA, fails here instead of in a screenshot review.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS = readFileSync(join(ROOT, "src", "styles", "tokens.css"), "utf8");

/** The declarations of the first rule whose selector is exactly `selector`. */
function block(selector: string): Map<string, string> {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`(?:^|\\n)${escaped} \\{\\n([\\s\\S]*?)\\n\\}`, "u").exec(TOKENS);
  if (match?.[1] === undefined) {
    throw new Error(`tokens.css has no "${selector}" rule`);
  }
  const declarations = new Map<string, string>();
  for (const [, name, value] of match[1].matchAll(/^\s*(--[a-z0-9-]+):\s*([^;]+);/gmu)) {
    if (name !== undefined && value !== undefined) {
      declarations.set(name, value.trim());
    }
  }
  return declarations;
}

const light = block(":root");
const dark = new Map([...light, ...block(".dark")]);

function hex(theme: Map<string, string>, token: string): string {
  const value = theme.get(token);
  if (value === undefined || !/^#[0-9a-f]{6}$/u.test(value)) {
    throw new Error(`${token} is not a six-digit hex color: ${String(value)}`);
  }
  return value;
}

function luminance(color: string): number {
  const channel = (offset: number): number => {
    const srgb = Number.parseInt(color.slice(offset, offset + 2), 16) / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Text token on surface token. Every pair has to reach WCAG AA for normal text. */
const TEXT_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["--foreground", "--background"],
  ["--card-foreground", "--card"],
  ["--popover-foreground", "--popover"],
  ["--secondary-foreground", "--secondary"],
  ["--muted-foreground", "--background"],
  ["--muted-foreground", "--card"],
  ["--muted-foreground", "--muted"],
  ["--primary", "--background"],
  ["--primary", "--card"],
  ["--primary-foreground", "--primary"],
  ["--accent-foreground", "--accent"],
  ["--background", "--foreground"],
  ["--success", "--background"],
  ["--success-foreground", "--success"],
  ["--warning", "--background"],
  ["--warning-foreground", "--warning"],
  ["--destructive", "--background"],
  ["--destructive-foreground", "--destructive"],
  ["--info", "--background"],
  ["--info-foreground", "--info"],
];

describe("the default theme is the LoopScale brand", () => {
  it.each([
    ["--background", "#f4f3ef"],
    ["--card", "#fbfaf7"],
    ["--border", "#dcdad3"],
    ["--foreground", "#16191a"],
    ["--muted-foreground", "#5a615f"],
    ["--primary", "#556b00"],
    ["--accent", "#c4e34f"],
    ["--success", "#1f7a4f"],
    ["--warning", "#7a6200"],
    ["--destructive", "#b3372a"],
    ["--info", "#2c5e99"],
  ])("test_light_%s_is_the_brand_value", (token, expected) => {
    expect(hex(light, token)).toBe(expected);
  });

  it.each([
    ["--background", "#111415"],
    ["--card", "#181c1d"],
    ["--border", "#2a3032"],
    ["--foreground", "#e7e6e0"],
    ["--muted-foreground", "#9ba29f"],
    ["--primary", "#c4e34f"],
    ["--accent", "#c4e34f"],
    ["--success", "#5db98a"],
    ["--warning", "#e6c84f"],
    ["--destructive", "#e8705f"],
    ["--info", "#7fa8d9"],
  ])("test_dark_%s_is_the_brand_value", (token, expected) => {
    expect(hex(dark, token)).toBe(expected);
  });

  it("test_the_fonts_are_hanken_grotesk_and_jetbrains_mono", () => {
    expect(light.get("--font-body")).toMatch(/^"Hanken Grotesk",/u);
    expect(light.get("--font-display")).toMatch(/^"Hanken Grotesk",/u);
    expect(light.get("--font-mono")).toMatch(/^"JetBrains Mono",/u);
  });
});

describe("every text pair reaches WCAG AA (4.5:1)", () => {
  it.each(TEXT_PAIRS)("test_light_%s_on_%s", (text, surface) => {
    expect(contrast(hex(light, text), hex(light, surface))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(TEXT_PAIRS)("test_dark_%s_on_%s", (text, surface) => {
    expect(contrast(hex(dark, text), hex(dark, surface))).toBeGreaterThanOrEqual(4.5);
  });
});

describe("no stylesheet wraps a token in hsl()", () => {
  // The tokens are complete colors. `hsl(var(--background))` is invalid CSS, and the browser
  // drops the whole declaration without a warning.
  it.each(["base.css", "styles.css", "styles-v3-legacy.css", "tokens.css", "tokens-v4.css"])(
    "test_%s_has_no_hsl_var",
    (name) => {
      const css = readFileSync(join(ROOT, "src", "styles", name), "utf8").replace(
        /\/\*[\s\S]*?\*\//gu,
        "",
      );
      expect(css).not.toMatch(/hsl\(\s*var\(/u);
    },
  );
});
