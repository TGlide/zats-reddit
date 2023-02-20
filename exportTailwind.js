import resolveConfig from './node_modules/tailwindcss/resolveConfig.js';
import tailwindConfig from './tailwind.config.cjs';
import { writeFileSync } from 'fs';
import path from 'path';

const fullConfig = resolveConfig(tailwindConfig);
const theme = fullConfig.theme;

const defaultConfig = {
	prefix: '',
	include: null
};

function camelToKebab(str) {
	return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function formatCssKey(key) {
	return camelToKebab(key).replace('.', '-dot-');
}

function formatCssVar(prefix, key, value) {
	key = formatCssKey(key);
	return `--${prefix}${key}: ${value};`;
}

function exportTailwind(theme, config) {
	const { prefix, include } = { ...defaultConfig, ...config };

	const variables = Object.entries(theme).reduce((acc, [key, value]) => {
		if (typeof value === 'string') {
			return [...acc, formatCssVar(prefix, key, value)];
		}

		if (include && !include.includes(key)) return acc;

		if (Array.isArray(value)) {
			return [...acc, ...value.map((v) => exportTailwind({ [key]: v }, { prefix }))];
		}

		return [...acc, ...exportTailwind(value, { prefix: `${prefix}${formatCssKey(key)}-` })];
	}, []);

	return variables;
}

const vars = exportTailwind(theme, {
	prefix: 'exported-',
	include: ['zIndex', 'colors', 'fontFamily', 'spacing', 'fontSize', 'fontWeight']
});

const basePath = import.meta.url.replace('file://', '').replace(/\/[^/]*$/, '');
const outputPath = path.join(basePath, 'src/styles/tailwind-vars.css');

writeFileSync(
	outputPath,
	`:root {
${vars.join('\n')}
}`
);

console.log(`Exported ${vars.length} Tailwind variables to ${outputPath}`);
