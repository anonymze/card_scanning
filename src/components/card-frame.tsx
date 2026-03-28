import React from 'react';
import { View } from 'react-native';
import { TextTitle } from './ui/texts';

const CardFrame = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View className="border-foreground-darker rounded-xl border-2 p-1.5">
      <View className="border-foreground-darker/40 rounded-lg border">
        {/* Title bar */}
        <View className="bg-background-primary-lighter mx-2 mt-2 mb-2 overflow-hidden rounded-md">
          <View
            style={{
              experimental_backgroundImage:
                'linear-gradient(90deg, hsl(38,50%,20%), hsl(38,40%,28%), hsl(38,50%,20%))',
            }}
            className="flex-row items-center justify-between px-4 py-2.5"
          >
            <TextTitle className="text-foreground text-lg">{title}</TextTitle>
            <View className="flex-row items-center gap-1.5">
              <View className="bg-foreground-darker h-2.5 w-2.5 rounded-full" />
            </View>
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
