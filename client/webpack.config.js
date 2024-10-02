// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].bundle.js', // Use [name] to generate unique filenames for different chunks
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|jpg|gif|svg)$/i,
//         type: 'asset/resource',
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
//   optimization: {
//     splitChunks: {
//       chunks: 'all', // Enable code splitting for all chunks
//       name: false,  // Disable automatic naming for split chunks
//       minSize: 20000, // Set min size for chunks
//       maxSize: 200000, // Set max size to encourage splitting
//     },
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//   ],
//   devServer: {
//     static: './dist',
//     compress: true,
//     port: 3000,
//   },
// };





