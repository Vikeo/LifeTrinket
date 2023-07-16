import { IconProps } from '../Types/Icon';

const CommanderTaxIcon = ({ size, color, opacity, showStroke }: IconProps) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 325 325"
        width={size || 'auto'}
        height={size || 'auto'}
        fill={color || 'black'}
        fillOpacity={opacity || '0.5'}
        stroke={showStroke ? 'white' : 'none'}
        stroke-width={showStroke ? '5' : 'none'}
        paint-order={showStroke ? 'stroke fill markers' : ''}
      >
        <title>CommanderTaxIcon</title>
        <path
          id="Lager 1"
          className="s0"
          d="m162 168c-40.9 0-74-33.1-74-74 0-40.9 33.1-74 74-74 40.9 0 74 33.1 74 74 0 40.9-33.1 74-74 74z"
        />
        <path
          id="Form 1"
          className="s0"
          d="m159.9 351.8c-11.4 0.3-22.5 0.7-33.2 1.2-10.6 0.6-20.8 1.3-30.5 1.8-9.6 0.5-18.8 0.6-27.2 0.5-8.4-0.6-16.1-1.6-23-3.4-6.9-2.3-12.9-5.5-18.1-9.5-5-4.7-9.1-10.4-12.2-16.9-3.1-7.1-5.2-15-6.3-23.4-1.1-8.8-1.2-17.9-0.4-27.1 0.8-9.2 2.4-17.7 4.7-25.3 2.2-7.4 5.2-13.9 8.8-19.5 3.6-5.3 7.8-9.9 12.8-13.6 4.8-3.7 10.5-6.9 16.8-9.5 6.4-2.9 13.6-5.4 21.5-7.6 7.9-2.4 16.6-4.6 26-6.5 9.4-2.1 19.4-3.8 29.9-5 10.6-1.3 21.7-2 33-2 11.3 0 22.4 0.7 33 2 10.5 1.2 20.6 2.9 30 5 9.4 1.9 18.2 4.1 26.2 6.5 7.9 2.3 15.2 4.8 21.7 7.6 6.4 2.7 12.2 5.8 17.1 9.5 5.1 3.8 9.4 8.3 12.9 13.7 3.7 5.5 6.7 12.1 8.9 19.5 2.3 7.7 3.8 16.2 4.5 25.3 0.7 9.2 0.4 18.3-0.9 27.1-1.3 8.4-3.6 16.2-6.8 23.3-3.4 6.4-7.8 11.9-13.1 16.4-5.5 3.9-11.8 6.9-19 9.1-7.3 1.6-15.4 2.6-24.1 3-8.8 0.1-18.3-0.1-28.2-0.5-10-0.4-20.5-0.9-31.4-1.3-10.8-0.3-22-0.5-33.4-0.4z"
        />
      </svg>
    </div>
  );
};

export default CommanderTaxIcon;
