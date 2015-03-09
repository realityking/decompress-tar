'use strict';

var isJpg = require('is-jpg');
var path = require('path');
var tar = require('../');
var test = require('ava');
var vinylFile = require('vinyl-file');

test('decompress a TAR file', function (t) {
	t.plan(1);

	var file = vinylFile.readSync(path.join(__dirname, 'fixtures/test.tar'));
	var stream = tar();

	file.extract = true;

	stream.on('data', function (file) {
		t.assert(isJpg(file.contents));
	});

	stream.end(file);
});

test('strip path level using the `strip` option', function (t) {
	t.plan(2);

	var file = vinylFile.readSync(path.join(__dirname, 'fixtures/test.tar'));
	var stream = tar({strip: 1});

	file.extract = true;

	stream.on('data', function (file) {
		t.assert(file.path === 'test.jpg');
		t.assert(isJpg(file.contents));
	});

	stream.end(file);
});
