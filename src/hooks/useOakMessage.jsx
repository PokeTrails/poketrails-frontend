import { useState, useEffect } from 'react';

import { capitaliseName } from '../utils';

export const useOakMessage = (pokemonName) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!pokemonName) return;

    const capitalisedName = capitaliseName(pokemonName);

    const professorMessages = [
      `${capitalisedName} looks incredibly healthy! Its coat is shiny, and its eyes are bright, indicating that it's in excellent physical condition. You must have provided it with a balanced diet and plenty of exercises.`,
      `Wow, ${capitalisedName} seems to have developed an exceptionally strong bond with you. The way it reacts to your presence and follows your commands shows a deep level of trust and loyalty. It's clear you've spent a lot of quality time together.`,
      `I've noticed that ${capitalisedName} has become quite strong, both physically and mentally. It's rare to see such resilience and determination. This Pokémon has likely faced and overcome many challenges under your guidance.`,
      `${capitalisedName} seems to be in peak condition. Its muscles are well-defined, and it exudes confidence. You've done a fantastic job not only training it in battles but also ensuring its overall well-being.`,
      `${capitalisedName} has shown significant growth since the last time I saw it. Its moves are more precise, and its reaction time is quicker. I believe this Pokémon has a lot of untapped potential that will continue to unfold with your care.`,
      `The bond between you and ${capitalisedName} is palpable. It watches your every move and seems to understand your intentions without needing verbal commands. This kind of relationship is built on mutual respect and trust.`,
      `${capitalisedName} appears to be very happy and content. Its playful behavior and the way it interacts with you suggest that it's comfortable and well-adjusted. This kind of emotional stability is a sign of excellent care.`,
      `You've clearly put in a lot of effort to raise ${capitalisedName} to this level. Its physical conditioning, mental sharpness, and emotional stability are all signs of a well-rounded training regimen. It's in excellent condition!`,
      `${capitalisedName} has a unique sparkle in its eyes that indicates a high level of intelligence and curiosity. It's always eager to learn new things and explore its surroundings, which is a great sign of a thriving Pokémon.`,
      `The way ${capitalisedName} responds to your voice and gestures shows a deep understanding between the two of you. It seems to anticipate your needs and reacts accordingly, demonstrating an advanced level of training and companionship.`,
      `${capitalisedName} is thriving under your care. Its energy levels are high, and it's always eager to engage in activities. This enthusiasm is a sign that it's getting all the physical and mental stimulation it needs.`,
      `I can see that ${capitalisedName} has been well-trained in both offensive and defensive techniques. Its stance and alertness suggest it's ready for any challenge that comes its way, which is a testament to your training skills.`,
      `It's clear that ${capitalisedName} enjoys spending time with you. The way it interacts with you and seeks your attention shows that it feels safe and loved. This emotional connection is crucial for its overall well-being.`,
      `You've done an excellent job nurturing ${capitalisedName}. Its glossy coat and clear eyes indicate it's getting all the nutrients it needs. Additionally, its friendly demeanor suggests that it's happy and well-socialized.`,
      `${capitalisedName} is very well-behaved, showing a high level of discipline and respect for you. It's not often you see a Pokémon that listens so attentively and follows commands so precisely. You've done a great job instilling these qualities.`,
      `The energy and vibrancy that ${capitalisedName} displays are remarkable. It's always ready for a new adventure and seems to have a zest for life. This kind of enthusiasm is a great indicator of a well-cared-for Pokémon.`,
      `You and ${capitalisedName} make a great team. The way you coordinate during activities and the mutual respect you share are clear indicators of a strong partnership. It's fantastic to see such harmony between a trainer and their Pokémon.`,
      `It's wonderful to see how much ${capitalisedName} has grown and matured under your care. From its physical development to its emotional stability, every aspect of its being reflects the love and attention you've provided.`,
      `The affection ${capitalisedName} shows towards you is heartwarming. It's evident in the way it looks at you and how it enjoys your presence. This level of affection is a sign of a deep emotional bond.`,
      `You've clearly spent a lot of time with ${capitalisedName}, and it shows in its demeanor and behavior. It's confident, well-trained, and emotionally balanced. This Pokémon is a testament to your dedication and care.`,
    ];

    const newMessage = professorMessages[Math.floor(Math.random() * professorMessages.length)];
    console.log("Generating new message for: ", pokemonName);

    setMessage(newMessage);
  }, [pokemonName]);

  return message;
};
