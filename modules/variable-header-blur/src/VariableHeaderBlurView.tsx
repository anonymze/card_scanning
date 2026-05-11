import { requireNativeViewManager } from "expo-modules-core";
import { VariableHeaderBlurViewProps } from "./VariableHeaderBlur.types"; // Adjust path as needed

const NativeView = requireNativeViewManager("VariableHeaderBlur");

export default function VariableHeaderBlurView({
  children,
  ...props
}: VariableHeaderBlurViewProps) {
  return <NativeView {...props}>{children}</NativeView>;
}
