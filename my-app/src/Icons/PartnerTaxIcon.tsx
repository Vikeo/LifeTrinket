import { IconProps } from '../Types/Icon';

const PartnerTaxIcon = ({ size, color }: IconProps) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 325 325"
        width={'12vh'}
        height={`calc(${size} - 0px)`}
        fill={color || 'black'}
        fillOpacity="0.5"
      >
        <g
          transform="translate(0.000000, 330.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M1445 3114 c-11 -3 -47 -9 -80 -15 -33 -6 -100 -31 -150 -55 -196
-95 -342 -274 -395 -480 -27 -105 -27 -263 0 -368 63 -246 259 -450 505 -525
103 -31 293 -35 395 -8 253 67 465 280 531 534 27 105 27 260 0 364 -84 329
-391 564 -725 558 -33 -1 -70 -3 -81 -5z"
          />
          <path
            d="M2158 3053 c-16 -2 -28 -8 -28 -12 0 -4 21 -27 46 -51 133 -130 219
-310 244 -514 16 -121 8 -228 -25 -341 -43 -149 -107 -258 -213 -367 -36 -37
-63 -70 -60 -73 3 -4 46 -9 95 -12 122 -8 231 15 352 74 78 37 109 59 177 127
68 68 90 99 127 177 50 102 77 212 77 309 0 97 -27 207 -77 309 -37 78 -59
109 -127 177 -68 68 -99 90 -177 127 -134 65 -280 90 -411 70z"
          />
          <path
            d="M1255 1445 c-164 -18 -285 -40 -450 -80 -384 -94 -550 -181 -660
-345 -159 -236 -192 -709 -67 -960 l27 -55 1431 -3 1432 -2 22 37 c60 101 93
260 93 443 0 222 -48 408 -140 543 -106 156 -280 247 -646 336 -379 93 -718
121 -1042 86z"
          />
          <path
            d="M2721 1365 c82 -30 210 -97 267 -140 154 -116 252 -314 287 -580 30
-230 9 -447 -62 -631 -4 -12 33 -14 220 -14 l226 0 30 63 c116 237 101 651
-31 887 -46 81 -152 179 -245 227 -127 66 -342 133 -566 178 -140 27 -182 31
-126 10z"
          />
        </g>
      </svg>
    </div>
  );
};

export default PartnerTaxIcon;