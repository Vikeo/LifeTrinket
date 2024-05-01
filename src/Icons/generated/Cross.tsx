import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Cross = ({
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
      <path
        fill="currentColor"
        d="M85.8 34.4c-5.3 1.9-9.2 5.3-30 26.3C35.9 80.8 33 84.8 33 93c0 2.5.9 6.4 1.9 8.6 1.2 2.7 27.7 32.1 74.5 82.7 39.9 43.3 72.6 79.1 72.6 79.7s-32.3 35.2-71.7 77c-48.5 51.3-72.7 77.7-74.6 81.1-3.4 6.4-3.5 11.7-.3 18.4 3.3 6.8 42 45.5 48.6 48.4 6.4 2.9 12.7 2.7 18.8-.7 3.3-1.7 31.6-27.6 81.3-74.5 42-39.4 76.7-71.6 77.1-71.5.4.2 35.5 32.5 77.9 71.8s79.2 72.7 81.8 74.2c3.2 1.9 6 2.8 9.1 2.8 10.1 0 10.9-.6 34.9-24.3 14.2-14.1 23-23.7 24.2-26.2 2.4-5.1 2.4-12.8 0-18.1-1.2-2.6-27.1-30.8-74.5-81.2-40-42.5-72.6-77.6-72.4-78.1.2-.4 32.5-34.7 71.8-76.1s72.5-76.7 73.8-78.4c4.5-6.3 4.4-17.9-.1-24.2-5.1-7.2-43.3-46.7-46.9-48.5-2.1-1.1-5.8-2.2-8.2-2.5-9.6-1.4-5.3-5.2-158.3 138.2L262.2 183l-78.4-73.1c-49.6-46.5-79.8-73.9-82.3-75-4.7-2.2-10.5-2.3-15.7-.5"
      />
    </svg>
  );
};
Cross.propTypes = {
  title: PropTypes.string,
};
export default Cross;
