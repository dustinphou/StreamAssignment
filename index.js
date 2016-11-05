var fs = require('fs')
var Transform = require('stream').Transform
var inherits = require("util").inherits
var program = require('commander')

function PatternMatch(arg){
	Transform.call(this, {objectMode: true})
}

inherits(PatternMatch, Transform)

PatternMatch.prototype._transform = function (chunk, encoding, getNextChunk){
var string = chunk.toString()
console.log("----------------Input----------------\n", string, '\n')
var result = string.split(program.pattern)
if(result[result.length-1] == '')	//cuts off the null result when '.' is argument
{
	result.length -= 1
}
this.push(result)
getNextChunk()	//callback just causes stream to proceed to next chunk, does not need to be defined
}

PatternMatch.prototype._flush = function (flushCompleted) {
	flushCompleted() //same as above callback
}

program.option('-p, --pattern <pattern>', 'Input Pattern such as . ,').parse(process.argv);

var instream = fs.createReadStream("input-sensor.txt")

var patternStream = instream.pipe(new PatternMatch())

patternStream.on('data', function(data) {
	console.log("----------------Output----------------")
	console.log(data)
})