import { LoaderTabs } from '@/components/loader-tabs';
import { useLoaderGlobal } from '@/lib/loader-store';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import config from 'tailwind.config';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: config.theme.extend.colors.background.primaryDark,
        borderTopColor: config.theme.extend.colors.foregroundDark,
        borderTopWidth: 2,
      },
      tabBarActiveTintColor: config.theme.extend.colors.foreground,
      tabBarInactiveTintColor: config.theme.extend.colors.gray,
    }
    }>
      <Tabs.Screen
        name="decks"
        options={{
          title: "Cartes",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }: { color: string}) => {
            const { loading } = useLoaderGlobal();
            return (
              <>
                <LoaderTabs width={100} height={100} loading={loading} />
                <Text className="absolute" style={{
                  color
                }}>Oki</Text>
              </>
            )
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Paramètres",
        }}
      />
    </Tabs>
  );
}
