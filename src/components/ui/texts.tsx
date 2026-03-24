import { cn } from '@/lib/tailwind';
import { Text as RNText, TextProps } from 'react-native';

const Text = ({ className, ...props }: TextProps) => {
  return (
    <RNText className={cn('text-foreground font-sans', className)} {...props} />
  );
};

const TextTitle = ({ className, ...props }: TextProps) => {
  return (
    <RNText
      className={cn('font-cinzel-semibold text-foreground text-2xl', className)}
      {...props}
    />
  );
};

export { Text, TextTitle };
