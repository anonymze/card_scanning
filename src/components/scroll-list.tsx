import { BLUR_HEADER_HEIGHT } from '@/layouts/blur-header';
import { LegendList } from '@legendapp/list/react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type LegendListProps<T> = React.ComponentProps<typeof LegendList<T>>;

export function ScrollList<T>({
  blurHeader,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  ...props
}: LegendListProps<T> & { blurHeader?: boolean }) {
  const insets = useSafeAreaInsets();

  const mergedContentContainerStyle = blurHeader
    ? [{ paddingTop: BLUR_HEADER_HEIGHT + insets.top }, contentContainerStyle]
    : contentContainerStyle;

  return (
    <LegendList
      {...props}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={mergedContentContainerStyle}
      style={{ flex: 1 }}
    />
  );
}
