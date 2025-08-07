import { useLoaderGlobal } from "@/lib/loader-store";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
const { start } = useLoaderGlobal();
  React.useEffect(() => {
    start();
  }, [])
  return (
    <View>
      <Text>Oki</Text>
    </View>
  )
}
