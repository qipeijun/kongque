module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    // 行尾设定: windows行尾
    "linebreak-style": ["error", "windows"],
    // 缩进: 2个空格
    indent: [
      "error",
      2,
      { SwitchCase: 1, ObjectExpression: 1, FunctionExpression: 1 }
    ],
    // 运算符空格: 强制空格
    "space-infix-ops": ["error"],
    // 键名键值规整: 键名不空格，键值空格
    "key-spacing": ["error", { beforeColon: false }],
    // 大括号空格和换行规则: 1tbs
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    // 是否可以使用var: 不适用var
    "no-var": ["error"],
    // 单双引号: 双引号
    quotes: ["warn", "double"],
    // 是否加分号: 不加分号
    semi: ["warn", "never"],
    // 禁止连续赋值: 禁止
    "no-multi-assign": ["error"],
    // 检查未使用的变量: 不检查
    "no-unused-vars": ["error", { varsIgnorePattern: ".*", args: "none" }],
    // 去除不必要的箭头函数括号
    "arrow-parens": ["error", "as-needed"],
    // 定义变量命名规则: 驼峰法命名或者下划线大写命名常量
    camelcase: ["error", { allow: ["^[A-Z0-9_]+$"] }],
    // 注释位置: 单独占一行
    "line-comment-position": ["error", { position: "above" }],
    // 注释空白: 要求
    "spaced-comment": ["error", "always"],
  }
}
