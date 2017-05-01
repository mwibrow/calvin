import { Injectable } from '@angular/core';

@Injectable()
export class Svg {

  calvin: any;
  constructor() {

    this.calvin = new Calvin();
  }
}


export class Calvin {

  public svg: any = {
  calvinNeutral:`
<svg class="calvin" viewBox="0 0 512 512">
  <g class="calvin-neutral">
    <path
      d="M 101.71429,496.3622 L 118.74903,417.96242 L 135.42995,350.42384 L 213.14286,333.50499 L 264.57143,324.93356 L 298.85714,333.50499 L 375.99999,350.64785 L 393.14285,419.21927 L 410.2857,496.3622 L 264.57143,496.3622 Z"
      class="calvin-arms"
    />
    <path
      d="M 155.04696,496.3622 L 170.28572,402.07641 L 187.42857,367.7907 L 213.14286,333.50499 L 264.57143,319.98836 L 298.85714,333.50499 L 324.57142,367.7907 L 341.71428,402.07641 L 358.85713,496.3622 L 265.52348,496.3622 Z"
      class="calvin-chest"
    />
    <path
      d="M 213.14286,294.93356 L 298.85714,294.93356 L 298.85714,342.07642 L 256,410.64784 L 213.14286,342.07642 Z"
      class="calvin-neck"
    />
    <path
      d="M 367.42856,204.93357 L 350.28571,256.36214 L 324.57142,282.07642 L 303.14285,303.50499 L 281.71428,312.07642 L 230.28571,312.07642 L 208.85714,303.50499 L 187.42857,282.07642 L 161.71429,252.07642 L 144.57143,204.93361 L 153.14286,153.505 L 170.28572,102.07643 L 256,84.93358 L 341.71428,102.07643 L 358.85713,153.505 Z"
      class="calvin-head"
    />
    <path
      d="M 230.28571,172.79071 A 17.142853,19.285721 0 0 1 213.14285,192.07643 A 17.142853,19.285721 0 0 1 196,172.79071 A 17.142853,19.285721 0 0 1 213.14285,153.50499 A 17.142853,19.285721 0 0 1 230.28571,172.79071 Z"
      class="calvin-eye-right"
    />
    <path
      d="M 316,172.79071 A 17.142853,19.285721 0 0 1 298.85715,192.07643 A 17.142853,19.285721 0 0 1 281.71429,172.79071 A 17.142853,19.285721 0 0 1 298.85715,153.50499 A 17.142853,19.285721 0 0 1 316,172.79071 Z"
      class="calvin-eye-left"
    />
    <path
      d="M 110.28572,179.21929 L 118.85715,222.07643 L 144.57143,247.79071 L 153.14286,247.79071 L 170.28572,196.36214 L 144.57143,162.07643 L 118.85715,162.07643 Z"
      class="calvin-ear-right"
    />
    <path
      d="M 136.00001,222.07643 L 144.57143,213.505 L 144.57143,196.36214 L 144.57143,187.79071 L 136.00001,179.21929 L 127.42858,196.36214 Z"
      class="calvin-ear-right-inner"
    />
    <path
      d="M 401.71427,179.21929 L 393.14285,222.07643 L 367.42856,247.79071 L 358.85713,247.79071 L 341.71428,196.36214 L 367.42856,162.07643 L 393.14285,162.07643 Z"
      class="calvin-ear-left"
    />
    <path
      d="M 375.99999,222.07643 L 367.42856,213.505 L 367.42856,196.36214 L 367.42856,187.79071 L 375.99999,179.21929 L 384.57142,196.36214 Z"
      class="calvin-ear-left-inner"
    />
    <path
      d="M 153.14286,204.93357 L 153.14286,162.07643 L 161.71429,136.36215 L 178.85715,110.64786 L 213.14286,119.21929 L 228.69261,102.07643 L 256,119.21929 L 281.71428,102.07643 L 298.85714,119.21929 L 333.14285,110.64786 L 350.28571,136.36215 L 358.85713,162.07643 L 359.42856,204.93357 L 384.57142,119.21929 L 358.85713,33.50501 L 333.14285,67.79072 L 315.99999,16.36215 L 290.28571,42.07644 L 256,16.36215 L 221.71429,42.07644 L 196,16.36215 L 178.85715,67.79072 L 153.14286,33.50501 L 127.42858,119.21929 Z"
      class="calvin-hair"
    />
    <path
      d="M 221.71429,256.36214 L 226,247.79071 L 256,252.07642 L 286,247.79071 L 290.28571,256.36214 L 267.42857,273.50502 L 244.57142,273.50502 Z"
      class="calvin-lips"
    />
  </g>
</svg>`,
calvinWave:`
<svg class="calvin" viewBox="0 0 512 512">
  <g class="calvin-wave">
    <path
      d="M 428,312 L 400,268 L 400,256 L 404,248 L 416,248 L 424,256 L 424,248 L 424,216 L 428,208 L 440,208 L 444,216 L 444,208 L 448,200 L 460,200 L 464,208 L 464,220 L 468,212 L 480,212 L 484,220 L 484,232 L 484,240 L 488,232 L 496,232 L 500,240 L 500,268 L 488,304 L 484,320 L 484,328 L 436,328 L 436,320 Z"
      class="calvin-hand-left"
    />
    <path
      d="M 256,328 L 213.14258,333.14258 L 135.42969,350.0625 L 118.75,417.59961 L 101.71484,496 L 264.57227,496 L 360,496 L 388,496 L 392,468 L 415.36719,496 L 448,496 L 472,480 L 480,448 L 484,328 L 436,328 L 424,408 L 376,352 L 298.85742,333.14258 Z"
      class="calvin-arms"
    />
    <path
      d="M 155.04696,496.00001 L 170.28572,401.71426 L 187.42857,367.42854 L 213.14286,333.14283 L 264.57143,319.6262 L 298.85714,333.14283 L 324.57142,367.42854 L 341.71428,401.71426 L 358.85713,496.00001 L 265.52348,496.00001 Z"
      class="calvin-chest"
    />
    <path
      d="M 213.14286,294.57141 L 298.85714,294.57141 L 298.85714,341.71426 L 256,410.28568 L 213.14286,341.71426 Z"
      class="calvin-neck"
    />
    <path
      d="M 367.42856,204.57147 L 350.2857,256.00004 L 324.57142,281.71432 L 303.14285,315.71432 L 277.42856,324.28575 L 230.28571,324.28575 L 208.85714,315.71432 L 187.42857,281.71432 L 161.71429,251.71432 L 144.57143,204.57151 L 153.14286,153.1429 L 170.28571,101.71433 L 255.99999,84.57148 L 341.71427,101.71433 L 358.85713,153.1429 Z"
      class="calvin-head"
    />
    <path
      d="M 230.28571,172.42859 A 17.142853,19.285721 0 0 1 213.14285,191.71431 A 17.142853,19.285721 0 0 1 196,172.42859 A 17.142853,19.285721 0 0 1 213.14285,153.14287 A 17.142853,19.285721 0 0 1 230.28571,172.42859 Z"
      class="calvin-eye-right"
    />
    <path
      class="calvin-mouth"
      d="M 196,234.28516 L 187.42773,242.85742 L 226,290 L 230.28516,285.71484 L 243.14258,281.42773 L 268.85742,281.42773 L 281.71484,285.71484 L 286,290 L 324.57227,242.85742 L 316,234.28516 L 290.28516,260 L 273.14258,268.57227 L 238.85742,268.57227 L 217.42773,260 L 196,234.28516 Z"
    />
    <path
      d="M 196,234.28575 L 217.42857,260.00004 L 238.85714,268.57147 L 273.14285,268.57147 L 290.28571,260.00004 L 315.99999,234.28575 L 281.71428,255.71432 L 264.57142,260.00004 L 247.42857,260.00004 L 230.28571,255.71432 Z"
      class="calvin-teeth"
    />
    <path
      d="M 226,290.00004 L 230.28571,285.71432 L 243.14285,281.42861 L 268.85714,281.42861 L 281.71428,285.71432 L 285.99999,290.00004 L 268.85714,298.57146 L 243.14285,298.57146 Z"
      class="calvin-tongue"
    />
    <path
      d="M 316,172.42859 A 17.142853,19.285721 0 0 1 298.85715,191.71431 A 17.142853,19.285721 0 0 1 281.71429,172.42859 A 17.142853,19.285721 0 0 1 298.85715,153.14287 A 17.142853,19.285721 0 0 1 316,172.42859 Z"
      class="calvin-eye-left"
    />
    <path
      d="M 110.28572,178.85713 L 118.85715,221.71427 L 144.57143,247.42856 L 153.14286,247.42856 L 170.28572,195.99998 L 144.57143,161.71427 L 118.85715,161.71427 Z"
      class="calvin-ear-right"
    />
    <path
      d="M 136.00001,221.71427 L 144.57143,213.14284 L 144.57143,195.99998 L 144.57143,187.42855 L 136.00001,178.85713 L 127.42858,195.99998 Z"
      class="calvin-ear-right-inner"
    />
    <path
      d="M 401.71427,178.85713 L 393.14285,221.71427 L 367.42856,247.42856 L 358.85713,247.42856 L 341.71428,195.99998 L 367.42856,161.71427 L 393.14285,161.71427 Z"
      class="calvin-ear-left"
    />
    <path
      d="M 375.99999,221.71427 L 367.42856,213.14284 L 367.42856,195.99998 L 367.42856,187.42855 L 375.99999,178.85713 L 384.57141,195.99998 Z"
      class="calvin-ear-left-inner"
    />
    <path
      d="M 153.14286,204.57141 L 153.14286,161.71427 L 161.71429,135.99999 L 178.85715,110.2857 L 213.14286,118.85713 L 228.69261,101.71428 L 256,118.85713 L 281.71428,101.71428 L 298.85714,118.85713 L 333.14285,110.2857 L 350.28571,135.99999 L 358.85713,161.71427 L 359.42856,204.57141 L 384.57142,118.85713 L 358.85713,33.142853 L 333.14285,67.428565 L 315.99999,15.999997 L 290.28571,41.714281 L 256,15.999997 L 221.71429,41.714281 L 196,15.999997 L 178.85715,67.428565 L 153.14286,33.142853 L 127.42858,118.85713 Z"
      class="calvin-hair"
    />
  </g>
</svg>`,
calvinCheer:`
<svg class="calvin" viewBox="0 0 512 512">
  <g class="calvin-cheer">
    <path
      d="M 428,120 L 400,76 L 400,64 L 404,56 L 416,56 L 424,64 L 424,56 L 424,24 L 428,16 L 440,16 L 444,24 L 444,16 L 448,8 L 460,8 L 464,16 L 464,28 L 468,20 L 480,20 L 484,28 L 484,40 L 484,48 L 488,40 L 496,40 L 500,48 L 500,76 L 488,112 L 484,128 L 484,136 L 436,136 L 436,128 Z"
      class="calvin-hand-left"
    />
    <path
      d="M 28,136 L 32,288 L 112,408 L 124,496 L 144,496 L 152,496 L 264.57227,496 L 368,496 L 388,496 L 400,408 L 480,288 L 484,136 L 436,136 L 424,264 L 376,320 L 298.85742,333.14258 L 264.57227,324.57227 L 213.14258,333.14258 L 136,320 L 88,264 L 76,136 L 28,136 Z"
      class="calvin-arms"
    />
    <path
      d="M 155.04696,496.00001 L 170.28572,401.71426 L 187.42857,367.42854 L 213.14286,333.14283 L 264.57143,319.6262 L 298.85714,333.14283 L 324.57142,367.42854 L 341.71428,401.71426 L 358.85713,496.00001 L 265.52348,496.00001 Z"
      class="calvin-chest"
    />
    <path
      d="M 213.14286,294.57141 L 298.85714,294.57141 L 298.85714,341.71426 L 256,410.28568 L 213.14286,341.71426 Z"
      class="calvin-neck"
    />
    <path
      d="M 367.42856,204.57147 L 350.2857,256.00004 L 324.57142,281.71432 L 303.14285,315.71432 L 277.42856,324.28575 L 230.28571,324.28575 L 208.85714,315.71432 L 187.42857,281.71432 L 161.71429,251.71432 L 144.57143,204.57151 L 153.14286,153.1429 L 170.28571,101.71433 L 255.99999,84.57148 L 341.71427,101.71433 L 358.85713,153.1429 Z"
      class="calvin-head"
    />
    <path
      d="M 230.28571,172.42859 A 17.142853,19.285721 0 0 1 213.14285,191.71431 A 17.142853,19.285721 0 0 1 196,172.42859 A 17.142853,19.285721 0 0 1 213.14285,153.14287 A 17.142853,19.285721 0 0 1 230.28571,172.42859 Z"
      class="calvin-eye-right"
    />
    <path
      class="calvin-mouth"
      d="M 196,234.28516 L 187.42773,242.85742 L 226,290 L 230.28516,285.71484 L 243.14258,281.42773 L 268.85742,281.42773 L 281.71484,285.71484 L 286,290 L 324.57227,242.85742 L 316,234.28516 L 290.28516,260 L 273.14258,268.57227 L 238.85742,268.57227 L 217.42773,260 L 196,234.28516 Z"
    />
    <path
      d="M 196,234.28575 L 217.42857,260.00004 L 238.85714,268.57147 L 273.14285,268.57147 L 290.28571,260.00004 L 315.99999,234.28575 L 281.71428,255.71432 L 264.57142,260.00004 L 247.42857,260.00004 L 230.28571,255.71432 Z"
      class="calvin-teeth"
    />
    <path
      d="M 226,290.00004 L 230.28571,285.71432 L 243.14285,281.42861 L 268.85714,281.42861 L 281.71428,285.71432 L 285.99999,290.00004 L 268.85714,298.57146 L 243.14285,298.57146 Z"
      class="calvin-tongue"
    />
    <path
      d="M 316,172.42859 A 17.142853,19.285721 0 0 1 298.85715,191.71431 A 17.142853,19.285721 0 0 1 281.71429,172.42859 A 17.142853,19.285721 0 0 1 298.85715,153.14287 A 17.142853,19.285721 0 0 1 316,172.42859 Z"
      class="calvin-eye-left"
    />
    <path
      d="M 110.28572,178.85713 L 118.85715,221.71427 L 144.57143,247.42856 L 153.14286,247.42856 L 170.28572,195.99998 L 144.57143,161.71427 L 118.85715,161.71427 Z"
      class="calvin-ear-right"
    />
    <path
      d="M 136.00001,221.71427 L 144.57143,213.14284 L 144.57143,195.99998 L 144.57143,187.42855 L 136.00001,178.85713 L 127.42858,195.99998 Z"
      class="calvin-ear-right-inner"
    />
    <path
      d="M 401.71427,178.85713 L 393.14285,221.71427 L 367.42856,247.42856 L 358.85713,247.42856 L 341.71428,195.99998 L 367.42856,161.71427 L 393.14285,161.71427 Z"
      class="calvin-ear-right"
    />
    <path
      d="M 375.99999,221.71427 L 367.42856,213.14284 L 367.42856,195.99998 L 367.42856,187.42855 L 375.99999,178.85713 L 384.57141,195.99998 Z"
      class="calvin-ear-right-inner"
    />
    <path
      d="M 153.14286,204.57141 L 153.14286,161.71427 L 161.71429,135.99999 L 178.85715,110.2857 L 213.14286,118.85713 L 228.69261,101.71428 L 256,118.85713 L 281.71428,101.71428 L 298.85714,118.85713 L 333.14285,110.2857 L 350.28571,135.99999 L 358.85713,161.71427 L 359.42856,204.57141 L 384.57142,118.85713 L 358.85713,33.142853 L 333.14285,67.428565 L 315.99999,15.999997 L 290.28571,41.714281 L 256,15.999997 L 221.71429,41.714281 L 196,15.999997 L 178.85715,67.428565 L 153.14286,33.142853 L 127.42858,118.85713 Z"
      class="calvin-hair"
    />
    <path
      d="M 84,120 L 112,76 L 112,64 L 108,56 L 96,56 L 88,64 L 88,56 L 88,24 L 84,16 L 72,16 L 68,24 L 68,16 L 64,8 L 52,8 L 48,16 L 48,28 L 44,20 L 32,20 L 28,28 L 28,40 L 28,48 L 24,40 L 16,40 L 12,48 L 12,76 L 24,112 L 28,128 L 28,136 L 76,136 L 76,128 Z"
      class="calvin-hand-right"
    />
  </g>
</svg>`,
calvinProfile:`
<svg class="calvin" viewBox="0 0 512 512">
  <g class="calvin-profile">
    <path
      d="M 273.3191,59.32863 L 169.33042,76.66008 L 147.86564,143.375 L 100.02931,204.82242 L 128.22042,226.09956 L 136.17317,231.95146 L 134.80857,238.71945 L 131.58642,255.52197 L 192.00651,256.87484 L 136.38754,269.95904 L 145.40023,288.74817 L 148.12731,319.82926 L 225.65762,323.63321 L 273.3191,388.62614 L 316.24786,368.92939 L 388.22034,413.0683 L 351.31061,293.30318 L 394.63923,232.64311 L 411.97068,163.31732 L 359.97634,76.66008 Z"
      class="calvin-head"
    />
    <path
      d="M 198.34045,495.99998 L 238.6562,384.29328 L 260.32051,371.29469 L 312.31485,340.96466 L 377,367 L 411.29815,495.99998 L 311.31859,495.99998 Z"
      class="calvin-chest"
    />
    <path
      d="M 242.42069,495.99998 L 281.4864,381.13429 L 324.31717,366.0141 L 359.97634,423.28904 L 367.2179,495.99998 L 311.31859,495.99998 Z"
      class="calvin-arms"
    />
    <path
      d="M 260.32051,371.29469 L 225.65762,323.63321 L 307.98199,310.63462 L 342.64489,262.97314 L 377,367 L 312.31485,340.96466 Z"
      class="calvin-neck"
    />
    <path
      d="M 351.31061,293.30318 L 394.63923,232.64311 L 411.97068,163.31732 L 377.30778,76.66008 L 359.97634,59.32863 L 333.97916,24.66573 L 290.65054,41.99718 L 273.3191,16.00001 L 221.32475,41.99718 L 186.66186,24.66573 L 134.66751,41.99718 L 169.33042,76.66008 L 186.66186,111.32297 L 203.99331,93.99152 L 212.65904,128.65442 L 244.00651,116.87484 L 260.00651,204.87484 L 268.00651,180.87484 L 333.97916,197.98021 L 333.97916,232.64311 Z"
      class="calvin-hair"
    />
    <path
      d="M 190.99473,156.81804 A 15.165015,19.497883 0 0 1 175.82971,176.31592 A 15.165015,19.497883 0 0 1 160.6647,156.81804 A 15.165015,19.497883 0 0 1 175.82971,137.32016 A 15.165015,19.497883 0 0 1 190.99473,156.81804 Z"
      class="calvin-eye-left"
    />
    <path
      d="M 324.14564,170.80311 L 315.49897,214.99984 L 292.00651,240.52176 L 278.10965,239.47422 L 268.00651,180.87484 L 292.00651,148.87484 L 317.63544,151.51849 Z"
      class="calvin-ear-left"
    />
    <path
      d="M 298.02506,173.65157 L 286.49692,180.93207 L 292.8229,204.37427 L 288.18656,220.08989 L 299.74207,227.3704 L 315.90494,204.37427 Z"
      class="calvin-ear-left-inner"
    />
  </g>
</svg>`,
calvinVocalTract:`
<svg class="calvin" viewBox="0 0 512 512">
  <g class="calvin-vocal-tract">
    <path
      d="M 273.31836,16 L 221.32422,41.998047 L 186.66211,24.666016 L 134.66797,41.998047 L 169.33008,76.660156 L 147.86523,143.375 L 100.0293,204.82227 L 128.2207,226.09961 L 136.17383,231.95117 L 134.80859,238.71875 L 131.58594,255.52148 L 192.00586,256.875 L 136.38672,269.95898 L 145.40039,288.74805 L 148.12695,319.83008 L 225.6582,323.63281 L 260.32031,371.29492 L 238.65625,384.29297 L 198.33984,496 L 311.31836,496 L 411.29883,496 L 377,367 L 352.29492,291.92383 L 394.63867,232.64258 L 411.9707,163.31641 L 377.30859,76.660156 L 359.97656,59.328125 L 333.97852,24.666016 L 290.65039,41.998047 Z"
      class="calvin-head"
    />
    <path
      d="M 170.67339,277.91857 C 167.35862,278.06449 164.61005,279.08637 162.39936,280.76795 C 162.78143,282.36135 163.03063,284.20788 163.41142,287.59839 C 164.24243,294.99787 160.40692,306.20546 165.75817,310.28368 C 168.52239,312.39031 174.44139,311.87757 181.38214,310.90166 C 182.03169,309.57637 182.58841,308.00966 182.96266,306.15149 C 184.78927,297.08197 174.12412,283.25227 174.36542,278.28306 C 173.25957,277.98868 172.03379,277.85868 170.67339,277.91857 Z"
      class="calvin-vocal-tract-gum-lower"
    />
    <path
      d="M 175.86593,262.72218 C 175.58782,257.4103 185.24972,249.43123 198.26209,247.15778 C 211.27446,244.88434 220.47441,247.45915 234.56693,252.53031 C 248.65947,257.60146 259.5155,263.434 266.02645,274.31454 C 272.53739,285.19509 262.17762,296.05774 263.40556,303.84785 C 264.63348,311.63797 265.76709,313.06529 265.76709,313.06529 L 174.55292,317.61065 C 174.55292,317.61065 181.07,315.55103 182.96316,306.15118 C 184.85631,296.75133 173.32721,282.23503 174.43315,277.77272 C 175.53912,273.3104 188.39228,281.79308 190.60006,281.02359 C 192.80784,280.2541 192.98601,276.80324 191.51936,274.5627 C 190.05272,272.32216 188.07453,272.26528 184.84566,271.01916 C 181.61678,269.77304 176.14403,268.03406 175.86593,262.72218 Z"
      class="calvin-vocal-tract-tongue"
    />
    <path
      d="M 158.299,202.66137 C 147.48933,203.17539 145.11922,204.34149 139.63047,205.50114 C 133.32277,206.8338 131.42806,212.25587 135.75728,214.63531 C 140.08651,217.01475 144.33913,216.62479 145.86961,220.12264 C 147.4001,223.62048 147.01428,223.37974 146.68568,227.46284 C 146.35709,231.54594 145.04866,237.87283 143.8992,240.4743 C 142.74974,243.07577 140.55871,244.64342 140.32163,248.27126 C 140.08455,251.89911 143.31355,255.72233 147.95349,256.27801 C 152.59344,256.83368 156.06581,252.84364 156.34834,250.01047 C 156.60754,247.41143 156.40645,235.8738 157.74836,231.57471 C 157.35972,224.21891 159.44482,219.20348 159.46376,211.94228 C 159.48019,205.64157 157.19364,204.43963 158.299,202.66137 Z"
      class="calvin-vocal-tract-lip-upper"
    />
    <path
      d="M 149.96665,264.4855 C 155.14539,264.5061 157.56745,267.79525 159.95614,273.74166 C 162.34483,279.68807 162.51517,279.8059 163.32447,287.20756 C 164.13376,294.60921 160.26607,305.8073 165.60534,309.8997 C 170.94459,313.9921 188.04337,308.32693 201.69705,308.41105 C 215.35073,308.49518 229.76405,310.06808 237.39382,310.71613 C 245.0236,311.36418 262.56849,306.58931 263.77581,304.76919 C 264.98312,302.94907 270.12167,293.97992 272.19167,291.10247 C 274.26168,288.22502 277.75046,283.2122 280.44257,284.67049 C 283.13468,286.12878 283.77781,289.29609 281.26562,293.92253 C 278.75343,298.54898 269.09999,313.98307 269.05923,323.68847 C 269.01845,333.39387 288,364 288,380 C 288,396 264,388 252,416 C 241.70222,440.02816 239.43702,490.64478 236,496 C 224,496 216,496 208,496 C 216,464 236,400 244,392 C 252,384 264.06705,377.06874 264,372 C 263.93295,366.93126 235.92496,323.3645 230.58884,322.0709 C 225.2527,320.7773 210.80213,317.29588 203.39353,318.28842 C 195.98492,319.28094 164.63455,325.08238 156.59169,317.80997 C 148.54882,310.53755 153.24165,300.59177 153.04448,294.54622 C 152.84729,288.50068 150.17912,283.39159 149.2025,281.30635 C 148.22587,279.2211 143.20855,275.45851 142.854,272.79657 C 142.49944,270.13463 144.78791,264.46491 149.96665,264.4855 Z"
      class="calvin-vocal-tract-lower-lip"
    />
    <path
      d="M 291.83199,321.96358 C 292.06007,318.2976 292.51192,316.85037 294.68567,316.11431 C 296.85941,315.37826 299.28208,315.37293 301.15987,319.31768 C 303.03767,323.26243 320,360 324,376 C 328,392 332,464 328,496 L 308,496 C 308,476 316,400 312,380 C 308,360 291.60389,325.62956 291.83199,321.96358 Z"
      class="calvin-vocal-tract-laryngeal-wall"
    />
    <path
      d="M 125.85007,203.94759 C 125.40609,197.93502 123.69737,194.78861 127.55362,189.25371 C 134.81651,178.82923 147.83131,167.68044 167.33068,162.31984 C 186.83005,156.95925 214.3439,161.34768 225.28537,164.0327 C 236.22683,166.71772 237.93246,184.65906 248.21422,189.90429 C 258.49599,195.14952 266.34364,199.30356 278.88641,214.73979 C 291.42918,230.17601 290.6417,257.95941 298.04631,283.60093 C 303.54352,302.55768 324.71449,336.47647 338.06697,371.82475 C 351.41945,407.17303 352,496 352,496 L 400,496 C 400,496 378.19817,394.73524 369.74258,371.82475 C 361.28699,348.91426 330.82171,274.92189 351.38816,249.84203 C 371.95461,224.76216 385.30724,163.0968 376.79297,138.80732 C 368.27869,114.51783 355.1758,93.4091 325.70732,78.08361 C 296.23885,62.758127 211.90041,61.735233 190.45696,79.654671 C 169.01351,97.57411 162.909,131.93766 148.0628,150.9038 C 148.0628,150.9038 111.78267,193.03372 112.59727,202.57766 C 113.41188,212.1216 126.29403,209.96015 125.85007,203.94759 Z"
      class="calvin-vocal-tract-head"
    />
    <path
      d="M 174.65259,294.76849 C 172.94533,296.05865 164.13503,281.96334 163.14825,279.03947 C 162.16146,276.11561 162.71252,262.94181 165.15337,262.79701 C 167.59423,262.6522 171.8494,272.30572 172.83516,275.31841 C 173.82093,278.33111 176.35986,293.47834 174.65259,294.76849 Z"
      class="calvin-vocal-tract-teeth-lower"
    />
    <path
      d="M 242.41173,205.84216 C 248.49744,206.63135 253.85617,207.69481 254.21762,209.41047 C 254.81957,212.26768 239.84714,211.54415 222.75436,210.50276 C 235.82921,212.67138 248.94326,214.79448 256.00172,219.85499 C 263.06019,224.9155 262.38985,226.98984 264.74735,233.00906 C 267.10487,239.02829 267.76107,245.14002 269.74784,244.78666 C 271.73461,244.4333 273.31096,237.63099 273.59812,231.39697 C 273.88529,225.16294 272.11553,213.58943 268.10426,211.50102 C 264.09299,209.41262 259.23732,207.40142 245.77592,206.17181 C 244.59471,206.06392 243.5093,205.95315 242.41173,205.84216 Z"
      class="calvin-vocal-tract-velum"
    />
    <path
      d="M 157.76228,231.90895 C 158.23488,239.45105 157.09562,237.97104 157.83437,240.28738 C 158.5731,242.60372 167.93979,245.73858 170.02822,240.83734 C 172.11666,235.9361 178.02536,224.28414 181.16979,217.91469 C 184.31422,211.54524 190.21642,212.08006 198.43908,210.99089 C 206.63556,209.90519 207.64992,208.896 222.75392,210.50315 C 237.85792,212.11029 254.81969,212.268 254.21775,209.41079 C 253.6158,206.55358 239.17093,205.49769 230.55086,204.52257 C 224.31014,203.80832 217.96155,203.15277 208.77386,202.73719 C 192.60996,202.00605 162.01577,199.17523 159.17454,201.67803 C 156.33329,204.18082 159.48294,204.57038 159.46372,211.94254 C 159.4445,219.31471 157.28968,224.36686 157.76228,231.90895 Z"
      class="calvin-vocal-tract-alveolar-ridge"
    />
    <path
      d="M 169.54158,221.44989 C 167.77341,220.23618 159.65798,234.70384 158.81443,237.66797 C 157.97089,240.6321 159.16197,253.76758 161.60727,253.80489 C 164.05255,253.8422 167.83373,244.0119 168.67194,240.95908 C 169.51015,237.90625 171.30976,222.66359 169.54158,221.44989 Z"
      class="calvin-vocal-tract-teeth-upper"
    />
    <path
      d="M 297.63081,337.40008 A 12.380567,3.2157488 0 0 1 285.25024,340.61584 A 12.380567,3.2157488 0 0 1 272.86967,337.40008 A 12.380567,3.2157488 0 0 1 285.25024,334.18434 A 12.380567,3.2157488 0 0 1 297.63081,337.40008 Z"
      class="calvin-vocal-tract-pharynx"
    />
  </g>
</svg>`
  };
}
