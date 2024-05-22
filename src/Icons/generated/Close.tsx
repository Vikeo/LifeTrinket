import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Close = ({
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
        d="M26 48c12.15 0 22-9.85 22-22S38.15 4 26 4 4 13.85 4 26s9.85 22 22 22m0 4c14.36 0 26-11.64 26-26S40.36 0 26 0 0 11.64 0 26s11.64 26 26 26"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M15.586 15.586a2 2 0 0 1 2.828 0l18 18a2 2 0 1 1-2.828 2.828l-18-18a2 2 0 0 1 0-2.828"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M36.414 15.586a2 2 0 0 1 0 2.828l-18 18a2 2 0 1 1-2.828-2.828l18-18a2 2 0 0 1 2.828 0"
        clipRule="evenodd"
      />
    </svg>
  );
};
Close.propTypes = {
  title: PropTypes.string,
};
export default Close;
