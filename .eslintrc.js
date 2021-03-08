module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2020: true,
      },
    extends: [
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion:2020,
        sourceType:"module",
        ecmaFeatures:{
            jsx:true
        }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      "vue/no-multiple-template-root": "off",
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      //'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    }
  };
  