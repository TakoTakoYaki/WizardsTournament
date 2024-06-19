module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/react',
        "plugin:jest/recommended"
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
        'jest'
    ],
    rules: {
        'react/jsx-filename-extension': [1, { 'extensions': ['.jsx'] }],
        'react/react-in-jsx-scope': 'off',
        "no-undef": "error",
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
