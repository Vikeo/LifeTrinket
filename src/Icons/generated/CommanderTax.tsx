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
        d="M13.856 22.918c-2.404-1.215-2.98-4.403-1.131-6.362L24.546 4.04a2 2 0 0 1 2.908 0l11.848 12.544c1.842 1.95 1.28 5.125-1.12 6.325L37 23.5 31.5 26l8.735 3.744a4 4 0 0 1 2.279 2.606l3.782 13.615a2 2 0 0 1-1.927 2.535H7.63a2 2 0 0 1-1.927-2.535L9.486 32.35a4 4 0 0 1 2.279-2.606L20.5 26s-3.4-1.424-5.5-2.5c-.36-.185-.747-.381-1.144-.582M28 11.5c.945.199 2.14.773 2.86 1.15a.92.92 0 0 1 .466 1.054C30.769 15.824 28.899 22 26 22c-2.9 0-4.77-6.176-5.326-8.296a.92.92 0 0 1 .466-1.054c.72-.377 1.915-.951 2.86-1.15 1.529-.322 2.471-.322 4 0m9.062 23.387a1 1 0 0 1 .155-.713L38 33l2.42 10.651a1 1 0 0 1-.08.669L39 47zM16 19.5l.232.464a2 2 0 0 0 .787.836l8.48 4.91a1 1 0 0 0 1.002 0l8.48-4.91a2 2 0 0 0 .787-.836L36 19.5l-9.553 4.776a1 1 0 0 1-.894 0zm-4.34 24.82a1 1 0 0 1-.08-.669L14 33l.783 1.174a1 1 0 0 1 .155.713L13 47z"
        clipRule="evenodd"
      />
    </svg>
  );
};
CommanderTax.propTypes = {
  title: PropTypes.string,
};
export default CommanderTax;
