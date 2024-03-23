import { useEffect, useState } from 'react';

export interface OrientationState {
  angle: number;
  type: string;
}

const defaultState: OrientationState = {
  angle: 0,
  type: 'landscape-primary',
};

export default function useOrientation(
  initialState: OrientationState = defaultState
) {
  const [state, setState] = useState(initialState);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const screen = window.screen;
    let mounted = true;

    const onChange = () => {
      if (mounted) {
        const { orientation } = screen;

        if (orientation) {
          const { angle, type } = orientation;
          setState({ angle, type });
          if (type.includes('landscape')) {
            setIsLandscape(true);
          } else if (type.includes('portrait')) {
            setIsLandscape(false);
          }
        } else if (window.orientation !== undefined) {
          setState({
            angle:
              typeof window.orientation === 'number' ? window.orientation : 0,
            type: '',
          });
        }
      }
    };
    onChange();

    return () => {
      mounted = false;
    };
  }, [isLandscape]);

  return { state, isLandscape };
}
