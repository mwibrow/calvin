import p5 from "p5"

declare module "p5" {
  function getAudioContext(): AudioContext;
  function userStartAudio(elements?: HTMLElement[] | String[] | p5.Element[], callback?: (...args: any) => any): Promise<any>;
}
