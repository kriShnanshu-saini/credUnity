import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// install: npm i -D @types/node
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
			'@public': `${path.resolve(__dirname, './public/')}`,
			'@components': `${path.resolve(__dirname, './src/components/')}`,
			'@constants': `${path.resolve(__dirname, './src/constants/')}`,
		},
	},
});
