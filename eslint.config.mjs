import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * Flat config. `next lint` was removed in Next.js 16, so linting runs through
 * the ESLint CLI directly — see the "lint" script in package.json.
 * eslint-config-next 16 ships native flat configs, so no FlatCompat shim.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: ['.next/**', '.netlify/**', 'node_modules/**', 'out/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
