checkpoint
==========

like a scrollbar, but with context

## About

Think along the lines of how Chrome marks occurences of search results when you do Find in Page, but giving an outline of page content. The default setting is to scan for H tags 1 though 6, but you can pass a class prefix to use instead. Section depth/nesting will be done numerically as with H tags rather than actual HTML element structure, to give you more freedom over your architecture.

## Usage

### Install

[Download the latest build](https://github.com/Ultrabenosaurus/checkpoint/blob/master/dist/checkpoint.min.js) directly or clone this repo to build it yourself via Grunt, then include the JS file in project however you need to.

### Default

Just call `checkpoint.init()` once the page has loaded and it'll show up alongside the scrollbar. Nothing else needed.

### Custom

## Credits

Thanks to [pazguille](https://github.com/pazguille) for his excellent scroll event handler.

## License

As usual with my work, this project is available under the BSD 3-Clause license. In short, you can do whatever you want with this code as long as:

* I am always recognised as the original author.
* I am not used to advertise any derivative works without prior permission.
* You include a copy of said license and attribution with any and all redistributions of this code, including derivative works.

For more details, read the included LICENSE.md file or read about it on [opensource.org](http://opensource.org/licenses/BSD-3-Clause).
