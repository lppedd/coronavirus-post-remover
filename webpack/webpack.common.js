const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';

module.exports = {
  entry: {
    popup: path.join(__dirname, `${srcDir}/popup.ts`),
    background: path.join(__dirname, `${srcDir}background.ts`),
    content_script: path.join(__dirname, `${srcDir}content_script.ts`)
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/js')
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [new CopyPlugin([{ from: '.', to: '../' }], { context: 'public' })]
};
