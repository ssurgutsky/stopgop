1. index.html ������ ���������� cordova.js
    <script type="text/javascript" src="cordova.js"></script>

2. dist/config.xml ������ ���� ��������� ��������

3. ����������� �������� config/

4. build/webpack.base.conf.js ������ ��������� 
      {
        test: /\.(txt|qsp)(\?.*)?$/,
        loader: 'raw-loader',
      },
