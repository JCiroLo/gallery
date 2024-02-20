/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  rules: {
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "warn",
  },
};
