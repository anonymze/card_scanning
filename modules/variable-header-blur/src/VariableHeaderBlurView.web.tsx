import { VariableHeaderBlurViewProps } from './VariableHeaderBlur.types';

export default function VariableHeaderBlurView({
  children,
  style,
}: VariableHeaderBlurViewProps) {
  return <div style={style as React.CSSProperties}>{children}</div>;
}
