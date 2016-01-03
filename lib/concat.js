function unique(arr) {
	var res = [];
	var json = {};
	for(var i = 0; i < arr.length; i++) {
		if(!json[arr[i]]){
			res.push(arr[i]);
			json[arr[i]] = 1;
		}
	}
	return res;
}

module.exports.act = function(buffer, encoding, callback) {
	var combine = bone.utils.stream.combine;
	var aggre = bone.utils.stream.aggre;
	var origin = bone.utils.stream.origin;

	this.cacheable();

	var fs = this.fs;
	var options = this.options({
		separator: '\r\n',
		files: [],
		banner: '',
		footer: ''
	});

	var files = options.files;
	var destPath = this.destPath;
	var Self = this;
	var isConfigSelf = false;
	if(!Array.isArray(files)) {
		files = [files];
	}
	var streams = [];

	var filterFiles = [];
	var chunks = [];
	var firstFile;
	files.forEach(function(file) {
		if(bone.utils.isString(file)) {
			if(file === '__self__') {
				file = Self.source;
			}
			fs.pathResolve(file, destPath);
			fs.search(file, {searchAll: true}).forEach(function(f) {
				filterFiles.push(f);
			});
		}
	});
	filterFiles = unique(filterFiles);
	isConfigSelf = filterFiles.some(function(f) {
		return f === Self.source;
	});
	if(!isConfigSelf) {
		if(filterFiles.length) {
			streams.push(origin(options.separator));
		}
		chunks = [buffer];
	}
	filterFiles.forEach(function(f, i) {
		if(options.separator && i) {
			streams.push(origin(options.separator));
		}
		streams.push(aggre(fs.createReadStream(f)));
	});
	combine(streams).on('data', function(chunk) {
		chunks.push(chunk);
	}).on('end', function() {
		if(typeof options.banner == 'string') {
			chunks.unshift(new Buffer(options.banner));
		}
		if(typeof options.footer == 'string') {
			chunks.push(new Buffer(options.footer));
		}
		callback(null, Buffer.concat(chunks));
	});
};
