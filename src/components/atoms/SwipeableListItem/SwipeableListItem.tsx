import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type ContextType = {
  startX: number;
};

type SwipeableListItemProps = {
  children: React.ReactNode;
  onSwipeLeftComplete: () => void;
  onSwipeRightComplete: () => void;
  threshold?: number;
};

const SwipeableListItem: React.FC<SwipeableListItemProps> = ({
  children,
  onSwipeLeftComplete,
  onSwipeRightComplete,
  threshold = SCREEN_WIDTH * 0.5,
}) => {
  const translateX = useSharedValue(0);
  const maxClamp = SCREEN_WIDTH;

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onActive: (event, ctx) => {
      let newTranslateX = ctx.startX + event.translationX;
      newTranslateX = Math.min(Math.max(newTranslateX, -maxClamp), maxClamp);
      translateX.value = newTranslateX;
    },
    onEnd: () => {
      if (translateX.value < -threshold) {
        translateX.value = withTiming(-SCREEN_WIDTH, {duration: 200}, () => {
          runOnJS(onSwipeLeftComplete)();
        });
      } else if (translateX.value > threshold) {
        translateX.value = withTiming(SCREEN_WIDTH, {duration: 200}, () => {
          runOnJS(onSwipeRightComplete)();
        });
      } else {
        translateX.value = withSpring(0, {damping: 20, stiffness: 300});
      }
    },
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const absX = Math.abs(translateX.value);
    const backgroundColor = interpolateColor(
      absX,
      [threshold, SCREEN_WIDTH],
      ['lightblue', 'red'],
    );
    return {
      backgroundColor: absX > threshold ? backgroundColor : 'lightblue',
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    height: 70,
    justifyContent: 'center',
  },
});

export default SwipeableListItem;
