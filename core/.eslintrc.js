module.exports = {
  env: {
    es2020: true,
    node: true,
    jest:true,

  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'no-useless-constructor':'off',
    'camelcase':'off',
    '@typescript-eslint/indent': 'off',
    'import/no-extraneous-dependencies':'off',
    'class-methods-use-this':'off',
    '@typescript-eslint/no-unused-vars':['warn',{'argsIgnorePattern':'_'}],
    //'@typescript-eslint/interface-name-prefix': ['error', {'prefixWithI':'always'}],
    'import/extensions':[
      'error',
      'ignorePackages',
      {
        'ts': 'never'
      }
    ],
    'prettier/prettier':[
      'error',
      {
        useTabs:true,
        allowPArens:'avoid',
        singleQuote: true,
        trailingComma: 'all',
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'prefix':['I']
      }
    ]
  },
  settings:{
    'import/resolver':{
      'typescript':{}
    }
  }
};
