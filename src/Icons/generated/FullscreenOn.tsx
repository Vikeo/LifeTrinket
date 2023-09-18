import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const FullscreenOn = ({
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
        <path d="M185.3 20c-1.8.4-4 1.4-4.9 2.1-4.3 3.6-4.4 4.5-4.4 76.3v68.5l-2.4 2.8-2.4 2.8-71.2.5-71.2.5-2.9 3.3c-2.6 2.9-2.9 4-2.9 9.7 0 5.7.3 6.8 2.9 9.7l2.9 3.3h168.4l2.9-3.3 2.9-3.2v-83.3c0-89.3.2-86-4.8-88.6-2.7-1.4-9.4-2-12.9-1.1zM328 20c-1.9.5-4.5 2-5.7 3.5l-2.3 2.6v167.1l3.4 3.4 3.4 3.4 83.7-.2 83.7-.3 3-3.4c2.8-3.2 3-3.7 2.6-10.2-.3-5.9-.8-7.3-3.1-9.7l-2.7-2.7-70.9-.5-70.9-.5-2.6-2.4-2.5-2.4-.3-70.1c-.3-64.9-.4-70.4-2-72.9-1-1.4-2.6-3-3.5-3.5-2.9-1.5-9.5-2.1-13.3-1.2zM26.4 321c-1.2.4-3.1 2.1-4.4 3.7-1.9 2.4-2.1 3.7-1.8 9.6.3 5.7.8 7.1 3.1 9.5l2.7 2.7 70.9.5 70.9.5 2.6 2.4 2.6 2.4v67.6c0 37.2.5 69.4 1 71.5.5 2.1 1.7 4.8 2.8 5.8 4.6 4.7 16.7 4.2 21-.7l2.2-2.6V326.8l-3.4-3.4-3.4-3.4-82.3.1c-45.3 0-83.4.4-84.5.9zM326.3 321c-1.3.5-3.2 2.4-4.3 4.2-2 3.2-2 5-2 85.6V493l3.4 3.7c3.2 3.5 3.6 3.7 10 3.7 6.2 0 6.9-.3 9.9-3.2l3.2-3.2.2-69.8c.2-52.4.6-70.3 1.5-72 2.8-5.3 1.4-5.2 75.9-5.2h69.1l3.4-3.4c3.2-3.2 3.4-3.8 3.4-10.4 0-6.8-.1-7.1-3.5-10.1l-3.6-3.1-82.2.1c-46.4 0-83.2.4-84.4.9z" />
      </g>
    </svg>
  );
};
FullscreenOn.propTypes = {
  title: PropTypes.string,
};
export default FullscreenOn;
