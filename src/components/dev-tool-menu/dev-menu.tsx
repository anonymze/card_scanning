import * as DevClient from 'expo-dev-client';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

if (__DEV__) {
  DevClient.registerDevMenuItems([
    {
      name: '!!!!!!',
      callback: () => console.log('Debug action triggered'),
      shouldCollapse: false,
    },
  ]);
}

const DevMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={{ position: 'absolute', top: 50, right: 20, zIndex: 9999 }}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{ backgroundColor: '#ff6b6b', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>🛠️ Dev</Text>
      </TouchableOpacity>

      {open && (
        <View
          style={{
            backgroundColor: 'white',
            padding: 15,
            marginTop: 5,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Dev Tools
          </Text>
          <TouchableOpacity
            onPress={() => DevClient.openMenu()}
            style={{ padding: 8, backgroundColor: '#4ecdc4', borderRadius: 3 }}
          >
            <Text style={{ color: 'white' }}>Debug Action</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export { DevMenu };
