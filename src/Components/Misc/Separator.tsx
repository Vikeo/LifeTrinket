export const Separator = ({
  width = '100%',
  height = '100%',
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div
      className={`bg-common-white bg-opacity-30 rounded-full mt-2 mb-2`}
      style={{ width, height }}
    />
  );
};
