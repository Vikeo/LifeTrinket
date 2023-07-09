import { useState } from 'react';
import { IconProps } from '../../Types/Icon';

const TwoPlayersOppositePortrait = ({ size, color, active }: IconProps) => {
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
-1035 1144 -205 64 -6 60 -2627 62 -1309 1 -2416 -2 -2460 -7z m1239 -396 c12
-203 66 -342 168 -440 103 -98 398 -195 723 -238 139 -18 401 -21 530 -5 212
25 480 93 609 155 193 92 288 256 303 523 l6 113 621 -3 c616 -3 622 -3 716
-27 487 -122 831 -486 915 -968 13 -74 15 -431 15 -2729 l0 -2644 -3435 0
-3435 0 3 2668 3 2667 21 90 c29 120 52 184 103 286 139 279 392 496 697 599
166 55 204 58 844 59 l586 1 7 -107z m4606 -8972 c0 -2881 4 -2692 -61 -2885
-134 -400 -474 -700 -899 -792 -63 -14 -170 -17 -686 -21 l-611 -4 -6 113
c-15 270 -108 435 -298 526 -139 67 -366 127 -594 157 -139 18 -400 21 -530 5
-212 -25 -480 -93 -609 -155 -194 -92 -288 -257 -305 -530 l-6 -110 -530 -3
c-576 -3 -707 4 -854 43 -243 66 -478 225 -635 430 -77 101 -166 277 -196 386
-52 192 -50 73 -50 2862 l0 2597 3435 0 3435 0 0 -2619z"
            />
            <path
              d="M3918 12310 c-165 -30 -300 -122 -391 -267 -79 -126 -100 -310 -52
-461 45 -144 155 -269 291 -334 221 -104 461 -62 635 111 115 115 169 242 169
399 0 234 -161 455 -386 531 -71 23 -198 34 -266 21z"
            />
            <path
              d="M3883 2545 c-108 -23 -190 -70 -276 -156 -114 -114 -167 -239 -167
-397 0 -236 159 -453 390 -533 92 -31 237 -32 337 -1 127 39 241 129 316 249
79 126 100 310 52 461 -86 272 -372 438 -652 377z"
            />
          </g>
        </svg>
      </label>
    </div>
  );
};

export default TwoPlayersOppositePortrait;
