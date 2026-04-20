import BackgroundLayout from '@/layouts/background-layout';
import { Header } from '@/layouts/header';
import { useDecks } from '@/stores/decks-store';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const deck = useDecks((s) => s.decks.find((d) => d.id === id));
  const deleteDeck = useDecks((s) => s.deleteDeck);

  if (!deck) return null;

  return (
    <BackgroundLayout>
      <Header
        title={deck.name}
        subtitle="Deck"
        actions={[
          { label: 'Rename', onPress: () => {} },
          {
            label: 'Delete',
            destructive: true,
            onPress: () => {
              deleteDeck(deck.id);
              router.back();
            },
          },
        ]}
      />
      <View />
    </BackgroundLayout>
  );
}
