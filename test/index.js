'use strict';
var assert = require('assert');
var path = require('path');
var bone = require('bone');


bone.setup(path.join(__dirname, './raw'));
require('./bone/bonefile.js');
bone.run();

var FileSystem = require('bone/lib/fs.js');
var bonefs = FileSystem.fs;

bone.status.test = true;
bone.log.log('test start.');

describe('bone-act-concat', function() {
	it('concat correct', function(done) {
		bonefs.readFile('~/dist/a.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();

			if(ctx == 'a\r\nb\r\nc') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('separator by ;', function(done) {
		bonefs.readFile('~/dist/a-separator.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();

			if(ctx == 'a;b;c') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('add banner', function(done) {
		bonefs.readFile('~/dist/a-banner.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();

			if(ctx == 'bannera\r\nb\r\nc') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('add footer', function(done) {
		bonefs.readFile('~/dist/a-footer.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();

			if(ctx == 'a\r\nb\r\ncfooter') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('empty argv', function(done) {
		bonefs.readFile('~/dist/a-argv-nil.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();

			if(ctx == 'a') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('files string', function(done) {
		bonefs.readFile('~/dist/a-string.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();

			if(ctx == 'a\r\nb') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('invalid parameters', function(done) {
		bonefs.readFile('~/dist/a-invalid.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();

			if(ctx == 'a') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('config self', function(done) {
		bonefs.readFile('~/dist/a-config-self.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();
			if(ctx === 'a\r\nb') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('self first', function(done) {
		bonefs.readFile('~/dist/a-self-first.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();
			if(ctx === 'a\r\nb') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('self arbitary', function(done) {
		bonefs.readFile('~/dist/a-self-arbitary.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();
			if(ctx === 'c\r\na\r\nb') {
				done();
			} else {
				done(false);
			}
		});
	});

	it('self last', function(done) {
		bonefs.readFile('~/dist/a-self-last.js', function(err, buffer) {
			if(err) {
				return done(false);
			}

			var ctx = buffer.toString();
			if(ctx === 'b\r\na') {
				done();
			} else {
				done(false);
			}
		});
	});

});