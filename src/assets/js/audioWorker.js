

var that = this;

var channelCount = 1;
var buffers = [];
var frameCount = 0;
var sampleRate = 44100;

this.onmessage = function(event){
    var command = event.data.command;
    var outputs;
    if (that[command]) {
        outputs = that[command].apply(that, event.data);
        that.postMessage(outputs);
    } else {
        console.error("Unknown function '" + command + "' in audioWorker");
    }
}


function configure(config) {
    var i;
    that.channelCount = args.channelCount || that.channelCount;
    that.sampleRate = args.sampleRate || that.sampleRate;
    that.clear();
}

function record(inputBuffer) {
    for (var i = 0; i < that.channelCount; i++) {
        that.buffers[i].push(inputBuffer[i]);
    }
    that.frameCount += inputBuffer[0].length;
}

function clear(){
    that.buffers = [];
    for (i = 0; i < that.channelCount; i++) {
        that.buffers.push([]);
    }
    that.frameCount = 0;
}

function flattenBuffer(buffer, frameCount){
    var i, offset, flattenedBuffer;
    flattenedBuffer = new Float32Array(frameCount);
    offset = 0;
    for (i = 0; i < buffer.length; i++){
        flattenedBuffer.set(buffer[i], offset);
        offset += buffer[i].length;
    }
    return flattenedBuffer;
}

function interleave(buffers){
    var i, j, k, frameCount, interleaved;
    for (i = 0; i < buffers.length; i ++) {
        frameCount += buffers[i].length;
    }
    interleaved = new Float32Array(frameCount);

    i = j = 0;
    while (i < frameCount) {
        for (k = 0; k < buffers.length; k ++) {
            interleaved[i ++] = buffers[k][j];
        }
        j ++;
    }
    return interleaved;
}


