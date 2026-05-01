import { Button } from '@/components/ui/buttons';
import { Text } from '@/components/ui/texts';
import BackgroundLayout from '@/layouts/background-layout';
import { router, Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <BackgroundLayout className="items-center justify-center">
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="items-center gap-6">
        <Text className="text-xl">Oops ! This page does not exist.</Text>
        <Button title="Go Home" onPress={() => router.replace('/')} />
      </View>
    </BackgroundLayout>
  );
}
