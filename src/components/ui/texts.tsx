import { cn } from '@/lib/tailwind';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

const Text = ({ className, ...props }: TextProps) => {
  return <RNText className={cn('font-sans text-foreground', className)} {...props} />;
};

const TextTitle = ({ className, ...props }: TextProps) => {
  return <RNText className={cn('font-cinzel-semibold text-2xl text-foreground', className)} {...props} />;
};

export { Text, TextTitle };
