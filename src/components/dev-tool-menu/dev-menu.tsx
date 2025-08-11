import { useTheme } from '@/styles/theme';
import * as DevClient from 'expo-dev-client';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const DevMenu = () => {
  const { theme, toggleTheme } = useTheme();

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
      toggleTheme(ev.x, ev.y);
      // DevClient.openMenu();
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ position: 'absolute', top: 50, right: 20, zIndex: 9999 }}>
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
