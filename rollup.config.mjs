import resolve from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'es',
        name: 'app',
        dir: 'public/scripts'
    },
    plugins: [
        resolve(),
        terser(),
        livereload(['src','public']),
        serve('public')
    ],
    watch: {
        clearScreen: true
    }
};
