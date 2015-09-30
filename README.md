# fromnode

Simple extraction of [bluebird's](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisefromnodefunction-resolver---promise) crazy useful `Promise.fromNode()` method.

This module expects a global `Promise` constructor, which is available in node.js starting in 0.12. Other environments will need to use a [polyfill](https://github.com/getify/native-promise-only) of some sort.
