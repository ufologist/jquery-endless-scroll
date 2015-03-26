# Endless Scroll [![endorse](http://api.coderwall.com/fredwu/endorsecount.png)](http://coderwall.com/fredwu)

rewritten by Sun


If you don't already know, [endless scrolling](http://www.google.com/search?q=endless+scroll) (or infinite scrolling or pagination) is a popular technique amongst modern websites such as [Google Reader](http://reader.google.com/) and [Live Image Search](http://www.live.com/?scope=images), whereby instead of paging through items using traditional pagination links, the page just keeps loading with new items attached to the end.

Endless Scroll not only helps you build highly customisable infinite scrolling effects, it also offers features not commonly seen. Such features include:



## Usage
TODO 修改下配置项
``` js
// using default options
$(window).endlessScroll();
// using some custom options
$('.endless-list-wrapper').endlessScroll();
```

### Custom Loader Styles

default CSS class: endlessScroll-loader

or

custom loaderClass for it.

## Demo

[Click here for a simple demo](http://fredwu.github.com/jquery-endless-scroll/).

## Browser Support

All modern browsers (Firefox, Chrome, Safari, Opera, IE7+) should be supported. Please [open an issue](https://github.com/fredwu/jquery-endless-scroll/issues) if Endless Scroll doesn't work on a particular browser.

## Changelog

v2.0.0 2015-3-26

- base on Endless Scroll 1.6.0 rewritten by Sun https://github.com/ufologist
- 重新实现了endless scroll的逻辑, 精简了很多代码和配置项, 优化了插件的方式和性能

[Fred Wu Endless Scroll changelog](https://github.com/fredwu/jquery-endless-scroll#changelog)

## License

Copyright (c) 2008-2012 Fred Wu

rewritten by Sun https://github.com/ufologist

Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fredwu/jquery-endless-scroll/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
