import { useState } from 'react';
import { IconProps } from '../../Types/Icon';

const TwoPlayerOppositeLandscape = ({ size, color, active }: IconProps) => {
  const [isChecked, setIsChecked] = useState(active || false);

  const handleRadioClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <label style={{ cursor: 'pointer' }}>
        <input
          type="radio"
          checked={isChecked}
          onChange={handleRadioClick}
          style={{ display: 'none' }}
        />
        <svg
          version="1.2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 802.000000 1374.000000"
          width={'auto'}
          height={size || 'auto'}
          fill={color}
          fillOpacity="1"
        >
          <g
            transform="translate(0.000000,1374.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              d="M1595 13549 c-176 -18 -347 -72 -522 -164 -144 -75 -250 -153 -368
-270 -203 -204 -336 -452 -407 -760 l-23 -100 -3 -5315 c-2 -3820 0 -5343 8
-5415 22 -201 72 -364 165 -543 73 -140 152 -246 267 -361 201 -201 410 -318
708 -398 l105 -28 2485 0 2485 0 117 32 c270 74 470 185 669 371 215 202 370
482 436 792 17 81 18 309 18 5480 0 5186 -1 5398 -18 5480 -120 557 -498 974
-1035 1144 -205 64 -6 60 -2627 62 -1309 1 -2416 -2 -2460 -7z m2365 -6679 l0
-6390 -1107 0 c-633 0 -1150 5 -1207 10 -325 32 -630 202 -830 465 -77 101
-166 277 -196 386 -51 190 -50 117 -50 2305 l0 2041 113 6 c184 10 325 60 423
150 151 137 275 597 275 1017 0 239 -35 471 -107 710 -94 313 -259 442 -587
457 l-117 6 3 2096 3 2096 21 90 c29 119 52 184 103 286 139 279 392 496 697
599 177 59 153 58 1411 59 l1152 1 0 -6390z m2555 6361 c50 -13 132 -41 184
-62 385 -157 654 -493 726 -906 13 -74 15 -365 15 -2148 l0 -2062 -117 -6
c-140 -7 -249 -33 -342 -82 -122 -64 -190 -159 -255 -355 -132 -400 -153 -832
-60 -1248 58 -256 118 -398 208 -488 107 -107 231 -152 439 -161 l127 -6 0
-2072 c0 -2279 3 -2147 -61 -2339 -137 -410 -497 -719 -929 -797 -61 -11 -298
-14 -1235 -14 l-1160 0 -3 6388 -2 6388 1187 -4 1188 -3 90 -23z"
            />
            <path
              d="M1950 7414 c-186 -49 -337 -190 -401 -374 -17 -50 -22 -89 -23 -165
-1 -128 25 -215 94 -318 107 -160 270 -247 464 -247 272 0 495 180 551 446 18
87 18 141 0 226 -44 212 -225 394 -433 437 -72 15 -185 13 -252 -5z"
            />
            <path
              d="M5731 7405 c-143 -46 -270 -157 -333 -291 -104 -222 -62 -461 111
-635 115 -115 242 -169 399 -169 236 0 453 159 533 390 31 92 32 237 1 337
-39 127 -129 241 -249 316 -125 79 -314 100 -462 52z"
            />
          </g>
        </svg>
      </label>
    </div>
  );
};

export default TwoPlayerOppositeLandscape;