module.exports = (api) => {
    const isTargetWeb = api.caller(caller => caller && caller.target === 'web');

    return {
        presets: [
            '@babel/preset-env',
            '@babel/preset-react'
        ],
        plugins: [
            isTargetWeb && 'react-refresh/babel'
        ].filter(Boolean)
    }
}
