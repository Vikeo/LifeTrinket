import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Skull = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g fill="currentColor">
        <path d="M237.2 37.1c-30.6 2.9-64.8 15-89.4 31.6-12.2 8.2-31.7 23.4-38.3 30-15.2 14.9-24.6 33.8-27.5 55.1-4.5 32.9 10.8 64.5 38.7 79.8 16.3 8.9 22.3 12.7 28.1 18 15 13.5 23.5 31.4 24.9 52.3.8 11.5 3.2 17.9 8.9 23.1 8.6 7.9 4.4 7.5 73.4 7.5 60.6 0 61.6 0 66-2.1 10-4.8 14.7-12.3 16-25.7 1.3-12.5 1.8-15.2 4.2-22.7 3.9-12.1 11.9-24.4 21.2-32.7 5.5-4.9 8.1-6.5 25.3-16 16.4-9.1 26.1-19.1 33.9-34.8 5.6-11.4 7.4-18.5 8.1-30.8 1.5-26.6-9.6-54.2-29.4-72.7-8.8-8.3-27.3-22.7-38.3-29.8-35.8-23.3-82.1-34.3-125.8-30.1m-46 72c15 3.2 26.2 13.8 28.7 27.3 1.7 9.2-2.6 18.2-14 29.7-14.1 14.1-28.2 21.9-40.9 22.6-6.6.4-7.9.2-11-1.9-7.5-5-10.9-17.2-11-39 0-14.7 1.9-20.6 8.9-27.6 10.1-10 24.7-14.2 39.3-11.1m145 0c11.6 2.5 22.7 10.8 26.9 20.2 2.2 4.8 2.4 6.4 2.3 20.7-.1 22.2-3.1 32.2-11 37.1-2.9 1.8-4.6 2.1-10.8 1.7-6.2-.3-8.6-1-15.9-4.6-15.2-7.5-30.9-21.8-36.5-33.2-11.3-23.1 15.6-48.1 45-41.9m-73.5 102.8c4.7 3.4 11.8 13.7 13.3 19.3 2 7.3-2 13.6-11.5 17.9-12.1 5.6-29.5-2.7-29.5-14.1 0-6.8 7.2-19 13.9-23.6 4.8-3.2 8.9-3.1 13.8.5" />
        <path d="M56.8 304.7c-1.4 1-3.6 3.1-4.9 4.6-5.1 6.6-8.2 25.8-4.7 29.3 2.9 2.9 19.8 7.1 67.8 16.9 36.1 7.4 79 17.5 79 18.7 0 .4-.6.8-1.4.8-2.3 0-73.5 23.6-95.6 31.7-20.8 7.6-40.7 16.4-44.8 19.9-1.6 1.3-2.7 4.1-3.8 9.4-2.9 14.3.2 20.8 12.5 25.5 6.3 2.4 7.3 2.5 11.7 1.4 6.2-1.6 18.9-6.3 48.4-18.2 56.7-22.9 114.7-42.6 140.7-47.7l5.8-1.2 24.5 8.5c13.5 4.7 45.2 16 70.5 25.2 78.6 28.6 95.9 34 101.1 31.6 3.2-1.4 5.4-6.7 5.4-12.8 0-9.6-3.3-16.3-10.8-22-4.8-3.6-8.7-4.9-27.7-8.8-7.1-1.5-15.9-3.8-19.5-5.2-3.6-1.3-17.1-6.5-30-11.5-12.9-4.9-30.4-11.4-38.8-14.4-8.4-2.9-15.8-5.7-16.4-6-.6-.4 4.2-2.2 10.8-4.1 11.6-3.3 27-7.7 58.3-16.9 17.6-5.2 48.9-16.6 54.1-19.6 8.8-5.2 14.8-13.3 17.4-23.3 1.3-5.3 1.4-6.2.1-8.2-2-3-5.3-3.7-13.4-2.9-19.7 1.8-89.3 19.4-175.4 44l-29.8 8.6-18.2-5.1c-20.2-5.6-63.5-18.8-91.2-27.9-18.1-5.9-52.3-16.5-62.5-19.4-9.6-2.7-16.1-3-19.2-.9" />
      </g>
    </svg>
  );
};
Skull.propTypes = {
  title: PropTypes.string,
};
export default Skull;
