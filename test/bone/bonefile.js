var bone = require('bone');
var concat = bone.require('../../');

var dist = bone.dest('dist').cwd('~/');

dist.src('./a.js')
    .act(concat({
        files: [
            '~/b.js',
            '~/c.js'
        ]
    }));

dist.src('./a.js')
    .act(concat({
        files: [
            '~/b.js',
            '~/c.js'
        ],
        separator: ';'
    }))
    .rename('a-separator.js');

dist.src('./a.js')
    .act(concat({
        files: [
            '~/b.js',
            '~/c.js'
        ],
        banner: 'banner'
    }))
    .rename('a-banner.js');

dist.src('./a.js')
    .act(concat({
        files: [
            '~/b.js',
            '~/c.js'
        ],
        footer: 'footer'
    }))
    .rename('a-footer.js');

dist.src('./a.js')
    .act(concat({
    }))
    .rename('a-argv-nil.js');

dist.src('./a.js')
    .act(concat({
        files: '~/b.js'
    }))
    .rename('a-string.js');

dist.src('./a.js')
    .act(concat({
        files: {foo: true, bar: false}
    }))
    .rename('a-invalid.js');


dist.src('./a.js')
    .act(concat({
        files: [
            '~/a.js',
            '~/b.js'
        ],
    }))
    .rename('a-config-self.js');

dist.src('./a.js')
    .act(concat({
        files: [
            '__self__',
            '~/b.js'
        ]
    }))
    .rename('a-self-first.js');

dist.src('./a.js')
    .act(concat({
        files: [
            '~/c.js',
            '__self__',
            '~/b.js'
        ]
    }))
    .rename('a-self-arbitary.js');

dist.src('./a.js')
    .act(concat({
        files: [
            '~/b.js',
            '__self__'
        ]
    }))
    .rename('a-self-last.js');
