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
      viewBox="0 0 52 52"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M27.109 3.482a.5.5 0 0 0-.3-.396l-4.148-1.75a.502.502 0 0 0-.694.519c.208 1.787.697 6.165 1.094 11.088a17.5 17.5 0 0 1 3.156-.24q.956.012 1.89.126a303 303 0 0 0-.998-9.347M21.556 50.067a.503.503 0 0 0 .72.516l4.556-2.244a.5.5 0 0 0 .274-.384c.119-.97.539-4.48.932-8.787.159-1.735.313-3.6.441-5.48.203-2.966.34-5.97.33-8.563-.008-2.09-.115-4.459-.272-6.849a13 13 0 0 0-2.32-.255c-.946-.02-1.886.063-2.788.247.135 2.398.219 4.757.213 6.857-.008 2.589-.156 5.54-.372 8.502a239 239 0 0 1-.454 5.352 330 330 0 0 1-1.26 11.088" />
      <path d="M26.217 12.702a17.5 17.5 0 0 0-3.156.24c-6.351 1.072-11.603 5.623-12.035 12.183-.455 6.93 5.072 12.492 11.79 13.854.166-1.734.323-3.545.454-5.352-4.025-1.055-7.345-4.36-6.896-8.502.408-3.76 3.43-6.119 7.055-6.857a12.7 12.7 0 0 1 2.788-.247c.788.017 1.567.103 2.32.255 3.65.742 6.675 3.067 7.089 6.85.464 4.245-2.997 7.581-7.147 8.561-.128 1.88-.282 3.746-.44 5.481 7.254-.93 13.419-6.7 12.934-14.043-.452-6.861-6.119-11.483-12.867-12.296a18 18 0 0 0-1.89-.127" />
    </svg>
  );
};
Poison.propTypes = {
  title: PropTypes.string,
};
export default Poison;
