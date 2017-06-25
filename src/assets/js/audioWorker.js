

var that = this;

var channelCount = 1;
var buffers = [];
var frameCount = 0;
var sampleRate = 44100;


this.onmessage = function(event){
    var command = event.data.command;
    var success, buffers;
    switch (command) {
        case 'initialise':
            success = that.initialise(event.data.settings || {});
            that.postMessage(success);
            break;
        case 'clear':
            success = that.clear();
            that.postMessage(success);
            break;
        case 'record':
            that.record(event.data.buffer);
            break;
        case 'getBuffers':
            buffers = that.getBuffers();
            that.postMessage(buffers);
            break;
        default:
            console.error("Unknown function '" + command + "' in audioWorker");
    }
}


var RingBuffer = function(size, empty) {
    this.size = size;
    this.buffer = [];
    for (var i = 0; i < this.size; i ++) {
        this.Buffer.push(empty);
    }
    this.end = 0;
    this.full = false;
}

RingBuffer.prototype.append = function(data) {
    this.buffer(this.end) = data;
    this.end = (this.end + 1) % this.size;
    if (this.end === 0) {
        this.full = true;
    }
}

RingBuffer.prototype.get = function(i) {
    this.full ? this.buffer[(this.end + i) % this.size] : this.buffer[i];
}

Ringbuffer.prototype.length = function() {
    return this.full ? this.size : this.end;
}

function initialise(settings) {
    that.channelCount = settings.channelCount || that.channelCount;
    that.sampleRate = settings.sampleRate || that.sampleRate;
    that.clear();
    return true;
}

function record(inputBuffer) {
    for (var i = 0; i < that.channelCount; i++) {
        that.buffers[i].push(inputBuffer[i]);
    }
    that.frameCount += inputBuffer[0].length;
    return true;
}

function clear(){
    that.buffers = [];
    for (var i = 0; i < that.channelCount; i++) {
        that.buffers.push([]);
    }
    that.frameCount = 0;
    return true;
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

function getBuffers() {
    var i;
    var buffers = [];
    for (i = 0; i < that.channelCount; i ++) {
        buffers.push(flattenBuffer(that.buffers[i], that.frameCount));
    };
    return buffers;
}


