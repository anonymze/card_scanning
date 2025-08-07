import { useLoaderGlobal } from '@/lib/loader-store';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

export default function Page() {
  const { stop } = useLoaderGlobal();

  useFocusEffect(
    React.useCallback(() => {
      console.log('Decks tab focused');
      stop();
    }, [stop]),
  );

  return (
    <View className="flex-1 bg-blue-200">
      <Text>Okiddddd</Text>
    </View>
  );
}
