var bone = require('bone');
var AKOStream = require('AKOStream');
var combine = AKOStream.combine;
var aggre = AKOStream.aggre;

module.exports = bone.wrapper(function(buffer, encoding, callback) {
	var option = this.option;
	var files = option.files || [];
	var destPath = this.destPath;

	if(!Array.isArray(files)) {
		files = [files];
	}
	var streams = [];
	files.forEach(function(file) {
		file = bone.fs.pathResolve(file, destPath);
		bone.fs.search(file).forEach(function(f) {
			streams.push(aggre(bone.createReadStream(f)));
		});
	});
	var chunks = [buffer]

	combine(streams).on('data', function(chunk) {
		chunks.push(chunk);
	}).on('end', function() {
		callback(null, Buffer.concat(chunks));
	});
});
