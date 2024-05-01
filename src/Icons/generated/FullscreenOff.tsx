import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const FullscreenOff = ({
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
        <path d="M29.3 20c-1.3.5-3.2 2.4-4.3 4.2-2 3.2-2 5-2 85.6V192l3.4 3.7c3.2 3.5 3.6 3.7 10 3.7 6.2 0 6.9-.3 9.9-3.2l3.2-3.2.2-69.8c.2-52.4.6-70.3 1.5-72 2.8-5.3 1.4-5.2 75.9-5.2h69.1l3.4-3.4c3.2-3.2 3.4-3.8 3.4-10.4 0-6.8-.1-7.1-3.5-10.1l-3.6-3.1-82.2.1c-46.4 0-83.2.4-84.4.9M323.7 22.1c-5.5 4.2-5.8 16-.6 21.1l2.7 2.8h67.9c43.4 0 69.1.4 71.5 1 2 .6 4.6 2.2 5.8 3.7 2 2.5 2 3.6 2 71.5 0 75.9-.2 73.1 6.2 76.4 4.9 2.5 14.1 1.5 17.6-1.9l2.7-2.7.3-83.5.2-83.4-3.1-3.5-3.1-3.6H410c-82.9 0-83.8 0-86.3 2.1M26.5 320.9c-1.1.5-2.9 1.9-4 3.1-2 2.2-2 3.8-2.3 85.6l-.2 83.3 3.1 3.5 3.1 3.6H110c82.9 0 83.8 0 86.3-2.1 5.5-4.2 5.8-16 .6-21.1l-2.7-2.8h-67.9c-43.4 0-69.1-.4-71.5-1-2-.6-4.6-2.2-5.8-3.7-2-2.5-2-3.6-2-71.5 0-75.6.2-73.1-6-76.3-3.1-1.6-11.2-1.9-14.5-.6M477.2 323.4l-3.7 3.4-.5 71.1c-.6 79.2 0 73.4-7.6 75.1-2.1.5-34.3 1-71.5 1h-67.7l-3.1 3.5c-2.7 3.1-3.1 4.3-3.1 9.5s.4 6.4 3.1 9.5l3.1 3.5h168l2.9-2.9 2.9-2.9V326.8l-3.4-3.4c-3.1-3.1-3.9-3.4-9.5-3.4s-6.5.3-9.9 3.4" />
      </g>
    </svg>
  );
};
FullscreenOff.propTypes = {
  title: PropTypes.string,
};
export default FullscreenOff;
