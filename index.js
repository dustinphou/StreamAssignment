var fs = require('fs')
var Transform = require('stream').Transform
var inherits = require("util").inherits

function PatternMatch()
{
	Transform.call(this, {objectMode: true});
}

console.log("Enter character to filter out.")

inherits(PatternMatch, Transform)

PatternMatch.prototype._transform = function (chunk, encoding, getNextChunk){

var string = chunk.toString()
var result = string.split('.')

this.push(result)
getNextChunk()	//callback just causes stream to proceed to next chunk, does not need to be defined

}

PatternMatch.prototype._flush = function (flushCompleted) {
	flushCompleted()
}

//add console functionality after streams are working
//program.option('-p, --pattern <pattern>', 'Input Pattern such as . ,').parse(process.argv);

var instream = fs.createReadStream("input-sensor.txt");

var patternStream = instream.pipe( new PatternMatch());

patternStream.on('data', function(data) {
	console.log(data)
})