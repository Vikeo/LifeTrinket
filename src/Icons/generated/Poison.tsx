import * as React from 'react';
import type { SVGProps } from 'react';
import PropTypes from 'prop-types';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Poison = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      paintOrder="stroke fill markers"
      viewBox="0 0 152.667 223"
      height={props.size || 16}
      width={props.size || 16}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M57.9 18.75V200.7l21.6-18.3V0M68.7 41.85C30.759 41.85 0 68.08 0 100.309c0 32.313 30.758 58.543 68.7 58.543 37.942 0 68.7-26.23 68.7-58.543 0-32.23-30.758-58.459-68.7-58.459zm.15 91.5c-21.373 0-38.7-14.531-38.7-32.474S47.477 68.4 68.85 68.4s38.7 14.532 38.7 32.475-17.327 32.475-38.7 32.475z" />
    </svg>
  );
};
Poison.propTypes = {
  title: PropTypes.string,
};
export default Poison;
