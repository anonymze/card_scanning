import { LoaderTabs } from '@/components/loader-tabs';
import { Tabs } from 'expo-router';
import config from 'tailwind.config';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: config.theme.extend.colors.background.primaryDark,
        borderTopColor: config.theme.extend.colors.foregroundDark,
        borderTopWidth: 1,
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
          tabBarIcon: () => {
            return (
              <LoaderTabs width={100} height={100} loading={true} />
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
