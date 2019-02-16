import Responsive from 'react-responsive';
import css from 'styled-jsx/css';

export const theme = {
	primary: '#52082d',
	info: '#331507',
	success: '#eaccb2',
	primaryShadow: 'rgba(82, 8, 45, 0.3)',
	primaryHalf: 'rgba(82, 8, 45, 0.8)',
	infoShadow: 'rgba(51, 21, 7, 0.5)',
	successShadow: 'rgba(234, 204, 178, 0.3)',
	minWidth: '300px',
};

const maxWidth = {
	smallhandset: 359,
	handset: 599,
	largehandset: 719,
	tablet: 1023,
	laptop: 1439,
	desktop: 1919,
};

const minWidth = {
	handset: 360,
	largehandset: 600,
	tablet: 720,
	laptop: 960,
	desktop: 1440,
	widescreen: 1920,
};

export const maxMedia = Object.keys(maxWidth).reduce((acc, label) => {
	const emSize = maxWidth[label] / 16;
	acc[label] = (...args) => css.resolve`
      @media screen and (max-width: ${emSize}em) {
          ${css.resolve(...args)};
      }
    `;
	return acc;
}, {});

export const minMedia = Object.keys(minWidth).reduce((acc, label) => {
	const emSize = minWidth[label] / 16;
	acc[label] = (...args) => css.resolve`
      @media screen and (min-width: ${emSize}em) {
          ${css.resolve(...args)};
      }
    `;
	return acc;
}, {});

export const WideScreen = props => <Responsive {...props} minWidth={1920} />;
export const Desktop = props => (
	<Responsive {...props} minWidth={1440} maxWidth={1919} />
);
export const Laptop = props => (
	<Responsive
		{...props}
		minWidth={960}
		maxWidth={1439}
		orientation="landscape"
	/>
);
export const Tablet = props => (
	<Responsive
		{...props}
		minWidth={720}
		maxWidth={1023}
		orientation="portrait"
	/>
);
export const HandsetLandscape = props => (
	<Responsive
		{...props}
		minWidth={480}
		maxWidth={959}
		orientation="landscape"
	/>
);
export const LargeHandset = props => (
	<Responsive
		{...props}
		minWidth={600}
		maxWidth={719}
		orientation="portrait"
	/>
);
export const Handset = props => (
	<Responsive {...props} minWidth={360} maxWidth={599} />
);
export const SmallHandset = props => <Responsive {...props} maxWidth={359} />;
export const Default = props => <Responsive {...props} minWidth={600} />;
export const BelowDefault = props => <Responsive {...props} maxWidth={599} />;
export const Touch = props => <Responsive {...props} maxWidth={1087} />
export const NonTouch = props => <Responsive {...props} minWidth={1088} />
export const GTLargeHandset = props => <Responsive {...props} minWidth={720} />
