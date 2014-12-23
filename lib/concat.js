var bone = require('bone');
var AKOStream = require('AKOStream');
var combine = AKOStream.combine;
var aggre = AKOStream.aggre;
var origin = AKOStream.origin;

module.exports = bone.wrapper(function(buffer, encoding, callback) {
	var option = this.option.defaults({
		separator: '\r\n',
		files: [],
		banner: '',
		footer: ''
	});
	var files = option.files;
	var destPath = this.destPath;

	if(!Array.isArray(files)) {
		files = [files];
	}
	var streams = [];
	files.forEach(function(file) {
		file = bone.fs.pathResolve(file, destPath);
		bone.fs.search(file).forEach(function(f) {
			if(option.separator) {
				streams.push(origin(option.separator));
			}
			streams.push(aggre(bone.fs.createReadStream(f)));
		});
	});
	var chunks = [buffer];
	
	combine(streams).on('data', function(chunk) {
		chunks.push(chunk);
	}).on('end', function() {
		if(typeof option.banner == 'string') {
			chunks.push(new Buffer(option.banner));
		}
		if(typeof option.footer == 'string') {
			chunks.push(new Buffer(option.footer));
		}
		callback(null, Buffer.concat(chunks));
	});
});
