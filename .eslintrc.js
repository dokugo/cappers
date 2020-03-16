module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  plugins: [
    "simple-import-sort",
    "react",
    "@typescript-eslint",
    "prettier",
  ],
  env: {
    "browser": true,
    "jasmine": true,
    "jest": true
  },
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true }],
    "react/prop-types": 0,
    "simple-import-sort/sort": "error",
    // "@typescript-eslint/no-explicit-any": 0,
    // "@typescript-eslint/explicit-function-return-type": 0,
  },
  globals: {
    "process": true
  },
  settings: {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  parser: "@typescript-eslint/parser",
}