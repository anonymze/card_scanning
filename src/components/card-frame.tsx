import { MyTouchableOpacity } from '@/components/my-pressable';
import React from 'react';
import { View } from 'react-native';
import { TextTitle } from './ui/texts';
import { Text } from 'react-native';
import { useCSSVariable } from 'uniwind';

type CardFrameVariant = 'collection' | 'deck';

const GRADIENT_VARS: Record<CardFrameVariant, [string, string]> = {
  collection: ['--color-card-collection', '--color-card-collection-lighter'],
  deck: ['--color-card-deck', '--color-card-deck-lighter'],
};

const CardFrame = ({
  title,
  children,
  onDelete,
  variant = 'collection',
}: {
  title: string;
  children: React.ReactNode;
  onDelete?: () => void;
  variant?: CardFrameVariant;
}) => {
  const vars = GRADIENT_VARS[variant];
  const [base, lighter] = useCSSVariable(vars);
  return (
    <View className="border-foreground-darker rounded-xl border-2 p-1.5">
      <View className={`border-foreground-darker/40 rounded-lg border ${variant === 'deck' ? 'border-dashed' : ''}`}>
        <View className="bg-background-primary-lighter mx-2 mt-2 mb-2 overflow-hidden rounded-md">
          <View
            style={{
              experimental_backgroundImage: `linear-gradient(90deg, ${base}, ${lighter}, ${base})`,
            }}
            className="flex-row items-center justify-between px-4 py-2.5 gap-3 w-full"
          >
            <TextTitle className="text-foreground text-lg flex-1">{title}</TextTitle>
            {onDelete ? (
              <MyTouchableOpacity
                onPress={onDelete}
                hitSlop={15}
                className="bg-foreground-darker/30 h-6 w-6 items-center justify-center rounded-full"
              >
                <Text className="text-foreground text-xs font-bold leading-none">✕</Text>
              </MyTouchableOpacity>
            ) : (
              <View className="flex-row items-center gap-1.5">
                {variant === 'deck' ? (
                  <View className="bg-foreground-darker h-3 w-3 rotate-45 rounded-sm" />
                ) : (
                  <View className="bg-foreground-darker h-2.5 w-2.5 rounded-full" />
                )}
              </View>
            )}
          </View>
        </View>

        {/* Content */}
        <View className="bg-background-primary/50 mx-2 mb-2 rounded-md p-4">
          {children}
        </View>
      </View>
    </View>
  );
};

export { CardFrame };
