module.exports = {
  extends: [
    require.resolve('@sales-analysis/sa-frontend-configs/.eslintrc')
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
}
