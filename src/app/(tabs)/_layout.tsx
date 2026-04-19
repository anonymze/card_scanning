import { AnimatedTabIcon } from '@/components/animated-tab-icon';
import { Icon } from '@/components/icons';
import { LoaderTabs } from '@/components/loader-tabs';
import { useLoaderGlobal } from '@/stores/loader-store';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

const ScanTabIcon = React.memo(({ color }: { color: string }) => {
  const { loading } = useLoaderGlobal();
  return (
    <>
      <LoaderTabs width={92} height={92} loading={loading} />
      <View className="absolute w-12 items-center justify-center gap-1">
        <Icon name="scan" size={28} color={color} />
        <Text style={{ color }} className="text-xs">
          Scan
        </Text>
      </View>
    </>
  );
});

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabLayout() {
  const [activeTint, inactiveTint, background] = useCSSVariable([
    '--color-foreground',
    '--color-gray',
    '--color-background-primary-darker',
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
                <Icon name="collection" size={26} color={color} />
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
                <Icon name="decks" size={26} color={color} />
              </AnimatedTabIcon>
            );
          },
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ color }: { color: string }) => (
            <ScanTabIcon color={color} />
          ),
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
                <Icon name="shop" size={26} color={color} />
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
                <Icon name="settings" size={26} color={color} />
              </AnimatedTabIcon>
            );
          },
        }}
      />
    </Tabs>
  );
}
