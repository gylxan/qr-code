export default {
  arrowParens: 'avoid',
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: 'tsconfig.json',
      options: {
        trailingComma: 'none',
      },
    },
  ],
}
