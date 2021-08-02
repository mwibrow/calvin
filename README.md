# CALVin

*CALVin* or "Computer Assisted Learning for Vowels interface"
is a reimplementation of the software described in
Alshangiti W. (2015)
*Speech production and perception in adult Arabic learners of English:
A comparative study of the role of production and perception training
in the acquisition of British English vowels*. Doctoral thesis,
UCL (University College London).

## Overview

Alshangiti W. (2015) describes *CALVin*: a piece of
software designed to investigate the role of multi-talker and single-talker training in
the perception and production of standard Southern British English
(SSBE)
vowels by non-native British English speakers.

The software focussed primarily on vowels in a `hVd` _keywords_ (e.g.,
*"hid"*, *"heard"*, *"hard"*, *"hoard"*, etc.), and
pariticipants were shown an animated vocal tract
pronouncing these `hVd` keywords.
In addition, other examples of the SSBE vowels in
word contexts were shown, and
participants could also
practice their pronunication of these words by recording
themselves and comparing their recordings with those of
native SSBE speakers.

The original research focussed on adult Arabic speakers
and the current version of *CALVin* was developed to be used
with Arabic children, but in principle can be used with
other populations with different language backgrounds.
However, it should be noted that the interface to *CALVin*
is somewhat "colourful" (possibly garish) in order
to contrast with the somewhat "un-fun" and drab interfaces
often developed for research software.

## Implementation

The current version of *CALVin* is an [Ionic](https://ionicframework.com) app which has been optimised
for use with [electron](https://electronjs.org/) which
enabling its use on Linux, Windows and MacOS.

*CALVin* requires a substantial amount of audio, video
and image data which is _not_ currently available via this repository.

A demo of *CALVin* using syntheiszed speech is can be viewed in a browser by clicking 
[this link](https://mwibrow.github.io/calvin-demo/). Note that, full use of the demo
requies access to the computer's microphone.