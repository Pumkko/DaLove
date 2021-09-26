module.exports = {
    presets: [
        ['module:metro-react-native-babel-preset'],
        ['@babel/preset-typescript', { 'onlyRemoveTypeImports': true }]
    ],
    plugins: [
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-decorators', { 'legacy': true}],
        ['@babel/plugin-proposal-class-properties', { 'loose': true}],
        ['babel-plugin-parameter-decorator']
    ]
};
