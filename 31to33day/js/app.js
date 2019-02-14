var region = new groupCheckbox('region-radio-wrapper', ['华东', '华南', '华北']);
var product = new groupCheckbox('product-radio-wrapper', ['手机', '笔记本', '智能音箱']);
region.createCheckbox();
product.createCheckbox();

newTable();