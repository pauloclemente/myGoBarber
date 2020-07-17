module.exports = {
	root: true,
	extends: [
		'@react-native-community',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
    'react-native/no-inline-styles':'off',
    '@typescript-eslint/no-unused-vars':'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'import/prefer-default-export': 'off',
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				allowParens: 'avoid',
				singleQuote: true,
				trailingComma: 'all',
			},
		],
  },
  settings: {
    "import/resolver": {
     "typescript": {}
    }
  }
};
