module.exports = {
  globDirectory: 'web/dist',
  globPatterns: ['**/*.{js,json,png,md,txt,tsx,css,html,ts}'],
  swDest: 'web/public/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
}
