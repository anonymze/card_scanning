import { DecksIcon, ScanIcon, SettingsIcon } from '@/components/icons';
import { LoaderTabs } from '@/components/loader-tabs';
import { useLoaderGlobal } from '@/lib/loader-store';
import { themeRuntimeValues, useTheme } from '@/styles/theme';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themeRuntimeValues[theme].background.primary.darker,
          borderTopColor: themeRuntimeValues[theme].foreground.darker,
          borderTopWidth: 2,
        },
        tabBarLabelStyle: {
          marginTop: 4,
        },
        tabBarActiveTintColor: themeRuntimeValues[theme].foreground.DEFAULT,
        tabBarInactiveTintColor: themeRuntimeValues[theme].gray,
      }}
    >
      <Tabs.Screen
        name="decks"
        options={{
          title: 'Decks',
          tabBarIcon: ({ color }: { color: string }) => {
            return <DecksIcon width={26} height={26} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }: { color: string }) => {
            const { loading } = useLoaderGlobal();
            return (
              <>
                <LoaderTabs width={100} height={100} loading={loading} />
                <View className="absolute w-12 items-center justify-center gap-1">
                  <ScanIcon width={28} height={28} stroke={color} color={"transparent"} />
                  <Text
                    style={{
                      color,
                    }}
                    className="text-xs"
                  >
                    Scan
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color }: { color: string }) => {
            return <SettingsIcon width={26} height={26} stroke={color} />;
          },
        }}
      />
    </Tabs>
  );
}
