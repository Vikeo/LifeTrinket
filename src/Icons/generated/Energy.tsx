import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const Energy = ({
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
        d="M18.9 3.05c.243-.654.912-1.08 1.647-1.048l15.16.651c1.284.055 2.019 1.4 1.318 2.413L26.463 20.34l15.006 1.135c1.242.093 1.937 1.392 1.276 2.386l-16.891 25.4c-.972 1.46-3.374.586-3.046-1.11l3.55-18.305-15.494 1.758c-1.221.138-2.174-.974-1.77-2.066z"
        clipRule="evenodd"
      />
    </svg>
  );
};
Energy.propTypes = {
  title: PropTypes.string,
};
export default Energy;
