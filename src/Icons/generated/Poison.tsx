import PropTypes from 'prop-types';
import { SVGProps } from 'react';
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
      width={props.size || 16}
      height={props.size || 16}
      fill="currentColor"
      overflow="visible"
      paintOrder="stroke fill markers"
      viewBox="0 0 524 524"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M261.6 32.1 228 57.2v60.5l-6.7 1.2c-16.1 2.9-39.8 10.8-54.6 18.2-9.7 4.9-27.4 17-36.5 24.9-24.3 21.3-40.6 49-46.3 79-1.6 8.3-1.6 33.5 0 42 4.3 22.8 16.3 46.9 32.3 64.6 26 28.9 60 47.5 104 56.9l7.8 1.6.2 55.8.3 55.7 34-25.2 34-25.2.5-30.8.5-30.8 10.5-2.2c27-5.6 54.2-17.8 75.5-33.8 77.9-58.4 77.4-158.4-1.2-216.5-22.5-16.7-46.6-27.2-77-33.7l-8.3-1.7V62.3c0-30.8-.4-55.3-.9-55.3s-16 11.3-34.5 25.1M228 262v89l-2.7-.6c-5.3-1.3-14.8-5.1-23.8-9.7-31-15.5-50.5-41.7-53.4-71.4-2.5-25.1 6.9-48.5 27-67.8 9.4-9 15.7-13.4 27.6-19.4 7.8-3.9 21.4-9 24.1-9.1.9 0 1.2 18.5 1.2 89m76.1-86.9c33.2 10.8 58.9 34.5 68.6 63.4 2.5 7.4 2.7 9.2 2.7 23.5 0 14.2-.3 16.2-2.8 23.5-6.7 19.6-18.7 35-37.3 47.8-7.1 4.9-25.9 14-33 16l-5.3 1.5v-88.9c0-48.9.2-88.9.3-88.9.2 0 3.3.9 6.8 2.1" />
    </svg>
  );
};
Poison.propTypes = {
  title: PropTypes.string,
};
export default Poison;
