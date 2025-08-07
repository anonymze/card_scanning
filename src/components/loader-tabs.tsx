import {
  BlurMask,
  Canvas,
  interpolate,
  Path,
  Skia,
  SweepGradient,
} from '@shopify/react-native-skia';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import config from 'tailwind.config';

// otherwise the circle is cut off at the edges
const canvasPadding = 20;

export const LoaderTabs = ({
  width,
  height,
  loading,
}: {
  width: number;
  height: number;
  loading: boolean;
}) => {
  const canvasSize = React.useRef({ width: width, height: height });
  const circleSize = React.useRef(width);
  const progress = useSharedValue(0);
  const loadingState = useSharedValue(0);

  // basic rotation animation that cancels smoothly
  React.useEffect(() => {
    progress.value = loading
      ? withRepeat(withTiming(1, { duration: 1000 }), -1, false)
      : withTiming(0, { duration: 400 });

    loadingState.value = loading
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 700 });
  }, [loading]);

  const rContainerStyle = useAnimatedStyle(() => ({
    // -0.95 should be calculated
    transform: [{ rotate: `${-0.95 + Math.PI * 2 * progress.value}rad` }],
  }));

  // path made in svg skia
  const circlePath = React.useMemo(() => {
    const skiaPath = Skia.Path.Make();
    skiaPath.addCircle(
      canvasSize.current.width / 2 + canvasPadding / 2,
      canvasSize.current.height / 2 + canvasPadding / 2,
      circleSize.current / 2,
    );
    return skiaPath;
  }, []);

  // create the empty corner path and animated
  const startPath = useDerivedValue(() => {
    const animatedStart = interpolate(
      progress.value,
      [0, 0.4, 1],
      [0.8, 0.5, 0.8],
    );
    const staticStart = 0;
    return interpolate(
      loadingState.value,
      [0, 1],
      [staticStart, animatedStart],
    );
  });

  return (
    <Animated.View
      style={[
        rContainerStyle,
        {
          width: canvasSize.current.width,
          height: canvasSize.current.height,
        },
      ]}
      className="items-center justify-center rounded-full border-2 border-foregroundDark bg-background-primaryDark"
    >
      <Canvas
        style={{
          width: canvasSize.current.width + canvasPadding,
          height: canvasSize.current.height + canvasPadding,
          pointerEvents: 'none',
        }}
      >
        <Path
          path={circlePath}
          color="white"
          style="stroke"
          strokeWidth={12}
          strokeCap="round"
          start={startPath}
          end={1}
        >
          <SweepGradient
            c={{
              x: canvasSize.current.width / 2 + canvasPadding / 2,
              y: canvasSize.current.height / 2 + canvasPadding / 2,
            }}
            colors={[
              config.theme.extend.colors.foregroundDark,
              config.theme.extend.colors.foregroundLight,
              config.theme.extend.colors.foregroundDark,
            ]}
          />
          <BlurMask blur={3} style="solid" />
        </Path>
      </Canvas>
    </Animated.View>
  );
};
