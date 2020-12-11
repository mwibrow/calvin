import p5 from "p5"

declare module "p5" {
  function getAudioContext(): AudioContext;
  function userStartAudio(): null;
}
