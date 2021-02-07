module.exports = {
	root: true,
	env: {
	  es6: true,
	  'shared-node-browser': true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	ignorePatterns: ["tailwind.config.js", ".eslintrc.js"],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:tailwind/recommended',
		'prettier/@typescript-eslint',
		'prettier/react',
	],
	rules: {
		// Because of Next.js usage.
		'react/react-in-jsx-scope': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,

		// Newer rules that should eventually be recommended.

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implicit-any-catch.md
		'@typescript-eslint/no-implicit-any-catch': 1,

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
		'@typescript-eslint/prefer-ts-expect-error': 1,

		// Greater safety.

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
		// '@typescript-eslint/consistent-type-assertions': [ 1, { assertionStyle: 'never', } ],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
		// '@typescript-eslint/no-unnecessary-condition': 1,

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
		'@typescript-eslint/strict-boolean-expressions': [ 1, { allowString: false, allowNumber: false, } ],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
		'@typescript-eslint/require-array-sort-compare': [ 1, { ignoreStringArrays: true, } ],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
		'@typescript-eslint/switch-exhaustiveness-check': 1,

		// Make Prettier warn instead of error.
		'prettier/prettier': 1,
	},
}