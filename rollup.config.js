import clear from 'rollup-plugin-clear';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default{
    input: ['./src/index.jsx'],//入口文件地址
    output: {
		name:'rollup-react-component', //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.rollup-react-component=...
		file: 'dist/rollup-react-component.js',  // 输出文件
		format: 'es' //  五种输出格式：amd /  es6 / iife / umd / cjs
    },
    context: 'null',
    moduleContext: 'null',
    //各种插件使用的配置
    plugins: [
	clear({
	    targets: ['./src/dist']
	}),
	nodeResolve({
	    jsnext: true,
	    main: true,
	    browser: true,
	}),
	commonjs({
	    include: ["node_modules/**"],
	}),
	babel({
	    babelHelpers:'runtime',
	    'plugins':["@babel/plugin-transform-runtime"],
	    exclude: 'node_modules/**', // 只编译源代码
	}), // 会自动读取babel的配置文件
	terser(),
    ],
    // 项目中引用的第三方库
    external: [
	{
    	    includeDependencies: true,
	},
    ], 
}