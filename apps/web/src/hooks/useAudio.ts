import { useMemo, useEffect, useState } from 'react';

const useAudio = (url: string): [boolean, (p?: boolean) => void] => {
  const audio = useMemo(() => new Audio(url), []);
  const [playing, setPlaying] = useState(false);

  const toggle = (play?: boolean) => {
    if (typeof play !== 'undefined') {
      setPlaying(play);
      return;
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default useAudio;
