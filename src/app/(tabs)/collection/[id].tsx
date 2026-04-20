import BackgroundLayout from '@/layouts/background-layout';
import { Header } from '@/layouts/header';
import { useCollections } from '@/stores/collections-store';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const collection = useCollections((s) =>
    s.collections.find((c) => c.id === id),
  );
  const deleteCollection = useCollections((s) => s.deleteCollection);

  if (!collection) return null;

  return (
    <BackgroundLayout>
      <Header
        title={collection.name}
        subtitle="Collection"
        actions={[
          { label: 'Rename', onPress: () => {} },
          {
            label: 'Delete',
            destructive: true,
            onPress: () => {
              deleteCollection(collection.id);
              router.back();
            },
          },
        ]}
      />
      <View />
    </BackgroundLayout>
  );
}
