import { RESIZE } from './sizeTypes';

const checkSize = (screenWidth) => {
    if (screenWidth >= 1280) {
        return 'xl';
    }
    if (screenWidth >= 1024) {
        return 'lg';
    }
    if (screenWidth >= 768) {
        return 'md';
    }
    if (screenWidth >= 640) {
        return 'sm';
    }
    return 'xs';
};

// eslint-disable-next-line import/prefer-default-export
export function resize(screenWidth) {
    return (dispatch, getState) => {
        const { screenSize } = getState().size;
        const newScreenSize = checkSize(screenWidth);
        if (screenSize !== newScreenSize) {
            dispatch({
                type: RESIZE,
                screenSize: newScreenSize,
            });
        }
    };
}

const screenSizes = {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
};

export const screenIsAtLeast = (
    screenSize,
    desiredSize,
) => screenSizes[screenSize] >= screenSizes[desiredSize];

export const screenIsAtMost = (
    screenSize,
    desiredSize,
) => screenSizes[screenSize] <= screenSizes[desiredSize];

export const screenIsMobile = (screenSize) => screenIsAtMost(screenSize, 'xs');
