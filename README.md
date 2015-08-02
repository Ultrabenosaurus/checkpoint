checkpoint
==========

like a scrollbar, but with context

## About

Think along the lines of how Chrome marks occurences of search results when you do Find in Page, but giving an outline of page content. Will work with element names or classnames. Section depth/nesting will be done in the order they're listed in the config block, rather than HTML element structure to give you more freedom over your architecture.

## Changelog

### 0.1.0

* first release
* **NO DEFAULT SETTINGS** (see demos for example config)
* config block MUST be called `chConfig` and checkpoint MUST be initialised as a top-level variable named `checkpoint`
* two builds: document outline with or without scroll indicator
  * scroll indicator is mostly superfluous at the moment, mirroring the native scrollbar, but will be improved on
* can outline the document based on elements or classnames
* markers redraw automatically on browser resize
  * doesn't seem to register on Windows 10 Chrome when maximising/restoring the window

## Usage

### Install

[Download the latest build](https://github.com/Ultrabenosaurus/checkpoint/blob/master/dist/checkpoint.min.js) directly or clone this repo to build it yourself via Grunt, then include the JS file in your project at the end of the body after a config block (see demos).

### Customise

See the demos for config examples.

If you need to refresh checkpoint at any time you can call `checkpoint.updateMarkers()`. If you change the config on-the-fly and want to reboot checkpoint, call `checkpoint = new cp( chConfig );`.

## Credits

Thanks to [pazguille](https://github.com/pazguille) for his excellent scroll event handler.

## License

As usual with my work, this project is available under the BSD 3-Clause license. In short, you can do whatever you want with this code as long as:

* I am always recognised as the original author.
* I am not used to advertise any derivative works without prior permission.
* You include a copy of said license and attribution with any and all redistributions of this code, including derivative works.

For more details, read the included LICENSE.md file or read about it on [opensource.org](http://opensource.org/licenses/BSD-3-Clause).
