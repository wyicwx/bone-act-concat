# bone-concat
> bone的合并文件处理器

### 安装及使用

通过npm安装

```sh
$ npm install bone-concat 
```

安装后在`bonefile.js`文件内通过`act()`加载

```js
var bone = require('bone');
var concat = require('bone-concat');

bone.dest('dist')
	.src('~/src/main.js')
	.act(concat);
```

传递参数的调用方法

```js
bone.dest('dist')
	.src('~/src/main.js')
	.act(concat({
		files: ['~/src/lib/jquery.js']
	}));
```

### 参数

**files**

type: `string`、`array`  default: []

支持文件路径、包含glob语法的文件路径或者多个文件的数组

```js
bone.dest('dist')
	.src('~/src/main.js')
	.act(concat([
		'~/src/main.js',
		'~/src/lib/jquery.js'
	]));
```

注：不指定files则不合并任何文件

**separator**

type: `string`  default: '\r\n'

合并文件之间的分隔符

**banner**

type: `string`  default: ''

合并后顶部添加的文字

**footer**

type: `string`  default: ''

合并后底部添加的文字

### 其他

处理器开发以及使用请参考[处理器](https://github.com/wyicwx/bone/blob/master/docs/plugin.md)