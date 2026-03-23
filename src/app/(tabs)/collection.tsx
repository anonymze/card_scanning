import { EmptyState } from '@/components/empty-state';
import BackgroundLayout from '@/layouts/background-layout';

export default function Page() {
  const cards: unknown[] = [];

  return (
    <BackgroundLayout scrollable={cards.length > 0}>
      {cards.length === 0 ? (
        <EmptyState
          variant="collection"
          title="Your collection is empty"
          subtitle="Scan cards or add them manually to build your first collection"
        />
      ) : null}
    </BackgroundLayout>
  );
}
