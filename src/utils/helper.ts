import { Dimensions } from 'react-native';

export const SCREEN_DIMENSIONS = {
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height,
};

/**
 * @description pause the thread for a given time
 */
export const sleep = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
};

export const sleepUntilNextFrame = () => {
	return new Promise(resolve => requestAnimationFrame(resolve));
};
