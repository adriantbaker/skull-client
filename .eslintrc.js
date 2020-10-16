module.exports = {
    env: {
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'max-len': ['warn'],
    },
};
