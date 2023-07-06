import styled from 'styled-components';
import SettingsIcon from '../../Icons/SettingsIcon';

export const StyledExtraCounterButton = styled.button`
  position: relative;
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  margin-bottom: -5vmin;
  top: 8px;
  background-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

type SettingsButtonProps = {
  onClick: () => void;
};

const SettingsButton = ({ onClick }: SettingsButtonProps) => {
  return (
    <StyledExtraCounterButton onClick={onClick}>
      <SettingsIcon size="4vmin" />
    </StyledExtraCounterButton>
  );
};

export default SettingsButton;
