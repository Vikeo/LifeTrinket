import { IconProps } from '../Types/Icon';

const PoisonIcon = ({ color, size, opacity, showStroke }: IconProps) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 152.667 223"
        width={size}
        height={size}
        fill={color || 'black'}
        fillOpacity={opacity || '0.5'}
        stroke={showStroke ? 'white' : 'none'}
        stroke-width={showStroke ? '7' : 'none'}
        paint-order={showStroke ? 'stroke fill markers' : ''}
      >
        <g transform="translate(0.000000,0.000000) scale(0.900000,0.900000)">
          <path d="M64.333 20.833V223l24-20.333V0M76.334 46.5C34.176 46.5 0 75.644 0 111.454c0 35.904 34.176 65.048 76.334 65.048 42.157 0 76.333-29.144 76.333-65.048 0-35.81-34.176-64.954-76.333-64.954zm.166 101.667c-23.748 0-43-16.146-43-36.083S52.752 76 76.5 76s43 16.147 43 36.083-19.252 36.084-43 36.084z" />
        </g>
      </svg>
    </div>
  );
};

export default PoisonIcon;
