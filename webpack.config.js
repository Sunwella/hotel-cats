const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlPageNames = ['our_rooms', 'room_info', 'request'];
const htmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`,
    filename: `${name}.html`,
  });
});

module.exports = {
	mode: 'development',
	devServer: {
		hot: true,
		open: true,
	},
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
		}),
		new webpack.HotModuleReplacementPlugin(),
	].concat(htmlPlugins),
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				use: [
					'babel-loader'
				] 
			},
	        {
		        test:/\.html$/,
		        use: [
		          'html-loader'
		        ]
	        }, 
			{ 
				test: /\.(?:ico|gif|png|jpe?g)$/i,
                type: 'asset/resource',
			},
			{ 
				test: /\.(less|css)$/, 
				use: [
					'style-loader', 
					'css-loader', 
					'less-loader'
				] 
			},
		]
	},
	resolve: {
		roots: [
			path.resolve(__dirname, 'src'),
		],
	},
}