import { useLoaderGlobal } from '@/lib/loader-store';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Page() {
  const { start } = useLoaderGlobal();

  useFocusEffect(
    React.useCallback(() => {
      console.log('Decks tab focused');
      start();
    }, [start]),
  );

  return (
    <View className="flex-1 bg-red-200">
      <Text>Okiddddd</Text>
    </View>
  );
}
