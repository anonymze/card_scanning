import { Icon } from '@/components/icons';
import { Menu, MenuAction } from '@/components/menu';
import {
  MyTouchableScale,
  MyTouchableScaleOpacity,
} from '@/components/my-pressable';
import { Text } from '@/components/ui/texts';
import { cn } from '@/libs/tailwind';
import { router, usePathname } from 'expo-router';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

function IconCard({
  children,
  onPress,
  withOpacity,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  withOpacity?: boolean;
}) {
  const Component = withOpacity ? MyTouchableScaleOpacity : MyTouchableScale;
  return (
    <Component
      onPress={onPress}
      className="border-foreground-darker h-10 w-10 items-center justify-center rounded-xl border"
    >
      {children}
    </Component>
  );
}

export function Header({
  title,
  subtitle,
  actions,
  rightSlot,
  back,
}: {
  title: string;
  subtitle?: string;
  actions?: MenuAction[];
  rightSlot?: React.ReactNode;
  back?: boolean;
}) {
  const [foreground] = useCSSVariable(['--color-foreground']);
  const pathname = usePathname();
  const hasMenu = actions && actions.length > 0;
  const showBack =
    back ?? pathname.split('/').filter(Boolean).length > 1;

  return (
    <View className="flex-row items-center justify-between">
      {showBack && (
        <View className="w-10 items-start">
          <IconCard withOpacity onPress={() => router.back()}>
            <Icon name="chevron-left" size={18} color={String(foreground)} />
          </IconCard>
        </View>
      )}
      <View className={cn('flex-1 items-start', showBack && 'pl-3')}>
        {subtitle && (
          <Text className="text-gray text-xs tracking-[3px] uppercase" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        <Text className="font-cinzel-semibold text-foreground text-2xl" numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View className="items-end">
        {hasMenu ? (
          <Menu actions={actions}>
            <IconCard>
              <Icon name="dots" size={18} color={String(foreground)} />
            </IconCard>
          </Menu>
        ) : (
          rightSlot ?? <View className="w-10" />
        )}
      </View>
    </View>
  );
}
