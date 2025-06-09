import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compatibility layer for old-style config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Flat Config
export default defineConfig([
  // Modern ESLint defaults
  js.configs.recommended,

  // Global variables like window, process, etc.
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // TypeScript config
  ...tseslint.configs.recommended,

  // React plugin config (flat-compatible)
  ...pluginReact.configs.flat.recommended,

  // Config using FlatCompat for older-style plugins
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:tailwindcss/recommended",
    ],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "react/no-escape-entities": "off",
    },
  }),
]);
