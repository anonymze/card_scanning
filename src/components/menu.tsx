import React from 'react';

export type MenuAction = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
  icon?: string;
};

// TEMP STUB — @react-native-menu/menu disabled to debug native crash
export function Menu({ children }: { actions: MenuAction[]; children: React.ReactNode }) {
  return <>{children}</>;
}
