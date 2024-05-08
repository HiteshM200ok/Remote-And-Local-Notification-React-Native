import React from 'react';
import Colors from '@assets/Colors';
import {ReactNode} from 'react';
import {StatusBar, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IPropsContainer extends ViewProps {
  children?: ReactNode;
  safeAreaStyle?: ViewStyle;
}

const Container: React.FC<IPropsContainer> = ({
  children = null,
  safeAreaStyle,
  style,
  ...restProps
}) => {
  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={[styles.safeArea, safeAreaStyle]}>
      <StatusBar backgroundColor={Colors.Primary} animated={true} />
      <View style={[styles.container, style]} {...restProps}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Container;
