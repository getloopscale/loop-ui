/** @type {import("@ladle/react").UserConfig} */
export default {
  stories: "src/**/*.stories.{ts,tsx}",
  // Ladle only reads the ROOT vite.config by default; without this the @tailwindcss/vite
  // plugin never runs and the utilities are not generated.
  viteConfig: ".ladle/vite.config.mjs",
  addons: {
    theme: { enabled: true, defaultState: "dark" },
    width: {
      enabled: true,
      options: { mobile: 375, tablet: 768, desktop: 1280, wide: 1536 },
      defaultState: 0,
    },
    a11y: { enabled: true },
    source: { enabled: true, defaultState: false },
  },
};
