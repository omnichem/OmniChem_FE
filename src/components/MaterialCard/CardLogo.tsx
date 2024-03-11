import React from 'react'

interface LogoStyleProps {
  width: number;
  height: number;
}

export const CardLogo: React.FC<LogoStyleProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height} version="1.0" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 920.000000 768.000000"
      preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,768.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
        <path d="M1307 6939 c-131 -32 -228 -89 -333 -194 -78 -78 -99 -106 -137 -186
-81 -168 -77 -72 -77 -1639 0 -1567 -5 -1471 77 -1640 39 -80 59 -108 137
-186 78 -78 106 -98 186 -137 93 -45 212 -77 285 -77 l35 0 0 -395 c0 -457 4
-494 77 -645 39 -82 58 -108 137 -186 73 -73 108 -99 176 -133 134 -66 170
-73 399 -80 l204 -6 22 -65 c47 -140 122 -258 234 -371 118 -119 244 -192 420
-246 78 -24 101 -27 251 -27 150 0 173 3 251 27 176 54 302 127 420 246 112
112 175 212 230 361 l27 75 632 0 632 0 23 -67 c30 -89 95 -208 156 -285 357
-448 1015 -487 1420 -84 114 113 222 295 245 411 l7 30 179 0 c215 0 283 13
418 77 81 39 107 59 185 137 97 98 143 172 186 301 l24 70 3 820 c3 910 3 909
-62 1050 -18 38 -262 414 -543 835 -580 869 -575 863 -756 956 -139 71 -168
74 -754 74 l-521 0 -4 308 c-4 276 -7 314 -25 374 -62 198 -195 354 -379 444
-162 79 -16 74 -2127 73 -1824 0 -1884 -1 -1960 -20z m3878 -486 c47 -25 85
-64 111 -113 18 -34 19 -88 19 -1420 0 -1332 -1 -1386 -19 -1420 -26 -49 -64
-88 -111 -113 l-40 -22 -1865 0 c-1801 0 -1866 1 -1900 19 -49 26 -88 64 -113
111 l-22 40 0 1385 c0 1332 1 1386 19 1420 35 66 87 110 156 131 14 4 858 7
1875 6 l1850 -2 40 -22z m1680 -1200 c22 -11 52 -34 66 -50 54 -58 1008 -1502
1019 -1542 7 -27 10 -279 8 -803 -3 -760 -3 -763 -25 -803 -25 -47 -64 -85
-113 -111 -30 -16 -58 -19 -204 -19 l-168 0 -27 75 c-57 155 -137 277 -252
384 -178 165 -408 256 -649 256 -114 0 -196 -14 -313 -54 -273 -93 -494 -315
-591 -592 l-24 -69 -632 0 -632 0 -23 67 c-89 264 -310 493 -567 587 -124 46
-179 55 -333 56 -115 0 -167 -4 -225 -19 -157 -40 -310 -122 -429 -231 -110
-100 -230 -290 -262 -414 l-13 -53 -171 4 c-186 3 -218 12 -276 75 -65 69 -64
60 -67 491 l-3 392 1601 0 c1800 0 1667 -6 1840 77 81 39 108 59 186 137 73
74 99 107 132 176 85 173 82 127 82 1127 l0 884 513 -3 c503 -3 513 -3 552
-25z m-3362 -3108 c91 -19 160 -58 233 -130 275 -272 126 -735 -259 -806 -254
-47 -508 140 -549 403 -36 236 119 469 351 530 82 21 136 22 224 3z m3102 4
c201 -37 356 -198 387 -401 39 -254 -140 -496 -399 -540 -310 -52 -593 229
-545 540 18 109 58 190 136 268 116 115 264 162 421 133z"/>
        <path d="M6208 5030 c-72 -22 -137 -88 -158 -161 -6 -21 -10 -331 -10 -799 l0
-766 25 -51 c15 -28 42 -63 60 -78 76 -57 59 -56 648 -53 599 3 565 0 635 69
65 64 67 72 70 314 2 121 1 240 -3 263 -5 36 -78 151 -386 614 -209 314 -392
582 -407 596 -58 54 -92 62 -277 61 -93 0 -182 -4 -197 -9z m671 -771 l361
-542 0 -178 0 -179 -480 0 -480 0 0 720 0 720 119 0 120 0 360 -541z"/>
      </g>
    </svg>
  )
}