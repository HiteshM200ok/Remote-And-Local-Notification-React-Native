
# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Install project dependencies before run project
To install dependencies, run the following command from the root of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Major dependencies
 - [Bottom-Tabs-Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/) - Tab bar on the bottom of the screen that lets you switch between different routes.
 - [React-Native-Firebase](https://rnfirebase.io) - Remote notification services for React Native apps.
 - [Notifee](https://notifee.app) - Local notification services for React Native apps.
 - [Event-Listeners](https://github.com/meinto/react-native-event-listeners) - Event listeners work across different files.

## List of features
 - Remote notification will be received in "Quit" and "Background" state using [React-Native-Firebase](https://rnfirebase.io)
 - while on "Foreground" state will received event with notification data from [React-Native-Firebase](https://rnfirebase.io), using this notification data, create and display local notification  using [Notifee](https://notifee.app)
 - [Event-Listeners](https://github.com/meinto/react-native-event-listeners) is used to emit and listen any events.
 - At the bottom of the screen, there is a simple tab bar that allows you to switch between different routes as well as allow to render notification count badge.
 

# Learn More
To learn more about React Native, take a look at the following resources:

- [React Native Firebase](https://rnfirebase.io) - learn more about React Native Firebase.
- [Firebase Cloud Messaging](https://rnfirebase.io/messaging/usage) - learn more about Firebase Cloud Messaging.
- [Notifee](https://notifee.app/react-native/docs/overview) - learn more about Notifee
- [Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/) - learn more about Bottom Tabs Navigator

