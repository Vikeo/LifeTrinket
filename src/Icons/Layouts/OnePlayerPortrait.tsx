import { useState } from 'react';
import { IconProps } from '../../Types/Icon';

const OnePlayerPortrait = ({ size, color, active }: IconProps) => {
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
-4746 -2 -5317 -15 -5396 -85 -484 -454 -863 -945 -970 -63 -14 -170 -17 -686
-21 l-611 -4 -7 90 c-8 106 -43 234 -82 306 -83 149 -240 233 -579 309 -238
54 -543 72 -760 46 -212 -25 -480 -93 -609 -155 -186 -88 -282 -248 -304 -502
l-7 -88 -530 -3 c-309 -2 -578 2 -645 8 -565 50 -1011 485 -1080 1052 -8 68
-10 1519 -8 5388 l3 5295 22 90 c29 120 52 185 103 286 139 279 392 496 697
599 185 62 35 58 2643 56 l2385 -1 90 -24z"
            />
            <path
              d="M3883 2495 c-108 -23 -190 -70 -276 -156 -114 -114 -167 -239 -167
-397 0 -236 159 -453 390 -533 92 -31 237 -32 337 -1 127 39 241 129 316 249
79 126 100 310 52 461 -86 272 -372 438 -652 377z"
            />
          </g>
        </svg>
      </label>
    </div>
  );
};

export default OnePlayerPortrait;
