Changelog & Notes
=================

## 0.1.1

* added custom build instructions to README
* separated changelog into own file
* renamed `outline` build to `core`

## 0.1.0

* first release
* **NO DEFAULT SETTINGS** (see demos for example config)
* config block MUST be called `chConfig` and checkpoint MUST be initialised as a top-level variable named `checkpoint`
* two builds: document outline with or without scroll indicator
  * scroll indicator is mostly superfluous at the moment, mirroring the native scrollbar, but will be improved on
* can outline the document based on elements or classnames
* markers redraw automatically on browser resize
  * doesn't seem to register on Windows 10 Chrome when maximising/restoring the window
