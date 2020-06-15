import path from 'path';

module.exports = {
	name: 'server',
	target: 'node',
	mode: 'production',
	optimization: {
        nodeEnv: false,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    },
	entry: [
		path.resolve(__dirname, '../server/server.js')
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../buildServer'),
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.(js|json)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: '#cheal-eval-source-map'
}
