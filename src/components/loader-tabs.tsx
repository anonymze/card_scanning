import {
    BlurMask,
    Canvas,
    interpolate,
    Path,
    Skia,
    SweepGradient,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import config from "tailwind.config";

const canvasPadding = 20;

export const LoaderTabs = ({ width, height, loading }: { width: number, height: number, loading: boolean }) => {
  const canvasSize = React.useRef({width: width, height: height});
  const circleSize = React.useRef(width);
  const progress = useSharedValue(0);

  // basic rotation animation
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(loading ? 1 : 0, { duration: 1000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [loading]);

  const rContainerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${Math.PI * 2 * progress.value}rad`  }],
  }));

  // path made in svg skia
  const circlePath = React.useMemo(() => {
    const skiaPath = Skia.Path.Make();
    skiaPath.addCircle(
      (canvasSize.current.width / 2) + (canvasPadding / 2),
      (canvasSize.current.height / 2) + (canvasPadding / 2),
      circleSize.current / 2,
    );
    return skiaPath;
  }, []);


  // create the empty corner path
  const startPath = useDerivedValue(() =>
    interpolate(progress.value, [0, 0.7, 1], [0.8, 0.5, 0.8]),
  );

  return (
    <>
      <Animated.View
        style={[rContainerStyle, {
          width: canvasSize.current.width,
          height: canvasSize.current.height,
        }]}
        className="items-center justify-center rounded-full bg-background-primaryDark"
      >
        <Canvas
          style={{
            width: canvasSize.current.width + canvasPadding,
            height: canvasSize.current.height + canvasPadding,
            pointerEvents: 'none'
          }}
        >
          <Path
            path={circlePath}
            color="white"
            style="stroke"
            strokeWidth={12}
            strokeCap="round"
            start={loading ? startPath : 0}
            end={1}
          >
            <SweepGradient
              c={{
                x: (canvasSize.current.width / 2) + (canvasPadding / 2),
                y: (canvasSize.current.height / 2) + (canvasPadding / 2),
              }}
              colors={[config.theme.extend.colors.foregroundDark, config.theme.extend.colors.foregroundLight, config.theme.extend.colors.foregroundDark ]}
            />
            <BlurMask blur={3} style="solid" />
          </Path>
        </Canvas>
      </Animated.View>
        <Text className="absolute top-1/2 -translate-y-1/2  text-foreground">Oki</Text>
    </>
  );
}
