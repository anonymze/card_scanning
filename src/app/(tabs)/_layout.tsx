import { AnimatedTabIcon } from '@/components/animated-tab-icon';
import {
  CollectionIcon,
  DecksIcon,
  ScanIcon,
  SettingsIcon,
  ShopIcon,
} from '@/components/icons';
import { LoaderTabs } from '@/components/loader-tabs';
import { useLoaderGlobal } from '@/stores/loader-store';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabLayout() {
  const [activeTint, inactiveTint, background] = useCSSVariable([
    '--color-foreground',
    '--color-gray',
    '--color-background-primary-darker'
  ]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: background,
          borderTopColor: activeTint,
          borderTopWidth: 2,
        },
        tabBarLabelStyle: {
          marginTop: 4,
        },
        tabBarActiveTintColor: String(activeTint),
        tabBarInactiveTintColor: String(inactiveTint),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Collection',
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => {
            return (
              <AnimatedTabIcon focused={focused}>
                <CollectionIcon width={26} height={26} color={color} />
              </AnimatedTabIcon>
            );
          },
        }}
      />
      <Tabs.Screen
        name="decks"
        options={{
          title: 'Decks',
          tabBarItemStyle: { paddingRight: 20 },
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => {
            return (
              <AnimatedTabIcon focused={focused}>
                <DecksIcon width={26} height={26} color={color} />
              </AnimatedTabIcon>
            );
          },
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ color }: { color: string }) => {
            const { loading } = useLoaderGlobal();
            return (
              <>
                <LoaderTabs width={92} height={92} loading={loading} />
                <View className="absolute w-12 items-center justify-center gap-1">
                  <ScanIcon
                    width={28}
                    height={28}
                    stroke={color}
                    color={'transparent'}
                  />
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
        name="shop"
        options={{
          title: 'Shop',
          tabBarItemStyle: { paddingLeft: 20 },
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => {
            return (
              <AnimatedTabIcon focused={focused}>
                <ShopIcon width={26} height={26} color={color} />
              </AnimatedTabIcon>
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => {
            return (
              <AnimatedTabIcon focused={focused}>
                <SettingsIcon width={26} height={26} stroke={color} />
              </AnimatedTabIcon>
            );
          },
        }}
      />
    </Tabs>
  );
}
