module.exports = {
  extends: [
    "eslint:recommended",
    "react-app",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: [
    "react",
    "simple-import-sort",
    "better-styled-components",
    "@typescript-eslint",
    "prettier",
  ],
  env: {
    "browser": true,
    "jasmine": true,
    "jest": true,
    "es6": true,
  },
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true }],
    "react/prop-types": 0,
    "simple-import-sort/sort": "error",
    "better-styled-components/sort-declarations-alphabetically": 2,
  },
  globals: {
    "process": true,
  },
  settings: {
    "react": {
      "pragma": "React",
      "version": "detect",
    }
  },
  parser: "@typescript-eslint/parser",
}