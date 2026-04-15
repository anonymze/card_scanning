import {
  createAnimatedPressable,
  CustomPressableProps,
  PressableOpacity,
  PressableScale,
} from 'pressto';
import { Pressable, PressableProps } from 'react-native-gesture-handler';
import { withUniwind } from 'uniwind';

type CustomPressablePropsWithClassName = CustomPressableProps & {
  className?: string;
};
type RNGHPressablePropsWithClassName = PressableProps & { className?: string };

const BASE_HIT_SLOP = 10;

const PressableScaleOpacity = createAnimatedPressable((progress) => {
  'worklet';
  return {
    transform: [
      {
        translateX: progress * 1.5,
      },
      {
        scale: 1 - progress * 0.02,
      },
    ],
    opacity: 1 - progress * 0.4,
  };
});

const StyledPressableScaleOpacity = withUniwind(PressableScaleOpacity);
const StyledPressableOpacity = withUniwind(PressableOpacity);
const StyledPressableScale = withUniwind(PressableScale);
const StyledPressable = withUniwind(Pressable);

const MyTouchableScaleOpacity = ({
  children,
  ...props
}: CustomPressablePropsWithClassName) => {
  return (
    <StyledPressableScaleOpacity hitSlop={BASE_HIT_SLOP} {...props}>
      {children}
    </StyledPressableScaleOpacity>
  );
};

const MyTouchableOpacity = ({
  children,
  ...props
}: CustomPressablePropsWithClassName) => {
  return (
    <StyledPressableOpacity hitSlop={BASE_HIT_SLOP} {...props}>
      {children}
    </StyledPressableOpacity>
  );
};

const MyTouchableScale = ({
  children,
  ...props
}: CustomPressablePropsWithClassName) => {
  return (
    <StyledPressableScale hitSlop={BASE_HIT_SLOP} {...props}>
      {children}
    </StyledPressableScale>
  );
};

const MyPressable = ({
  children,
  ...props
}: RNGHPressablePropsWithClassName) => {
  return (
    <StyledPressable hitSlop={BASE_HIT_SLOP} {...props}>
      {children}
    </StyledPressable>
  );
};

export {
  MyTouchableOpacity,
  MyTouchableScale,
  MyTouchableScaleOpacity,
  MyPressable,
};
