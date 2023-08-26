import PropTypes from "prop-types";
import { SVGProps } from "react";
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
      fill="currentColor"
      paintOrder="stroke fill markers"
      viewBox="-50 0 980 980"
      height={props.size || 16}
      width={props.size || 16}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M.698 153.992c86.595.1 173.239-.645 259.784.347 24.182 12.066 46.426 28.153 67.579 45.035-10.527 37.24-7.697 79.595 14.45 112.266 15.69 24.727 42.85 40.715 71.5 45.283l.05 447.523c-98.065-53.774-193.598-113.705-277.76-187.788-28.848-25.62-56.952-56.457-63.804-95.781-8.193-46.773 11.42-92.156 12.91-138.632.646-36.097-.1-73.387-14.698-107.051-13.704-36.445-42.104-64.102-63.058-96.179C2.238 171.767.898 162.83.699 153.991zm562.022 45.133c21.45-16.484 43.695-32.67 67.876-44.787 86.497-.992 173.041-.247 259.587-.347-.647 7.397-.447 15.293-5.015 21.599-19.415 31.728-47.27 58.093-62.067 92.751-17.527 36.097-18.719 77.16-17.576 116.537 2.233 45.332 20.408 89.623 13.009 135.305-6.852 39.72-35.204 70.754-64.251 96.624-84.807 74.926-181.532 134.858-280.342 189.376-.05-149.703-.05-299.407-.05-449.11 32.175-3.924 62.463-22.84 78.154-51.441 18.868-31.876 20.458-71.4 10.675-106.506z" />
    </svg>
  );
};
Experience.propTypes = {
  title: PropTypes.string,
};
export default Experience;
