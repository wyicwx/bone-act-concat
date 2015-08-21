var bone = require('bone');
var concat = require('../lib/concat.js');

var dist = bone.dest('dist');

dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'~/raw/b.js',
			'~/raw/c.js'
		]
	}));

dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'~/raw/b.js',
			'~/raw/c.js'
		],
		separator: ';'
	}))
	.rename('a-separator.js');

dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'~/raw/b.js',
			'~/raw/c.js'
		],
		banner: 'banner'
	}))
	.rename('a-banner.js');

dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'~/raw/b.js',
			'~/raw/c.js'
		],
		footer: 'footer'
	}))
	.rename('a-footer.js');

dist.src('~/raw/a.js')
	.act(concat({
	}))
	.rename('a-argv-nil.js');

dist.src('~/raw/a.js')
	.act(concat({
		files: '~/raw/b.js'
	}))
	.rename('a-string.js');

dist.src('~/raw/a.js')
	.act(concat({
		files: {foo: true, bar: false}
	}))
	.rename('a-invalid.js');


dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'~/raw/a.js',
			'~/raw/b.js'
		],
	}))
	.rename('a-config-self.js');

dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'__self__',
			'~/raw/b.js'
		]
	}))
	.rename('a-self-first.js');

dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'~/raw/c.js',
			'__self__',
			'~/raw/b.js'
		]
	}))
	.rename('a-self-arbitary.js');

dist.src('~/raw/a.js')
	.act(concat({
		files: [
			'~/raw/b.js',
			'__self__'
		]
	}))
	.rename('a-self-last.js');

bone.setup('./test/');

describe('bone-act-concat', function() {
	it('concat correct', function(done) {
		bone.fs.readFile('~/dist/a.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-separator.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-banner.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-footer.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-argv-nil.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-string.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-invalid.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-config-self.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-self-first.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-self-arbitary.js', function(err, buffer) {
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
		bone.fs.readFile('~/dist/a-self-last.js', function(err, buffer) {
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