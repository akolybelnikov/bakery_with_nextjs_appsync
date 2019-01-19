const FontFaceObserver = require('fontfaceobserver');

const Fonts = () => {
	const link = document.createElement('link');
	link.href =
		'https://fonts.googleapis.com/css?family=Raleway:300,400,500,700,900';
	link.rel = 'stylesheet';

	document.head.appendChild(link);
	const raleway = new FontFaceObserver('Raleway');
	raleway.load().then(() => {
		document.documentElement.classList.add('raleway');
	});
};

export default Fonts;
