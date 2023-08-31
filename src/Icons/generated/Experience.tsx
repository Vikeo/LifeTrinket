import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Experience = ({
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
        <path d="M24.2 73.7c14 18.5 27.2 42.3 30.4 55.3 2.8 11.1 1.5 23.8-6.1 58.5-15 69-16.8 93.2-7.9 111.3 8.7 17.8 45 48.1 121.5 101.4 23.5 16.4 84.8 56.8 86.2 56.8.4 0 .6-64.2.5-142.6l-.3-142.6-7-2.2c-25.3-8-38.8-24.2-41.1-49-.8-8.6 1.4-20.7 5.2-29.4 1.3-3 2.1-5.9 1.7-6.3-.5-.4-9-4.6-19-9.3L170.1 67h-151l5.1 6.7zM334.3 76c-10.1 4.9-18.3 9.1-18.3 9.3 0 .3 1.1 2.9 2.4 5.8 3.7 8.5 5.1 15.7 5 25.9-.1 16.1-4.7 27.6-15 37.7-6.9 6.8-18.7 13.3-28.1 15.4l-5.3 1.2v142.9c0 78.5.3 142.8.8 142.8.4 0 11.8-7.3 25.4-16.3C409.9 369.3 469 323.6 482.5 300.6c9.9-16.9 8.4-41.8-6.6-111.1-8.5-39-9.6-50.6-5.9-62.6 4.3-14.5 13.5-31.3 27-49.5 3.9-5.2 7-9.6 7-9.9 0-.3-34.1-.5-75.7-.4l-75.8.1-18.2 8.8z" />
      </g>
    </svg>
  );
};
Experience.propTypes = {
  title: PropTypes.string,
};
export default Experience;
