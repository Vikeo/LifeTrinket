import * as React from 'react';
import type { SVGProps } from 'react';
import PropTypes from 'prop-types';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const TwoPlayersOppositeLandscape = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 802 1374"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M159.5 19.1c-17.6 1.8-34.7 7.2-52.2 16.4-14.4 7.5-25 15.3-36.8 27-20.3 20.4-33.6 45.2-40.7 76l-2.3 10-.3 531.5c-.2 382 0 534.3.8 541.5 2.2 20.1 7.2 36.4 16.5 54.3 7.3 14 15.2 24.6 26.7 36.1 20.1 20.1 41 31.8 70.8 39.8l10.5 2.8h497l11.7-3.2c27-7.4 47-18.5 66.9-37.1 21.5-20.2 37-48.2 43.6-79.2 1.7-8.1 1.8-30.9 1.8-548 0-518.6-.1-539.8-1.8-548-12-55.7-49.8-97.4-103.5-114.4-20.5-6.4-.6-6-262.7-6.2-130.9-.1-241.6.2-246 .7zM396 687v639H285.3c-63.3 0-115-.5-120.7-1-32.5-3.2-63-20.2-83-46.5-7.7-10.1-16.6-27.7-19.6-38.6-5.1-19-5-11.7-5-230.5V805.3l11.3-.6c18.4-1 32.5-6 42.3-15C125.7 776 138.1 730 138.1 688c0-23.9-3.5-47.1-10.7-71-9.4-31.3-25.9-44.2-58.7-45.7l-11.7-.6.3-209.6.3-209.6 2.1-9c2.9-11.9 5.2-18.4 10.3-28.6C83.9 86 109.2 64.3 139.7 54c17.7-5.9 15.3-5.8 141.1-5.9L396 48v639zM651.5 50.9c5 1.3 13.2 4.1 18.4 6.2 38.5 15.7 65.4 49.3 72.6 90.6 1.3 7.4 1.5 36.5 1.5 214.8v206.2l-11.7.6c-14 .7-24.9 3.3-34.2 8.2-12.2 6.4-19 15.9-25.5 35.5-13.2 40-15.3 83.2-6 124.8 5.8 25.6 11.8 39.8 20.8 48.8 10.7 10.7 23.1 15.2 43.9 16.1l12.7.6v207.2c0 227.9.3 214.7-6.1 233.9-13.7 41-49.7 71.9-92.9 79.7-6.1 1.1-29.8 1.4-123.5 1.4h-116l-.3-638.8-.2-638.8 118.7.4 118.8.3 9 2.3z" />
      <path d="M195 632.6c-18.6 4.9-33.7 19-40.1 37.4-1.7 5-2.2 8.9-2.3 16.5-.1 12.8 2.5 21.5 9.4 31.8 10.7 16 27 24.7 46.4 24.7 27.2 0 49.5-18 55.1-44.6 1.8-8.7 1.8-14.1 0-22.6-4.4-21.2-22.5-39.4-43.3-43.7-7.2-1.5-18.5-1.3-25.2.5zM573.1 633.5c-14.3 4.6-27 15.7-33.3 29.1-10.4 22.2-6.2 46.1 11.1 63.5 11.5 11.5 24.2 16.9 39.9 16.9 23.6 0 45.3-15.9 53.3-39 3.1-9.2 3.2-23.7.1-33.7-3.9-12.7-12.9-24.1-24.9-31.6-12.5-7.9-31.4-10-46.2-5.2z" />
    </svg>
  );
};
TwoPlayersOppositeLandscape.propTypes = {
  title: PropTypes.string,
};
export default TwoPlayersOppositeLandscape;
