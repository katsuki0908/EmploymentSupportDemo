module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  plugins: ["@typescript-eslint", "react"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: "module"
  },
  rules: {
    // 必要に応じて、ここに独自のルールを追加できます
    "react/react-in-jsx-scope": "off", // React 17 以降は不要なルール
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "VariableDeclarator": "first",
      "outerIIFEBody": 1,
      "MemberExpression": 1,
      "FunctionDeclaration": {
        "parameters": "first",
        "body": 1
      },
      "FunctionExpression": {
        "parameters": "first",
        "body": 1
      },
      "CallExpression": {
        "arguments": "first"
      },
      "ArrayExpression": 1,
      "ObjectExpression": 1,
      "ImportDeclaration": 1,
      "flatTernaryExpressions": false,
      "ignoredNodes": ["JSXElement", "JSXElement *"]
    }]
  },
  settings: {
    react: {
      version: "detect" // Reactのバージョンを自動検出
    }
  }
};
  