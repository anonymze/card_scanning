import * as DevClient from 'expo-dev-client';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

if (__DEV__) {
  DevClient.registerDevMenuItems([
    {
      name: 'Toggle Theme',
      callback: () => console.log('Debug action triggered'),
      shouldCollapse: true,
    },
  ]);
}

const DevMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={{ position: 'absolute', top: 50, right: 20, zIndex: 9999 }}>
      <TouchableOpacity
        hitSlop={8}
        onPress={() => DevClient.openMenu()}
        style={{ backgroundColor: '#ff6b6b', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>🛠️ Dev</Text>
      </TouchableOpacity>
    </View>
  );
};

export { DevMenu };
