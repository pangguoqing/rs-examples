# grunt-rsjs-transcoding

> for transcoding rs module

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-rsjs-transcoding --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rsjs-transcoding');
```

## The "rsjs_transcoding" task

### Overview
In your project's Gruntfile, add a section named `rsjs_transcoding` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rsjs_transcoding: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.idPer
Type: `String`
Default value: `'./'`

A string value that is used to As the id prefix.

#### options.isASelfDefineModule
Type: `Boolean`
Default value: `false`

If value is true, id .

### Usage Examples

```js
grunt.initConfig({
  rsjs_transcoding: {
    js_to_rs : {
      options : {
        idPer : "./"
      },
      files : [ {
        expand : true,
        src : ['**.js','**.css'],
        cwd : 'src/',
        dest : 'dest/'
      }]
    }
  },
});
```


## Release History
_(Nothing yet)_
