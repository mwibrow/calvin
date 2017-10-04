/*
    Geneerate default audio for testing
*/
var exec = require("child_process").exec, child;
var fs = require("fs-extra")
var path = require("path")

const talkers = [
    {
        name: "dan",
        gender: "m1",
        pitch: 25,
    },
    {
        name: "emma",
        gender: "f1",
        pitch: 50,
    },
    {
        name: "kerry",
        gender: "f2",
        pitch: 75,
    },
    {
        name: "mark",
        gender: "m2",
        pitch: 75,
    }
]

const hvds = [
    "heed",
    "hard",
    "hoard",
    "hear",
    "had",
    "head",
    "hod",
    "hud",
    "whod",
    "haired",
    "hoed",
    "hid",
    "hide",
    // "ʊə",
    "hayed",
    "hood",
    "hoyed",
    // "ə",
    "howd",
    "heard"
]

var generateAudio = function(talkers, words, wordType) {
    talkers.map(
        function(talker) {
            return fs.ensureDirSync(path.join(__dirname, "audio", talker.name, wordType));
        }
    );
    var i, j, wavPath;
    for (i = 0; i < talkers.length; i ++) {
        for (j = 0; j < words.length; j ++) {
            wavPath = path.join(__dirname, "audio", talkers[i].name, wordType, words[j] + ".wav");
            exec("espeak -ven-rp+" + talkers[i].gender.toLowerCase() + " -w " + wavPath + " -p " + talkers[i].pitch + " " + words[j],
            function (error, stdout, stderr) {
                if (error !== null) {
                     console.log("exec error: " + error);
                }
            });
        }
    }
}
var main = function() {
    var words = fs.readFileSync(path.join(__dirname, "word-list.txt"))
        .toString()
        .split("\n")
        .filter(function(word) { return word.length });
    
    generateAudio(talkers, words, 'words');
    generateAudio(talkers, hvds, 'vowels');
}

main()
// const makeCommand = function (talker, word) {
//     return "espeak "
// }
// child = exec("espeak hello",
// function (error, stdout, stderr) {
//     if (error !== null) {
//          console.log("exec error: " + error);
//     }
// });

