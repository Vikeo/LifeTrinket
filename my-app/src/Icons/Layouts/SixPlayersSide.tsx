import { useState } from 'react';
import { IconProps } from '../../Types/Icon';

const SixPlayersSide = ({ size, color, active }: IconProps) => {
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
-1035 1144 -205 64 -6 60 -2627 62 -1309 1 -2416 -2 -2460 -7z m1240 -421 c0
-220 55 -377 167 -485 143 -136 607 -254 1003 -254 237 0 424 27 667 97 234
67 357 150 423 288 52 109 66 175 72 339 l6 148 621 -3 c616 -3 622 -3 716
-27 487 -122 831 -486 915 -968 12 -70 15 -205 15 -739 l0 -654 -3436 0 -3435
0 4 678 c3 648 4 681 25 767 28 119 51 184 102 286 139 279 392 496 697 599
166 55 203 58 848 59 l590 1 0 -132z m1125 -4278 l0 -1930 -1695 0 -1695 0 0
213 0 214 98 6 c172 12 314 63 408 150 88 80 160 247 219 512 76 339 76 682
-1 1020 -57 256 -113 390 -199 483 -93 101 -237 159 -425 171 l-95 6 -3 543
-2 542 1695 0 1695 0 0 -1930z m3480 1391 l0 -538 -94 -7 c-180 -12 -339 -72
-423 -159 -55 -56 -105 -150 -147 -277 -132 -400 -153 -832 -60 -1248 58 -256
118 -398 208 -488 101 -101 229 -151 414 -161 l102 -6 0 -218 0 -219 -1695 0
-1695 0 0 1930 0 1930 1695 0 1695 0 0 -539z m-3482 -5303 l-3 -1883 -1692 -3
-1693 -2 0 418 0 419 118 6 c189 10 328 59 428 150 151 137 275 597 275 1017
0 239 -35 471 -107 710 -95 315 -259 442 -591 457 l-123 6 0 293 0 294 1695 0
1695 0 -2 -1882z m3482 1593 l0 -288 -94 -7 c-180 -12 -339 -72 -423 -159 -55
-56 -105 -150 -147 -277 -132 -400 -153 -832 -60 -1248 58 -256 118 -398 208
-488 101 -101 229 -151 414 -161 l102 -6 0 -423 0 -424 -1695 0 -1695 0 0
1885 0 1885 1695 0 1695 0 0 -289z m0 -4270 c0 -766 -1 -787 -61 -965 -134
-400 -474 -700 -899 -792 -63 -14 -170 -17 -686 -21 l-611 -4 -6 103 c-7 118
-40 246 -83 323 -83 149 -240 233 -579 309 -238 54 -543 72 -760 46 -212 -25
-480 -93 -609 -155 -191 -90 -287 -254 -304 -520 l-7 -100 -530 -3 c-576 -3
-707 4 -854 43 -243 66 -478 225 -635 430 -77 101 -166 277 -196 386 -47 176
-50 221 -50 942 l0 677 3435 0 3435 0 0 -699z"
            />
            <path
              d="M3918 12240 c-165 -30 -300 -122 -391 -267 -79 -126 -100 -310 -52
-461 45 -144 155 -269 291 -334 221 -104 461 -62 635 111 115 115 169 242 169
399 0 234 -161 455 -386 531 -71 23 -198 34 -266 21z"
            />
            <path
              d="M1920 9074 c-186 -49 -337 -190 -401 -374 -17 -50 -22 -89 -23 -165
-1 -128 25 -215 94 -318 107 -160 270 -247 464 -247 272 0 495 180 551 446 18
87 18 141 0 226 -44 212 -225 394 -433 437 -72 15 -185 13 -252 -5z"
            />
            <path
              d="M5781 9055 c-143 -46 -270 -157 -333 -291 -104 -222 -62 -461 111
-635 115 -115 242 -169 399 -169 236 0 453 159 533 390 31 92 32 237 1 337
-39 127 -129 241 -249 316 -125 79 -314 100 -462 52z"
            />
            <path
              d="M1960 5614 c-186 -49 -337 -190 -401 -374 -17 -50 -22 -89 -23 -165
-1 -128 25 -215 94 -318 107 -160 270 -247 464 -247 272 0 495 180 551 446 18
87 18 141 0 226 -44 212 -225 394 -433 437 -72 15 -185 13 -252 -5z"
            />
            <path
              d="M5781 5595 c-143 -46 -270 -157 -333 -291 -104 -222 -62 -461 111
-635 115 -115 242 -169 399 -169 236 0 453 159 533 390 31 92 32 237 1 337
-39 127 -129 241 -249 316 -125 79 -314 100 -462 52z"
            />
            <path
              d="M3883 2525 c-108 -23 -190 -70 -276 -156 -114 -114 -167 -239 -167
-397 0 -236 159 -453 390 -533 92 -31 237 -32 337 -1 127 39 241 129 316 249
79 126 100 310 52 461 -86 272 -372 438 -652 377z"
            />
          </g>
        </svg>
      </label>
    </div>
  );
};

export default SixPlayersSide;
