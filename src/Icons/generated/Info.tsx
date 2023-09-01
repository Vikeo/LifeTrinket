import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Info = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 524 524"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g fill="currentColor">
        <path d="M236.7 33.5c-28.8 3.6-51.4 10.2-75.4 22C92.7 89.2 46.2 152.7 34.4 229c-2.5 16-2.5 50 0 66C46 370 91.6 433.3 158.5 467.2c32.9 16.7 65.2 24.3 103.5 24.3 22.1 0 34.2-1.4 54.5-6.2 31.1-7.3 65.4-24.3 90.8-45.2 9.1-7.4 27-25.5 34.3-34.6 25-31.3 41.8-70.1 48-111 2.5-16.4 2.5-48.3 0-65-11.4-76.2-58.6-140.8-126.9-174-23.2-11.2-42.1-17.1-67.7-21-14.5-2.2-44.7-2.8-58.3-1zM294 78.9c74.6 13.2 133.6 70.2 149.6 144.4 8.6 40.3 3.5 82-14.6 119.3C390.5 422 302.6 463 216.5 441.9c-88.7-21.8-148.8-107.6-139.4-199 7.3-71.5 56.7-133.8 124.4-156.8 12.2-4.1 27.1-7.4 40.5-9.1 11.8-1.4 38.8-.4 52 1.9z" />
        <path d="M246.5 112c-20.8 2-36.2 8.6-48.5 21.1-11.5 11.6-19.3 26.4-27.5 52-3.4 10.6-3.6 11.9-2.4 14.4 2 4.1 5.8 6.5 11.4 7.1 7.4.9 9.2-1 17.8-19 14.9-30.8 25.7-41.9 46-47.3 8.4-2.3 29.8-2.2 38.6.1 21.2 5.5 34.6 19.5 35.9 37.6.8 11.1-2.3 16.4-20.5 35.2-26 26.8-38 45.6-44.2 69.2-3 11.3-4.6 31.6-3.6 46 .7 11.3.9 12.1 3.5 14.8 2.6 2.5 3.5 2.8 9.5 2.8 5.7 0 6.9-.3 9-2.5 1.4-1.3 2.5-3.2 2.6-4.2.1-1 .2-9.9.3-19.8.2-20.3 1.6-28.1 7.1-40.2 7.6-16.6 23.7-36 42.5-51.3 22.4-18.2 28.1-27.9 28-47.8-.1-19.8-6.1-35.4-17.9-46.5-8.6-8.1-14.8-11.8-26.6-15.7-16.5-5.4-41.3-7.8-61-6zM252.4 372.9c-4.2 1.8-5.4 5-5.4 13.9 0 4.6.5 9.2 1 10.3 1.8 3.3 6.4 4.9 14 4.9 12.6 0 15.5-3.3 14.9-16.9-.6-11.3-1.9-12.5-13.7-12.8-4.8-.2-9.7.1-10.8.6z" />
      </g>
    </svg>
  );
};
Info.propTypes = {
  title: PropTypes.string,
};
export default Info;