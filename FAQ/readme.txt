1. index.html должен подключать cordova.js
    <script type="text/javascript" src="cordova.js"></script>

2. dist/config.xml должен быть правильно настроен

3. ќб€зательно копируем config/

4. build/webpack.base.conf.js должен содержать 
      {
        test: /\.(txt|qsp)(\?.*)?$/,
        loader: 'raw-loader',
      },
