import { Menu, MenuAction } from '@/components/menu';
import { Text } from '@/components/ui/texts';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ICON = 18;

function ChevronLeft({ color }: { color: string }) {
  return (
    <Svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 6l-6 6 6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Dots({ color }: { color: string }) {
  return (
    <Svg width={ICON} height={ICON} viewBox="0 0 24 24" fill={color}>
      <Path d="M5 10a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4z" />
    </Svg>
  );
}

function CircleButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="border-foreground-darker h-10 w-10 items-center justify-center rounded-full border"
    >
      {children}
    </Pressable>
  );
}

export function Header({
  title,
  subtitle,
  actions,
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  actions?: MenuAction[];
  rightSlot?: React.ReactNode;
}) {
  const canBack = router.canGoBack();
  const hasMenu = actions && actions.length > 0;

  return (
    <View className="flex-row items-center justify-between pb-5">
      {canBack && (
        <View className="w-10 items-start">
          <CircleButton onPress={() => router.back()}>
            <ChevronLeft color="#caa05a" />
          </CircleButton>
        </View>
      )}
      <View className={canBack ? 'flex-1 items-center' : 'flex-1 items-start'}>
        {subtitle && (
          <Text className="text-foreground-darker text-xs tracking-widest">
            {subtitle.toUpperCase()}
          </Text>
        )}
        <Text className="font-cinzel-semibold text-foreground text-2xl">
          {title}
        </Text>
      </View>
      <View className="items-end">
        {hasMenu ? (
          <Menu actions={actions}>
            <CircleButton>
              <Dots color="#caa05a" />
            </CircleButton>
          </Menu>
        ) : (
          rightSlot ?? <View className="w-10" />
        )}
      </View>
    </View>
  );
}
