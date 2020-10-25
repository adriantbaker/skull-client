/** Debounced useEffect hook implementation by mmiocevic */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resize } from '../../store/size/sizeActions';

const debounce = (delay, fn) => {
    let timerId;

    return function callback(...args) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
};

const useWindowWidth = (debounceTime = 0) => {
    const isClient = typeof window === 'object';

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isClient) {
            return () => {};
        }

        const getWidth = () => (isClient ? window.innerWidth : undefined);
        const setScreenSize = (windowWidth) => dispatch(resize(windowWidth));

        const handleResize = () => {
            setScreenSize(getWidth());
        };

        let handleResizeFn = handleResize;

        if (debounceTime) {
            handleResizeFn = debounce(debounceTime, handleResize);
        }

        handleResize(); // Initialize
        window.addEventListener('resize', handleResizeFn);

        return () => {
            window.removeEventListener('resize', handleResizeFn);
        };
    }, [dispatch, debounceTime, isClient]);
};

export default useWindowWidth;
