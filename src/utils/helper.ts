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
