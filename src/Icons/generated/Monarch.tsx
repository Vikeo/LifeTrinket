import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Monarch = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      fill="none"
      viewBox="0 0 52 52"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M46.163 38.82s-8.614 2.73-14.234 3.106c-2.508.167-3.918 0-6.429 0-2.51 0-3.921.167-6.429 0-5.62-.376-14.234-3.107-14.234-3.107s.637-3.944.459-6.471C5.053 28.888 3 24.038 3 24.038s2.897 2.25 4.592 1.294C9.78 24.098 10.5 20 10.5 20s3.006 6.024 7 5.332c2.386-.414 3.327-1.974 4.5-4.016.97-1.69 1.27-4.827 1.27-4.827l1.77-4.827L25.5 10l.46 1.662 1.77 4.827s.3 3.136 1.27 4.827c1.173 2.042 2.388 3.353 4.5 4.016 4.051 1.273 7-5.332 7-5.332s.72 4.098 2.908 5.332c1.695.956 4.592-1.294 4.592-1.294s-2.053 4.85-2.296 8.31c-.178 2.527.46 6.471.46 6.471"
      />
    </svg>
  );
};
Monarch.propTypes = {
  title: PropTypes.string,
};
export default Monarch;
