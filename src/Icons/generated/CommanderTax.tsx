import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const CommanderTax = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      paintOrder="stroke fill markers"
      viewBox="0 0 325 325"
      height={props.size || 16}
      width={props.size || 16}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M162 168c-40.9 0-74-33.1-74-74s33.1-74 74-74 74 33.1 74 74-33.1 74-74 74zM159.9 351.8c-11.4.3-22.5.7-33.2 1.2-10.6.6-20.8 1.3-30.5 1.8-9.6.5-18.8.6-27.2.5-8.4-.6-16.1-1.6-23-3.4-6.9-2.3-12.9-5.5-18.1-9.5-5-4.7-9.1-10.4-12.2-16.9-3.1-7.1-5.2-15-6.3-23.4-1.1-8.8-1.2-17.9-.4-27.1.8-9.2 2.4-17.7 4.7-25.3 2.2-7.4 5.2-13.9 8.8-19.5 3.6-5.3 7.8-9.9 12.8-13.6 4.8-3.7 10.5-6.9 16.8-9.5 6.4-2.9 13.6-5.4 21.5-7.6 7.9-2.4 16.6-4.6 26-6.5 9.4-2.1 19.4-3.8 29.9-5 10.6-1.3 21.7-2 33-2s22.4.7 33 2c10.5 1.2 20.6 2.9 30 5 9.4 1.9 18.2 4.1 26.2 6.5 7.9 2.3 15.2 4.8 21.7 7.6 6.4 2.7 12.2 5.8 17.1 9.5 5.1 3.8 9.4 8.3 12.9 13.7 3.7 5.5 6.7 12.1 8.9 19.5 2.3 7.7 3.8 16.2 4.5 25.3.7 9.2.4 18.3-.9 27.1-1.3 8.4-3.6 16.2-6.8 23.3-3.4 6.4-7.8 11.9-13.1 16.4-5.5 3.9-11.8 6.9-19 9.1-7.3 1.6-15.4 2.6-24.1 3-8.8.1-18.3-.1-28.2-.5-10-.4-20.5-.9-31.4-1.3-10.8-.3-22-.5-33.4-.4z" />
    </svg>
  );
};
CommanderTax.propTypes = {
  title: PropTypes.string,
};
export default CommanderTax;
