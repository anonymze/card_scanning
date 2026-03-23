import * as DevClient from 'expo-dev-client';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useUniwind } from 'uniwind';

const DevMenu = () => {
  const { theme } = useUniwind();
  const viewRef = React.useRef<View>(null);

  DevClient.registerDevMenuItems([
    {
      name: `Theme: ${theme}`,
      callback: () => {},
      shouldCollapse: true,
    },
  ]);

  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => {});

  return (
    <GestureDetector gesture={gesture}>
      <View
        ref={viewRef}
        style={{ position: 'absolute', top: 50, right: 20, zIndex: 9999 }}
      >
        <Pressable
          hitSlop={8}
          // onPress={() => DevClient.openMenu()}
          style={{ backgroundColor: '#ff5b5b', padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>🛠️ Dev</Text>
        </Pressable>
      </View>
    </GestureDetector>
  );
};

export { DevMenu };
