import { useState } from 'react';
import { IconProps } from '../../Types/Icon';

const OnePlayerLandscape = ({ size, color, active }: IconProps) => {
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
-1035 1144 -205 64 -6 60 -2627 62 -1309 1 -2416 -2 -2460 -7z m4920 -318 c50
-13 132 -41 184 -62 385 -157 654 -493 726 -906 13 -75 15 -734 15 -5393 0
-4746 -2 -5317 -15 -5396 -85 -484 -450 -859 -945 -971 -69 -16 -261 -17
-2390 -20 -1547 -3 -2353 0 -2430 7 -208 18 -383 80 -558 197 -281 187 -466
482 -518 828 -11 74 -14 459 -14 2136 l0 2046 98 6 c172 12 314 63 408 150 88
80 160 247 219 512 76 339 76 682 -1 1020 -57 256 -113 390 -199 483 -93 101
-237 159 -425 171 l-95 6 0 2080 c0 1962 1 2085 18 2165 92 436 387 770 804
910 185 62 35 58 2643 56 l2385 -1 90 -24z"
            />
            <path
              d="M1920 7424 c-186 -49 -337 -190 -401 -374 -17 -50 -22 -89 -23 -165
-1 -128 25 -215 94 -318 107 -160 270 -247 464 -247 272 0 495 180 551 446 18
87 18 141 0 226 -44 212 -225 394 -433 437 -72 15 -185 13 -252 -5z"
            />
          </g>
        </svg>
      </label>
    </div>
  );
};

export default OnePlayerLandscape;