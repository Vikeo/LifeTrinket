import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Logo = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 524 524"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M0-196.791c108.629 0 196.791 88.162 196.791 196.791 0 108.629-88.162 196.791-196.791 196.791-108.629 0-196.791-88.162-196.791-196.791 0-108.629 88.162-196.791 196.791-196.791z"
        style={{
          stroke: '#590713',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fdffd2',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.10991 0 0 1.10991 262 262)"
      />
      <path
        strokeLinecap="round"
        d="M-17.706-50.704s-4.378 12.973.446 25.583c2.124 5.55 12.255 17.109 17.107 36.364 4.852 19.255 19.679 39.46 19.679 39.46"
        style={{
          stroke: '#000',
          strokeWidth: 4,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="rotate(1 -17129.538 10072.475) scale(2.11279)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M50.163 56.172S31.68 34 24.46 3.6C17.239-26.8 13.467-35.306 2.42-47.373c-11.046-12.066-26.224-12.189-25.26 2.534.966 14.722 12.84 12.598 14.365 1.93 1.526-10.667-21.8-10.696-32.304 1.854C-53.573-25.77-49.57-2.79-49.57-2.79"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 246.77 350.593)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-61.541-71.832s39.965 62.644 41.684 89.093c1.718 26.45 7.326 33.328 17.516 44.667 10.19 11.339 36.055 16.684 32.478-4.845-3.578-21.53-29.514-8.071-16.735 4.07 12.779 12.143 30.514 9.462 39.88-2.368 6.188-7.814 9.732-26.682 7.67-41.524-1.059-7.627-14.72-28.434-14.72-28.434"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 265.204 178.318)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-26.889-69.574S-9.544-51.826-3.454-23.78c6.09 28.046 24.518 40.828 27.8 61.071 3.284 20.244 3.494 23.63 0 32.283"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 359.29 252.477)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M30.481-85.77S31.897-63.74-.082-1.032C-32.06 61.673-30.478 85.769-30.478 85.769"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 138.597 192.722)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-30.017 97.228S-.607 52.493 6.833 6.645c7.44-45.849 23.184-103.873 23.184-103.873"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 395.16 294.413)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-24.23-79.242s-7.454 19.782-.69 39.5c2.979 8.68 17.988 27.06 24.437 57.033 6.45 29.973 28.24 61.951 28.24 61.951"
        style={{
          stroke: '#000',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="rotate(-1.005 17359.092 -9769.972) scale(1.36839)"
      />
      <path
        strokeLinecap="round"
        d="M-45.63-48.464C-71.24-37.592-84.397-27.166-91.043-20.02c-4.07 4.376-3.966 4.338-5.24 6.898a4.617 4.617 0 0 0 .396 4.766c.894 1.234.96 1.326 2.899 3.595C-83.146 6.756-56.46 32.52-4.814 47.45c44.828 12.96 74.528 12.437 89.557 10.58 2.68-.332 2.726-.3 4.041-.593a10.178 10.178 0 0 0 7.957-9.425c.047-.93.022-1.057-.024-2.821-.34-12.824-3.372-35.645-18.26-58.984-22.56-35.37-46.732-40.492-46.732-40.492S.657-68.114-45.63-48.464z"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#7f9172',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 310.196 90.265)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-75.76-23.868S-46.62-.584-7.64 13.972c38.981 14.555 83.4 8.755 83.4 8.755"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 328.467 67.617)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-47.435-13.554S-25.095 2.054-4.157 8.458c20.938 6.405 51.592 4.955 51.592 4.955"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 338.115 33.635)"
      />
      <path
        strokeLinecap="round"
        d="M-90.654-77.091S-74.41-28.509-9.055-2.309C56.299 23.89 100.897 9.078 100.897 9.078S61.451 101.65-37.09 70.793C-135.63 39.936-90.654-77.09-90.654-77.09z"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#7f9172',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 220.14 408.996)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-88.09-33.272S-62.125 3.672-9.471 22.15c52.655 18.478 97.561 8.354 97.561 8.354"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 201.931 429.575)"
      />
      <path
        fill="none"
        strokeLinecap="round"
        d="M-57.603-25.15S-30.843-.785-4.996 9.534C20.852 19.854 57.603 25.15 57.603 25.15"
        style={{
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeDashoffset: 0,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          fill: '#fff',
          fillOpacity: 0,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(1.36839 0 0 1.36839 172.308 476.298)"
      />
    </svg>
  );
};
Logo.propTypes = {
  title: PropTypes.string,
};
export default Logo;
