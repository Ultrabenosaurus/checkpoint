checkpoint
==========

like a scrollbar, but with context

## About

Current Build: **v0.1.1**

Think along the lines of how Chrome marks occurences of search results when you do Find in Page, but giving an outline of page content. Will work with element names or classnames. Section depth/nesting will be done in the order they're listed in the config block, rather than HTML element structure to give you more freedom over your architecture.

## Compatibility

So far only tested in Chrome (latest stable) on Windows 10. Plan to add qunit tests by version 0.2.0 and expand manual browser testing to include Firefox, IE, Opera, and Edge but only the latest versions. If I can find a way to automate testing of other browsers, probably via TravisCI, then I'll do that but I can't be bothered to do it manually.

## Versions

This section isn't about the version numbers, but the combination of modules.

Currently, the only combinations I'm building are `core` and `full` as there isn't much functionality other than the core offering yet. Hopefully this list will be expanded as I continue to develop checkpoint.

### Core

The most basic version of checkpoint built from the minimum required modules to provide any actual functionality. This will let you outline the page by HTML elements or classes, with or without the markers being clickable for navigation.

### Full

This is the full build, compiled from all available modules and thus providing all available functionality for you to use. If there are features you don't want it is recommended to pick a different version or to build your own, in order to keep the file size as low as possible.

### Custom

If you want to build a custom version of checkpoint you'll need [Node/npm](https://nodejs.org/), [Grunt](http://gruntjs.com/getting-started), and a copy of this entire repo - either by clone or [download](https://github.com/Ultrabenosaurus/checkpoint/releases/latest). Once that's all in place you can move on to experimenting with different builds.

All default versions will be available to play with - along with appropriate demo files - in your copy of the repo. You can also see which modules are used for each by taking a look in the `concat` section of `Gruntfile.js`, for example the `core` is built as such:

```js
core: {
  src: [
    'src/sizer.js',
    'src/finder.js',
    'src/calculator.js',
    'src/painter.js',
    'src/main.js',
  ],
  dest: 'dist/<%= pkg.name %>.core.<%= pkg.version %>.js'
}
```

You'll need a new `uglify` profile as well, like so:

```js
core: {
  src: '<%= concat.core.dest %>',
  dest: 'dist/<%= pkg.name %>.core.<%= pkg.version %>.min.js'
}
```

Whatever modules you want in your custom version, you must always include the modules used in the `core` build or you will run into errors - if it works at all. I recommend you create a new `concat` profile rather than editing an existing one.

After you've setup the `concat` and `uglify` profiles, you'll want to duplicate the following line and replace the three occurrences of `core` with the name you gave to your `concat` and `uglify` profiles.

```js
grunt.registerTask('build-core', ['concat:core', 'uglify:core']);
```

Once that's done make sure you've also changed the `core` in the `dest` settings of both your `concat` and `uglify` profiles. You can now run your new build task and find it in the `dist/` directory.

## Usage

### Install

[Download the latest build](https://github.com/Ultrabenosaurus/checkpoint/releases/latest) directly or clone this repo to build it yourself via Grunt, then include the JS file in your project at the end of the body after a config block (see demos).

### Config

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
