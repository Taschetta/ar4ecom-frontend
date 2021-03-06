module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/attributes-order': 'off',
    'prefer-const': 'off',
    'quote-props': 'off',
    'no-undef': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'dot-notation': 'off',
    'padded-blocks': 'off',
    'node/no-callback-literal': 'off',
    'arrow-parens': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 10,
      },
      multiline: {
        max: 2,
      },
    }],
  },
}
