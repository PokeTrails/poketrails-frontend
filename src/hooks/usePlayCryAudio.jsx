import { Howl } from 'howler';

// Custom hook to play a Pokémon cry sound.
export default function usePlayCryAudio(onAlert) {
    const playCryAudio = (url, pitch) => {
      if (!url) {
        console.error('No cry URL provided.');
        return;
      }
      
      const cry = new Howl({
        src: [url],
        volume: 0.1,
        rate: pitch,
        onplayerror: () => {
          console.error('Error playing audio.');
          onAlert('Error playing the Pokémon cry sound.', 'error');
        },
      });
  
      cry.play();
    };
  
    return playCryAudio;
  }
  