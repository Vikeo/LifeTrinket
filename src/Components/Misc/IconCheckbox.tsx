export const IconCheckbox = ({
  name,
  icon,
  checkedIcon,
  checked,
  onChange,
  className,
}: {
  name: string;
  icon: JSX.Element;
  checkedIcon: JSX.Element;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  return (
    <div className={className}>
      <label>
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="peer-checked:hidden block">{icon}</div>
        <div className="peer-checked:block hidden">{checkedIcon}</div>
      </label>
    </div>
  );
};
