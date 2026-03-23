import { EmptyState } from '@/components/empty-state';
import BackgroundLayout from '@/layouts/background-layout';

export default function Page() {
  const decks: unknown[] = [];

  return (
    <BackgroundLayout scrollable={decks.length > 0}>
      {decks.length === 0 ? (
        <EmptyState
          variant="decks"
          title="No decks yet"
          subtitle="Scan cards or add them manually to build your first deck"
        />
      ) : null}
    </BackgroundLayout>
  );
}
