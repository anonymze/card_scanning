import { useTheme } from '@/styles/theme';
import * as DevClient from 'expo-dev-client';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const DevMenu = () => {
  const { theme, toggleTheme } = useTheme();
  const viewRef = React.useRef<View>(null);

  DevClient.registerDevMenuItems([
    {
      name: `Toggle Theme (actual: ${theme})`,
      callback: () => toggleTheme(),
      shouldCollapse: true,
    },
  ]);

  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd((ev) => {
      viewRef.current?.measureInWindow((x, y, _width, _height) => {
        toggleTheme(x + ev.x, y + ev.y);
      });
    });

  return (
    <GestureDetector gesture={gesture}>
      <View
        ref={viewRef}
        style={{ position: 'absolute', top: 50, right: 20, zIndex: 9999 }}
      >
        <Pressable
          hitSlop={8}
          // onPress={() => DevClient.openMenu()}
          style={{ backgroundColor: '#ff6b6b', padding: 10, borderRadius: 5 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>🛠️ Dev</Text>
        </Pressable>
      </View>
    </GestureDetector>
  );
};

export { DevMenu };
