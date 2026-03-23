import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useCSSVariable } from 'uniwind';

export default function BackgroundLayout({
  children,
  style,
  scrollable = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}) {
  const [bgDarker, bgLighter, bg] = useCSSVariable([
    '--color-background-primary-darker',
    '--color-background-primary-lighter',
    '--color-background-primary',
  ]);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[String(bgDarker), String(bgLighter), String(bg)]}
      style={[styles.container, style]}
    >
      {scrollable ? (
        <ScrollView className="p-safe flex-1">{children}</ScrollView>
      ) : (
        <View className="p-safe flex-1">{children}</View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
