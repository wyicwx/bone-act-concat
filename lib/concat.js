var bone = require('bone');
var combine = bone.utils.stream.combine;
var aggre = bone.utils.stream.aggre;
var origin = bone.utils.stream.origin;

function unique(arr) {
	var res = [];
	var json = {};
	for(var i = 0; i < arr.length; i++){
		if(!json[arr[i]]){
			res.push(arr[i]);
			json[arr[i]] = 1;
		}
	}
	return res;
}

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

	var filterFiles = [];

	files.forEach(function(file) {
		if(bone.utils.isString(file)) {
			bone.fs.pathResolve(file, destPath);
			bone.fs.search(file).forEach(function(f) {
				filterFiles.push(f);
			});
		}
	});

	filterFiles = unique(filterFiles);

	filterFiles.forEach(function(f) {
		if(option.separator) {
			streams.push(origin(option.separator));
		}
		streams.push(aggre(bone.fs.createReadStream(f)));
	});

	var chunks = [buffer];
	
	combine(streams).on('data', function(chunk) {
		chunks.push(chunk);
	}).on('end', function() {
		if(typeof option.banner == 'string') {
			chunks.unshift(new Buffer(option.banner));
		}
		if(typeof option.footer == 'string') {
			chunks.push(new Buffer(option.footer));
		}
		callback(null, Buffer.concat(chunks));
	});
});
