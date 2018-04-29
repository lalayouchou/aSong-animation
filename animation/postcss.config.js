// 根目录新建文件：postcss.config.js
module.exports = {
   plugins: [
       require('precss'),
       require('autoprefixer')
   ]
}