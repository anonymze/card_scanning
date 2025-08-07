import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from 'tailwind.config';

export default function BackgroundLayout({
  children,
  style,
  scrollable = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        config.theme.extend.colors.background.primaryDark, // slate-900 (top-left)
        config.theme.extend.colors.background.primaryLight, // blue-900 (center)
        config.theme.extend.colors.background.primary, // slate-800 (bottom-right)
      ]}
      style={[styles.container, style]}
    >
      {scrollable ? (
        <ScrollView className='flex-1 p-safe'>
          {children}
        </ScrollView>
      ) : (
        <View className='flex-1 p-safe'>
          {children}
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
