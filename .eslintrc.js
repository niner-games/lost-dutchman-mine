const { version } = require("jest/package.json");

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:prettier/recommended",
  ],
  plugins: ["jest", "@typescript-eslint", "prettier"],
  globals: {
    fetch: true,
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    requireConfigFile: false,
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    node: true,
    jest: true,
    "jest/globals": true,
    es6: true,
  },
  settings: {
    jest: {
      version,
    },
  },
  rules: {
    "class-methods-use-this": "warn",
    "consistent-return": "warn",
    "global-require": "warn",
    "import/no-extraneous-dependencies": "warn",
    "max-classes-per-file": "off",
    "no-continue": "warn",
    "no-underscore-dangle": "warn",
    "no-use-before-define": "warn",
    "no-return-assign": "warn",
    "no-shadow": "warn",
    camelcase: "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/no-unused-modules": [1, { unusedExports: true }],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
    semi: ["off", "never"],
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        singleQuote: true,
        endOfLine: "auto",
      },
    ],
  },
};
