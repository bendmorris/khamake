var Exporter = require('./Exporter.js');
var Files = require('./Files.js');

var KhaExporter = function () {
	Exporter.call(this);
	this.width = 640;
	this.height = 480;
	this.sources = [];
	this.addSourceDirectory('Sources');
	this.addSourceDirectory('Kha/Sources');
};

KhaExporter.prototype = Object.create(Exporter.prototype);
KhaExporter.constructor = KhaExporter;

KhaExporter.prototype.getCurrentDirectoryName = function (directory) {
	return directory.getFileName();
};

KhaExporter.prototype.copyFile = function (from, to) {
	Files.copy(from, to, true);
};

KhaExporter.prototype.copyDirectory = function (from, to) {
	createDirectory(to);
	for (var file in Files.newDirectoryStream(from)) {
		if (Files.isDirectory(file)) copyDirectory(file, to.resolve(file));
		else copyFile(file, to.resolve(file));
	}
};

KhaExporter.prototype.createDirectory = function (dir) {
	if (!Files.exists(dir)) Files.createDirectories(dir);
};

KhaExporter.prototype.setWidthAndHeight = function (width, height) {
	this.width = width;
	this.height = height;
};

KhaExporter.prototype.addShader = function (shader) {

};

KhaExporter.prototype.addSourceDirectory = function (path) {
	this.sources.push(path);
};

KhaExporter.prototype.copyImage = function (platform, from, to, asset) { };
KhaExporter.prototype.copyMusic = function (platform, from, to, oggEncoder, aacEncoder, mp3Encoder) { };
KhaExporter.prototype.copySound = function (platform, from, to, oggEncoder, aacEncoder, mp3Encoder) { };
KhaExporter.prototype.copyVideo = function (platform, from, to, mp4Encoder, webmEncoder, wmvEncoder) { };
KhaExporter.prototype.copyBlob = function (platform, from, to) { };

module.exports = KhaExporter;