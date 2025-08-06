import '@/styles/global.css';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// export const unstable_settings = {
//   initialRouteName: '(app)',
// };

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack
					screenOptions={{
						headerShown: false,
						gestureEnabled: false,
						fullScreenGestureEnabled: false,
					}}
				>
					<Stack.Screen name="index" />
				</Stack>
    </GestureHandlerRootView>
  );
}
