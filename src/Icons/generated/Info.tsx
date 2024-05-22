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
      fill="currentColor"
      viewBox="0 0 52 52"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        d="M26 48c12.15 0 22-9.85 22-22S38.15 4 26 4 4 13.85 4 26s9.85 22 22 22m0 4c14.36 0 26-11.64 26-26S40.36 0 26 0 0 11.64 0 26s11.64 26 26 26m-4.191-36.87-.264.172c-2.513 1.644-2.671 5.27-.31 7.125a2 2 0 1 1-2.47 3.146c-4.514-3.547-4.213-10.477.591-13.619l.264-.172a11.66 11.66 0 0 1 12.76 0l.77.503c4.556 2.98 4.841 9.551.561 12.914-.422.332-.877.62-1.357.86l-.54.27A6.9 6.9 0 0 0 28 32.5a2 2 0 1 1-4 0 10.9 10.9 0 0 1 6.025-9.748l.54-.27q.36-.18.675-.428c2.128-1.672 1.986-4.94-.28-6.421l-.769-.503a7.66 7.66 0 0 0-8.382 0M26 42a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
        clipRule="evenodd"
      />
    </svg>
  );
};
Info.propTypes = {
  title: PropTypes.string,
};
export default Info;
