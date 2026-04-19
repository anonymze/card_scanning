import { BottomSheetRef } from "@/components/bottom-sheet";
import { Button } from "@/components/ui/buttons";
import { Text } from "react-native";
import { View } from "react-native";

export default function Header({ sheetRef}: { sheetRef:  React.RefObject<BottomSheetRef>}) {
  return (
    <View className="flex-row items-center justify-between pb-5">
      <Text className="font-cinzel-semibold text-foreground text-2xl">
        Collections
      </Text>
      <Button
        title="+ New"
        onPress={() => sheetRef.current?.present()}
        className="h-11 px-5"
      />
    </View>
  );
}
