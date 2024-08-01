import PropTypes from 'prop-types';
import { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  size?: string;
}
const NameTag = ({
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
        fillRule="evenodd"
        d="M33.228 2H48a2 2 0 0 1 2 2v14.772a2 2 0 0 1-.586 1.414L21.721 47.879a3 3 0 0 1-4.242 0L4.12 34.52a3 3 0 0 1 0-4.242L31.814 2.586A2 2 0 0 1 33.228 2m14.105 6a3.333 3.333 0 1 1-6.666 0 3.333 3.333 0 0 1 6.666 0m-16.6 6.644 6.171 6.17 3.773-3.772-.663-.663-3.025 3.026-2.097-2.098 2.784-2.784-.663-.663-2.784 2.785-2.085-2.086 2.977-2.977-.663-.663zm-7.549 7.549.892-.892 7.22 3.025.072-.072-3.025-7.22.892-.892 6.171 6.171-.699.7-4.689-4.69-.06.06 2.76 6.618-.675.675-6.617-2.76-.06.06 4.689 4.689-.7.699zm.69 11.652-.783.783-3.905-8.437.771-.771 8.437 3.905-.783.783-2.368-1.127-2.496 2.496zm.47-5.291-2.024 2.024-1.796-3.772.048-.048zm-2.218 7.04-6.171-6.172-.735.735 4.857 4.858-.06.06-8.232-1.483-.724.724 6.172 6.17.747-.746-4.845-4.846.06-.06 8.208 1.482z"
        clipRule="evenodd"
      />
    </svg>
  );
};
NameTag.propTypes = {
  title: PropTypes.string,
};
export default NameTag;
