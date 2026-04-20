import { MenuAction } from '@/components/menu';
import { LAYOUT_PADDING_INLINE } from '@/layouts/background-layout';
import { Header } from '@/layouts/header';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VariableHeaderBlurView } from 'variable-header-blur';

const HEADER_CONTENT_HEIGHT = 70;

export function BlurHeader(props: {
  title: string;
  subtitle?: string;
  actions?: MenuAction[];
  rightSlot?: React.ReactNode;
  back?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const totalHeight = HEADER_CONTENT_HEIGHT + insets.top;

  return (
    <>
      <VariableHeaderBlurView
        headerHeight={totalHeight}
        maxBlurRadius={6}
        tintOpacityTop={0.3}
        tintOpacityMiddle={0.1}
        style={[
          StyleSheet.absoluteFill,
          { height: totalHeight, paddingTop: insets.top },
        ]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            paddingTop: insets.top,
            paddingLeft: insets.left + LAYOUT_PADDING_INLINE,
            paddingRight: insets.right + LAYOUT_PADDING_INLINE,
          },
        ]}
      >
        <Header {...props} />
      </View>
    </>
  );
}

export const BLUR_HEADER_HEIGHT = HEADER_CONTENT_HEIGHT;
