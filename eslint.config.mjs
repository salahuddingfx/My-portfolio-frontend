import { fixupConfigRules } from "@eslint/compat";
import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...fixupConfigRules([
    {
      ...nextConfig,
      plugins: {
        "@next/next": (await import("@next/eslint-plugin-next")).default,
      },
    },
  ]),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
