module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@assets': './source/Assets',
          '@navigation': './source/Navigation',
          '@context': './source/Context',
          '@notifications': './source/Context/Notifications',
          '@notification-root':
            './source/Context/Notifications/NotificationsContextRoot',
          '@screens': './source/Screens',
          '@services': './source/Services',
          '@app': './source/App',
          '@component-root': './source/Components/ComponentRoot.tsx',
        },
      },
    ],
  ],
};
