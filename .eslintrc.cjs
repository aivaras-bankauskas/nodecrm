module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'curly': 'error',
		'no-console': 'off',
		'no-unused-vars': 'warn',
		'space-infix-ops': 'error',
		'no-multi-spaces': 'error',
		'indent': ['error', 'tab'],
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
		'eqeqeq': ['error', 'always'],
		'no-trailing-spaces': 'error',
		'space-before-blocks': 'error',
		'eol-last': ['error', 'always'],
		'brace-style': ['error', '1tbs'],
		'comma-dangle': ['error', 'never'],
		'linebreak-style': ['error', 'unix'],
		'block-spacing': ['error', 'always'],
		'space-in-parens': ['error', 'never'],
		'func-call-spacing': ['error', 'never'],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'no-multiple-empty-lines': ['error', { 'max': 1 }],
		'spaced-comment': ['error', 'always', { 'exceptions': ['-'] }],
		'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
		'padding-line-between-statements': ['error', { 'blankLine': 'always', 'prev': '*', 'next': 'return' }]
	}
};
