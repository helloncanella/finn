import React from 'react';
import { layoutGenerator } from 'react-break';

const layout = layoutGenerator({
    mobile: 0,
    phablet: 640,
    tablet: 768,
    desktop: 1024,
});

export const OnMobile = layout.is('mobile');
export const AtLeastTablet = layout.isAtLeast('tablet');
export const AtMostTablet = layout.isAtMost('tablet');
export const AtLeastPhablet = layout.isAtLeast('phablet');
export const AtMostPhablet = layout.isAtMost('phablet');
export const OnDesktop = layout.is('desktop');

