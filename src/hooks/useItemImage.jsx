import { useMemo } from 'react';
import happinessShareImage from '../assets/store_images/happiness_share.png';
import shinyCharmImage from '../assets/store_images/shiny_charm.png';
import pathfinderTrainersImage from '../assets/store_images/running_shoes.png';
import amuletCoinImage from '../assets/store_images/amulet_coin.png';
import eggImage from '../assets/store_images/egg.png';

const imageMap = {
  'Happiness Share': happinessShareImage,
  'Shiny Charm': shinyCharmImage,
  'Pathfinder Trainers': pathfinderTrainersImage,
  'Amulet Coin': amuletCoinImage,
  'Basic Egg': eggImage,
  'Special Egg?': eggImage,
};

function useItemImage(itemName = null) {
  return useMemo(() => {
    // If itemName is provided, return the corresponding image or a default
    if (itemName) {
      return imageMap[itemName] || imageMap['Basic Egg'];
    }
    // Otherwise, return the entire image map
    return imageMap;
  }, [itemName]);
}

export default useItemImage;
