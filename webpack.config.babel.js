import webpack from 'webpack';
import path from 'path';

const config = {
  devtool: 'source-map',
  entry: './client/src/app',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'public/stylesheets'),
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      { 
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015']
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        include: path.join(__dirname, 'public'),
        loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
      }
    ]
  }
};

export default config;
