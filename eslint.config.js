// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				ecmaVersion: 2022,
				sourceType: 'module',
				tsconfigRootDir: import.meta.dirname,
			},
		},
		ignores: ['src/lib/', 'node_modules/'],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-namespace': 'error',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'enum',
					format: ['PascalCase'],
				},
				{
					selector: 'enumMember',
					format: ['UPPER_CASE'],
				},
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
				},
			],
			'@/no-inferrable-types': 'off',
			'@/brace-style': 'error',
			'@/indent': ['error', 'tab'],
			'@/quotes': ['error', 'single', 'avoid-escape'],
		},
	},
);
