module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [],
	rules: {
		'vue/multi-word-component-names': 0
	}
};
