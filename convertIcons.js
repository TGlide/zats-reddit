import { JSDOM } from 'jsdom';
import glob from 'glob';
import fs from 'fs';

function convertSvgIcon(svgString, name = 'icon') {
	// Load the input SVG string into a DOM object
	const inputSvg = new JSDOM(svgString).window.document.querySelector('svg');

	// Create a new SVG element
	const outputSvg = inputSvg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');

	// Add the XML namespace attribute to the new SVG element
	outputSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	// Create a new symbol element
	const defs = outputSvg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'defs');
	const symbol = outputSvg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'symbol');
	defs.appendChild(symbol);

	// Extract necessary attributes
	const attributes = {
		id: name,
		viewBox: inputSvg.getAttribute('viewBox') || '0 0 24 24',
		'stroke-width': inputSvg.getAttribute('stroke-width') || '2',
		stroke: inputSvg.getAttribute('stroke') || 'currentColor',
		fill: inputSvg.getAttribute('fill') || 'none',
		'stroke-linecap': inputSvg.getAttribute('stroke-linecap') || 'round',
		'stroke-linejoin': inputSvg.getAttribute('stroke-linejoin') || 'round'
	};

	// Set attributes on the symbol element
	Object.keys(attributes).forEach((key) => {
		symbol.setAttribute(key, attributes[key]);
	});

	const childArr = [];
	for (let i = 0; i < inputSvg.children.length; i++) {
		const child = inputSvg.children.item(i);
		childArr.push(child);
	}

	// Move all child nodes from the input SVG to the symbol element
	childArr.forEach((child) => {
		symbol.appendChild(child);
	});

	// Add the symbol element to the new SVG element
	outputSvg.appendChild(defs);

	// Return the string representation of the new SVG
	return outputSvg.outerHTML;
}

const svgPaths = glob.sync('static/icons/original/*.svg', { absolute: true });
svgPaths.forEach((path) => {
	const newPath = path.replace('static/icons/original', 'static/icons');
	const file = fs.readFileSync(path, 'utf8');
	const fileName = path.split('/').pop().split('.').shift();

	fs.writeFileSync(newPath, convertSvgIcon(file, fileName));
});
