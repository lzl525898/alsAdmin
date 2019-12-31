const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    // 按需打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    // 使用less-loader对源码进行样式的修改
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#409EFF'},
    }),
);
