import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        iris: "#5E3B95",
        amethyst: "#8A4E91",
        amber: "#F19844",
        slate: "#4A596B",
        container: "#242424",
      },
    },
  },
} satisfies Config;
