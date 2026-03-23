import { EmptyCardsIllustration, EmptyStateVariant } from '@/components/icons';
import { View } from 'react-native';
import { MyTouchableScaleOpacity } from './my-pressable';
import { Text } from './ui/texts';

type EmptyStateProps = {
  variant: EmptyStateVariant;
  title: string;
  subtitle?: string;
  size?: number;
};

export const EmptyState = ({
  variant,
  title,
  subtitle,
  size = 280,
}: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <EmptyCardsIllustration size={size} variant={variant} />
      <View className="items-center gap-2">
        <Text className="text-foreground text-center text-xl font-semibold">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-foreground-darker max-w-72 text-center">
            {subtitle}
          </Text>
        ) : null}

        <MyTouchableScaleOpacity
					onPress={() => {
						// deleteChatRoom.mutate(chatId as string);
					}}
					className="mt-4 flex-row items-center gap-3 rounded-xl bg-white p-2 shadow shadow-defaultGray/10"
				>
					<View className="size-14 items-center justify-center rounded-xl bg-red-200">
						{/*<TrashIcon size={22} color={config.theme.extend.colors.red2} />*/}
					</View>
					<Text className="text-md font-semibold text-red2">Supprimer le groupe</Text>
					{/*{deleteChatRoom.isPending && (
						<ActivityIndicator size="small" className="ml-auto mr-3" color={config.theme.extend.colors.red2} />
					)}*/}
				</MyTouchableScaleOpacity>
      </View>
    </View>
  );
};
