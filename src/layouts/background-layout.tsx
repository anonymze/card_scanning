import { themeRuntimeValues, useTheme } from '@/styles/theme';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function BackgroundLayout({
  children,
  style,
  scrollable = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        themeRuntimeValues[theme].background.primary.darker,
        themeRuntimeValues[theme].background.primary.lighter,
        themeRuntimeValues[theme].background.primary.DEFAULT,
      ]}
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
