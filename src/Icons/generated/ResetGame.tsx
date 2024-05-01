import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const ResetGame = ({
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
        d="M129.3 50.7C105.7 81.6 95 95.8 82.6 113c-14.3 19.7-16.7 25.2-14.6 33.2 2.5 9.4 9 14.2 21.3 15.8 8.2 1.1 116.4 3.7 117.2 2.8.3-.3-3.3-8.8-8-18.8s-8.8-19.3-9.1-20.5c-.5-2.1-.1-2.3 8.3-3.4 4.9-.6 20.3-1.6 34.2-2.2 65.4-2.7 102.7 6.4 133.2 32.4 31.4 26.8 48.8 75.9 44.9 126.8-6.7 87.6-61.2 133.4-155.3 130.6-45.4-1.3-78.1-13.8-103.7-39.6-23.5-23.8-39-60.5-41.9-99.4-.9-12-2-15.4-6.7-20-5.2-5.2-7.9-5.7-29.3-5.6-24 .1-27.9 1.2-32.1 9.5-1.6 3-2 5.9-2 13.9 0 35.9 12.4 76.8 32.8 108 34.1 52.5 88.1 87.3 152.2 98.2 16.3 2.8 57.2 2.5 73.5-.5 46.1-8.4 84.5-28.3 116.4-60.3 42.5-42.7 65-104 60.3-164.1-4.2-52.8-25-98.7-61.2-134.8-38.8-38.8-87.2-59.7-145-62.6-24.6-1.2-73.1 2.8-99.1 8.2-2.5.5-2.9-.2-10.9-17.1-4.6-9.6-8.7-17.5-9.1-17.5-.3 0-9.1 11.1-19.6 24.7"
      />
    </svg>
  );
};
ResetGame.propTypes = {
  title: PropTypes.string,
};
export default ResetGame;
