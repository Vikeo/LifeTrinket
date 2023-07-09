import { useState } from 'react';
import { IconProps } from '../../Types/Icon';

const FivePlayers = ({ size, color, active }: IconProps) => {
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
-1035 1144 -205 64 -6 60 -2627 62 -1309 1 -2416 -2 -2460 -7z m2365 -2499 l0
-2210 -1695 0 -1695 0 0 403 0 404 113 6 c184 10 325 60 423 150 151 137 275
597 275 1017 0 239 -35 471 -107 710 -95 314 -259 442 -588 457 l-119 6 6 116
c11 188 48 334 127 492 139 279 392 496 697 599 177 59 153 58 1411 59 l1152
1 0 -2210z m2555 2181 c50 -13 132 -41 184 -62 385 -157 654 -493 726 -906 12
-69 15 -198 15 -683 l0 -597 -112 -6 c-136 -8 -246 -34 -337 -82 -122 -64
-190 -159 -255 -355 -132 -400 -153 -832 -60 -1248 58 -256 118 -398 208 -488
106 -106 230 -152 434 -161 l122 -6 0 -1767 0 -1767 -112 -6 c-136 -8 -246
-34 -337 -82 -122 -64 -190 -159 -255 -355 -132 -400 -153 -832 -60 -1248 58
-256 118 -398 208 -488 106 -106 230 -152 434 -161 l122 -6 0 -597 c0 -656 -2
-690 -61 -864 -137 -410 -497 -719 -929 -797 -61 -11 -298 -14 -1235 -14
l-1160 0 -3 6388 -2 6388 1187 -4 1188 -3 90 -23z m-2555 -6411 l0 -1920
-1695 0 -1695 0 0 393 0 394 113 6 c184 10 325 60 423 150 151 137 275 597
275 1017 0 239 -35 471 -107 710 -94 313 -259 442 -586 457 l-118 6 0 353 0
354 1695 0 1695 0 0 -1920z m0 -4175 l0 -2165 -1107 0 c-633 0 -1150 5 -1207
10 -325 32 -630 202 -830 465 -150 197 -246 475 -246 716 l0 66 113 6 c184 10
325 60 423 150 151 137 275 597 275 1017 0 239 -35 471 -107 710 -94 313 -259
442 -586 457 l-118 6 0 363 0 364 1695 0 1695 0 0 -2165z"
            />
            <path
              d="M1950 11374 c-186 -49 -337 -190 -401 -374 -17 -50 -22 -89 -23 -165
-1 -128 25 -215 94 -318 107 -160 270 -247 464 -247 272 0 495 180 551 446 18
87 18 141 0 226 -44 212 -225 394 -433 437 -72 15 -185 13 -252 -5z"
            />
            <path
              d="M5741 10335 c-143 -46 -270 -157 -333 -291 -104 -222 -62 -461 111
-635 115 -115 242 -169 399 -169 236 0 453 159 533 390 31 92 32 237 1 337
-39 127 -129 241 -249 316 -125 79 -314 100 -462 52z"
            />
            <path
              d="M5741 4455 c-143 -46 -270 -157 -333 -291 -104 -222 -62 -461 111
-635 115 -115 242 -169 399 -169 236 0 453 159 533 390 31 92 32 237 1 337
-39 127 -129 241 -249 316 -125 79 -314 100 -462 52z"
            />
            <path
              d="M1950 7414 c-186 -49 -337 -190 -401 -374 -17 -50 -22 -89 -23 -165
-1 -128 25 -215 94 -318 107 -160 270 -247 464 -247 272 0 495 180 551 446 18
87 18 141 0 226 -44 212 -225 394 -433 437 -72 15 -185 13 -252 -5z"
            />
            <path
              d="M1950 3464 c-186 -49 -337 -190 -401 -374 -17 -50 -22 -89 -23 -165
-1 -128 25 -215 94 -318 107 -160 270 -247 464 -247 272 0 495 180 551 446 40
190 -13 364 -156 507 -115 116 -241 168 -402 166 -40 0 -97 -7 -127 -15z"
            />
          </g>
        </svg>
      </label>
    </div>
  );
};

export default FivePlayers;
