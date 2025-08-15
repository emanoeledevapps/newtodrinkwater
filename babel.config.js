module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-worklets/plugin',
    ['module-resolver', {
      root: '.',
      alias: {
        '@components': './src/components',
        '@hooks': './src/hooks',
        '@screens': './src/screens',
        '@db': './src/db'
      },
    }],
  ]
};
