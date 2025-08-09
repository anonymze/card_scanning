import { DecksIcon, ScanIcon, SettingsIcon } from '@/components/icons';
import { LoaderTabs } from '@/components/loader-tabs';
import { useLoaderGlobal } from '@/lib/loader-store';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import config from 'tailwind.config';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: config.theme.extend.colors.background.primaryDark,
          borderTopColor: config.theme.extend.colors.foregroundDark,
          borderTopWidth: 2,
        },
        tabBarLabelStyle: {
          marginTop: 4,
        },
        tabBarActiveTintColor: config.theme.extend.colors.foreground.DEFAULT,
        tabBarInactiveTintColor: config.theme.extend.colors.gray,
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
                  <ScanIcon width={28} height={28} stroke={color} />
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
