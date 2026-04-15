import { Text } from '@/components/ui/texts';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

function LoadingIllustration({ size = 280 }: { size?: number }) {
  const scan = useSharedValue(0);

  React.useEffect(() => {
    scan.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const scanGlowProps = useAnimatedProps(() => ({
    y: interpolate(scan.value, [0, 1], [55, 147]),
    opacity: interpolate(
      scan.value,
      [0, 0.1, 0.5, 0.9, 1],
      [0.08, 0.25, 0.15, 0.25, 0.08],
    ),
  }));

  const scanCoreProps = useAnimatedProps(() => ({
    y: interpolate(scan.value, [0, 1], [58, 150]),
    opacity: interpolate(
      scan.value,
      [0, 0.1, 0.5, 0.9, 1],
      [0.4, 0.9, 0.7, 0.9, 0.4],
    ),
  }));

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="loading-glow" cx="50%" cy="52%" r="45%">
          <Stop offset="0%" stopColor="#E5A520" stopOpacity="0.18" />
          <Stop offset="100%" stopColor="#E5A520" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Radial golden glow */}
      <Rect x="0" y="0" width="200" height="200" fill="url(#loading-glow)" />

      {/* Back card — rotated, faded */}
      <G transform="rotate(-13, 100, 106)">
        <Rect
          x="62"
          y="52"
          width="76"
          height="108"
          rx="7"
          fill="#0F1826"
          stroke="#253040"
          strokeWidth="1.5"
          opacity="0.55"
        />
      </G>

      {/* Middle card — rotated, medium */}
      <G transform="rotate(-7, 100, 106)">
        <Rect
          x="62"
          y="52"
          width="76"
          height="108"
          rx="7"
          fill="#111D2E"
          stroke="#2E4060"
          strokeWidth="1.5"
          opacity="0.8"
        />
      </G>

      {/* Front card — golden dashed border */}
      <Rect
        x="62"
        y="52"
        width="76"
        height="108"
        rx="7"
        fill="#0E1A2A"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeDasharray="7 4"
      />

      {/* Corner brackets (scanner viewfinder) */}
      <Path
        d="M68 58 L68 65 M68 58 L75 58"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <Path
        d="M132 58 L132 65 M132 58 L125 58"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <Path
        d="M68 154 L68 147 M68 154 L75 154"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <Path
        d="M132 154 L132 147 M132 154 L125 154"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Scan line — glow (wider, blurred) */}
      <AnimatedRect
        x={65}
        width={70}
        height={8}
        rx={4}
        fill="#E5A520"
        animatedProps={scanGlowProps}
      />

      {/* Scan line — core (sharp, bright) */}
      <AnimatedRect
        x={68}
        width={64}
        height={2}
        rx={1}
        fill="#E5A520"
        animatedProps={scanCoreProps}
      />

      {/* Sparkles & stars — same as empty state */}
      <Circle cx="148" cy="62" r="2" fill="#E5A520" opacity="0.45" />
      <Circle cx="155" cy="75" r="1.2" fill="#E5A520" opacity="0.25" />
      <Circle cx="52" cy="80" r="1.8" fill="#E5A520" opacity="0.35" />
      <Circle cx="46" cy="120" r="1.2" fill="#E5A520" opacity="0.2" />
      <Circle cx="152" cy="130" r="1.5" fill="#E5A520" opacity="0.3" />
      <Path
        d="M44 60 L45.5 63 L49 64.5 L45.5 66 L44 69 L42.5 66 L39 64.5 L42.5 63 Z"
        fill="#E5A520"
        opacity="0.25"
      />
      <Path
        d="M158 100 L159 102.5 L161.5 103.5 L159 104.5 L158 107 L157 104.5 L154.5 103.5 L157 102.5 Z"
        fill="#E5A520"
        opacity="0.2"
      />
    </Svg>
  );
}

export function LoadingPlaceholder({
  title,
  size = 280,
}: {
  title?: string;
  size?: number;
}) {
  const opacity = useSharedValue(0.4);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 items-center justify-center">
      <LoadingIllustration size={size} />
      <Animated.Text
        style={pulseStyle}
        className="font-cinzel-semibold text-foreground text-center"
      >
        {title}
      </Animated.Text>
    </View>
  );
}
function NotFoundIllustration({ size = 280 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="notfound-glow" cx="50%" cy="52%" r="45%">
          <Stop offset="0%" stopColor="#E5A520" stopOpacity="0.18" />
          <Stop offset="100%" stopColor="#E5A520" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="200" height="200" fill="url(#notfound-glow)" />
      <G transform="rotate(-13, 100, 106)">
        <Rect
          x="62"
          y="52"
          width="76"
          height="108"
          rx="7"
          fill="#0F1826"
          stroke="#253040"
          strokeWidth="1.5"
          opacity="0.55"
        />
      </G>
      <G transform="rotate(-7, 100, 106)">
        <Rect
          x="62"
          y="52"
          width="76"
          height="108"
          rx="7"
          fill="#111D2E"
          stroke="#2E4060"
          strokeWidth="1.5"
          opacity="0.8"
        />
      </G>
      <Rect
        x="62"
        y="52"
        width="76"
        height="108"
        rx="7"
        fill="#0E1A2A"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeDasharray="7 4"
      />
      <Path
        d="M68 58 L68 65 M68 58 L75 58"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <Path
        d="M132 58 L132 65 M132 58 L125 58"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <Path
        d="M68 154 L68 147 M68 154 L75 154"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <Path
        d="M132 154 L132 147 M132 154 L125 154"
        stroke="#E5A520"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <Path
        d="M90 96 L110 116"
        stroke="#E5A520"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <Path
        d="M110 96 L90 116"
        stroke="#E5A520"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <Circle cx="148" cy="62" r="2" fill="#E5A520" opacity="0.45" />
      <Circle cx="155" cy="75" r="1.2" fill="#E5A520" opacity="0.25" />
      <Circle cx="52" cy="80" r="1.8" fill="#E5A520" opacity="0.35" />
      <Circle cx="46" cy="120" r="1.2" fill="#E5A520" opacity="0.2" />
      <Circle cx="152" cy="130" r="1.5" fill="#E5A520" opacity="0.3" />
      <Path
        d="M44 60 L45.5 63 L49 64.5 L45.5 66 L44 69 L42.5 66 L39 64.5 L42.5 63 Z"
        fill="#E5A520"
        opacity="0.25"
      />
      <Path
        d="M158 100 L159 102.5 L161.5 103.5 L159 104.5 L158 107 L157 104.5 L154.5 103.5 L157 102.5 Z"
        fill="#E5A520"
        opacity="0.2"
      />
    </Svg>
  );
}

export function NotFoundPlaceholder({
  title,
  size = 280,
}: {
  title?: string;
  size?: number;
}) {
  return (
    <View className="flex-1 items-center justify-center">
      <NotFoundIllustration size={size} />
      <Text className="font-cinzel-semibold text-foreground text-center">
        {title}
      </Text>
    </View>
  );
}
