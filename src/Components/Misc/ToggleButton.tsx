import { LabelText } from '../Views/StartMenu/StartMenu';

export const ToggleButton = ({
  label,
  checked,
  onChange,
}: {
  label?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col items-center">
      {label && <LabelText>{label}</LabelText>}

      <label className="inline-flex items-center cursor-pointer relative h-6 w-10">
        <input
          type="checkbox"
          value=""
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="relative mx-1 w-10 h-[0.875rem] bg-gray-900 rounded-full peer peer-checked:bg-primary-dark" />
        <div className="absolute peer-checked:translate-x-full rtl:peer-checked:-translate-x-full bg-secondary-main peer-checked:bg-primary-main rounded-full h-5 w-5 transition-all" />
      </label>
    </div>
  );
};
