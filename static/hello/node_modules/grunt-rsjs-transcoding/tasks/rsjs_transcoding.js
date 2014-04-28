/*
 * grunt-rsjs-transcoding
 * https://github.com/guoqingpang/grunt-rsjs-transcoding
 *
 * Copyright (c) 2014 pangguoqing
 * Licensed under the MIT license.
 */

'use strict';
var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;
var SLASH_RE = /\\\\/g;

function parseDependencies(code) {
	var ret = [];

	code.replace(SLASH_RE, "").replace(REQUIRE_RE, function(m, m1, m2) {
		if (m2) {
			ret.push(m2);
		}
	});

	return ret;
}

var path = require("path");

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask(
					'rsjs_transcoding',
					'for transcoding rs module',
					function() {
						// Merge task-specific and/or target-specific options
						// with these defaults.
						var options = this.options({
							idPer : "./",
							isASelfDefineModule : false
						});

						// Iterate over all specified file groups.
						this.files.forEach(function(f) {
									// Concat specified files.
									var src = f.src.filter(
													function(filepath) {
														// Warn on and remove
														// invalid source files
														// (if nonull was set).
														console.log(filepath);
														if (!grunt.file.exists(filepath)) {
															grunt.log.warn('Source file "' + filepath + '" not found.');
															return false;
														}
														if (grunt.file.isDir(filepath)) {
															return false;
														} else {
															return true;
														}
													}).map(
													function(filepath) {
														var extname = path.extname(filepath);
														var code = grunt.file.read(filepath);
														var id = filepath.replace("tmp/copy/","").replace("tmp/min/","");
														id = options.idPer + id;
														if (options.isASelfDefineModule) {
															id = id.replace(/(.*\/)/,"./");
														}
														var deps = (extname === ".js") ? parseDependencies(code) : [];
														var begin = 'define("' + id + '",' + JSON.stringify(deps) + ',';
														var end = ');';
														if (extname === ".js") {
															code = code ? code : '';
															code = 'function(require,exports,module,define){' + code + '}';
														} else if (extname === ".json") {
															code = code ? code : '""';
														} else {
															code = code ? JSON.stringify(code): '""';
														}
														return begin + code + end;
													}).join("\n");

									if (src) {
										// Write the destination file.
										grunt.file.write(f.dest, src);

										// Print a success message.
										grunt.log.writeln('File "' + f.dest + '" created.');
									}
								});
					});

};
