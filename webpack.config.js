const ARUI_TEMPLATE = require('arui-presets/webpack.base');
const ARUI_DEV_TEMPLATE = require('arui-presets/webpack.development');
const ARUI_PROD_TEMPLATE = require('arui-presets/webpack.production');
const merge = require('webpack-merge');

module.exports = merge.smart(
    { entry: './src/index.jsx' },
    ARUI_TEMPLATE,
    process.env.NODE_ENV === 'production' ? ARUI_PROD_TEMPLATE : ARUI_DEV_TEMPLATE
);