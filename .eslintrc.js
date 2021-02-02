module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2020: true,
      },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue/essential',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
      //'@vue/typescript/recommended',
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion:2020,
        sourceType:"module",
        ecmaFeatures:{
            jsx:true
        }
    },
    rules: {
      "vue/no-multiple-template-root": "off",
      //'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    }
  };
  