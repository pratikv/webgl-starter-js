module.exports = {
    entry: './app.js',
    output: {
      filename: 'dist/bundle.js'
    },
    module: {
      loaders: [
        { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
        { test: /\.(glsl|frag|vert)$/, loader: 'ify-loader', exclude: /node_modules/ }
      ]
    }
  };
  