import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const ThreePlayersSide = ({
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
      <path d="M159.5 19.1c-17.6 1.8-34.7 7.2-52.2 16.4-14.4 7.5-25 15.3-36.8 27-20.3 20.4-33.6 45.2-40.7 76l-2.3 10-.3 531.5c-.2 382 0 534.3.8 541.5 2.2 20.1 7.2 36.4 16.5 54.3 7.3 14 15.2 24.6 26.7 36.1 20.1 20.1 41 31.8 70.8 39.8l10.5 2.8h497l11.7-3.2c27-7.4 47-18.5 66.9-37.1 21.5-20.2 37-48.2 43.6-79.2 1.7-8.1 1.8-30.9 1.8-548 0-518.6-.1-539.8-1.8-548-12-55.7-49.8-97.4-103.5-114.4-20.5-6.4-.6-6-262.7-6.2-130.9-.1-241.6.2-246 .7zM397 471.5V895H57V592.3l9.8-.6c17.2-1.2 31.4-6.3 40.8-15 8.8-8 16-24.7 21.9-51.2 7.6-33.9 7.6-68.2-.1-102-5.7-25.6-11.3-39-19.9-48.3-9.3-10.1-23.7-15.9-42.5-17.1l-9.5-.6v-102c0-94.2.1-102.6 1.8-110.5 9.2-43.6 38.7-77 80.4-91 17.7-5.9 15.2-5.8 141.6-5.9L397 48v423.5zM651.5 50.9c5 1.3 13.2 4.1 18.4 6.2 38.5 15.7 65.4 49.3 72.6 90.6 1.3 7.2 1.5 24.4 1.5 108.8v100.2l-8.2.8c-17.1 1.4-32.5 7.5-40.5 15.8-5.5 5.6-10.5 15-14.7 27.7-13.2 40-15.3 83.2-6 124.8 5.8 25.6 11.8 39.8 20.8 48.8 9.7 9.7 22.6 14.9 39.9 16.1l8.7.6V895H407V47.9l117.8.4 117.7.3 9 2.3zm92.5 1010c0 172.4.3 164.6-6.1 183.5-13.4 40-47.4 70-89.9 79.2-6.3 1.4-17 1.7-68.6 2.1l-61.1.4-.7-8.6c-.8-10.3-4.3-23-8.2-30-8.3-14.9-24-23.3-57.9-30.9-23.8-5.4-54.3-7.2-76-4.6-21.2 2.5-48 9.3-60.9 15.5-18.5 8.7-28.1 24.5-30.3 49.6l-.8 8.4-53 .3c-57.6.3-70.7-.4-85.4-4.3-24.3-6.6-47.8-22.5-63.5-43-7.7-10.1-16.6-27.7-19.6-38.6-5.1-18.8-5-15.5-5-181.2V904h687v156.9z" />
      <path d="M192 419.6c-18.6 4.9-33.7 19-40.1 37.4-1.7 5-2.2 8.9-2.3 16.5-.1 12.8 2.5 21.5 9.4 31.8 10.7 16 27 24.7 46.4 24.7 27.2 0 49.5-18 55.1-44.6 1.8-8.7 1.8-14.1 0-22.6-4.4-21.2-22.5-39.4-43.3-43.7-7.2-1.5-18.5-1.3-25.2.5zM581.1 421.5c-14.3 4.6-27 15.7-33.3 29.1-10.4 22.2-6.2 46.1 11.1 63.5 11.5 11.5 24.2 16.9 39.9 16.9 23.6 0 45.3-15.9 53.3-39 3.1-9.2 3.2-23.7.1-33.7-3.9-12.7-12.9-24.1-24.9-31.6-12.5-7.9-31.4-10-46.2-5.2zM388.3 1125.5c-10.8 2.3-19 7-27.6 15.6-11.4 11.4-16.7 23.9-16.7 39.7 0 23.6 15.9 45.3 39 53.3 9.2 3.1 23.7 3.2 33.7.1 12.7-3.9 24.1-12.9 31.6-24.9 7.9-12.6 10-31 5.2-46.1-8.6-27.2-37.2-43.8-65.2-37.7z" />
    </svg>
  );
};
ThreePlayersSide.propTypes = {
  title: PropTypes.string,
};
export default ThreePlayersSide;