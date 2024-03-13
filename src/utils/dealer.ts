import { Card, Position, Stack } from '../types';

export const LABELS = {
  'ace': 'a',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  'jack': 'j',
  'queen': 'q',
  'king': 'k'
};

export const SUITS = {
  'clubs': 'c',
  'diamonds': 'd',
  'hearts': 'h',
  'spades': 's'
};

export const SUIT_SYMBOLS = {
  'clubs': '',
  'diamonds': '',
  'hearts': '',
  'spades': '',
}

export const STACK_SIZES = [6, 6, 6, 6, 5, 5, 5, 5, 5, 5];


export const createDeck = (idSuffix = '') => {
  const cards:Card[]  = [];
  Object.keys(LABELS).forEach((label) => {
    Object.keys(SUITS).forEach((suit) => {

      const id = idSuffix 
        ? `${LABELS[label]}${SUITS[suit]}.${idSuffix}`
        : `${LABELS[label]}${SUITS[suit]}`;

      cards.push({
        id,
        label,
        suit,
        hidden: true,
        position: { x: 0, y: 0, z: 0},
      });
    })
  })
  return cards;
};

// const shuffledArray = (array: Card[]) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//   return shuffled
// }

export const deal = (padding = {left: 0, top: 0}, { width }) => {
  const spiderDeck: Card[] = [ ...createDeck(), ...createDeck() ];
  const stacks: Stack[] = STACK_SIZES.map(() => ({
    hidden: [], 
    visible: [], 
    completed: [],
    position: {x: 0, y: 0 }
  }));

  let cardsToDeal = STACK_SIZES.reduce((sum, next) => sum + next, 0);

  // deal the cards
  [...Array(cardsToDeal)].forEach((_, index) => {
    const stackIndex = index % STACK_SIZES.length
    const stack = stacks[stackIndex];
    const card = spiderDeck.pop() as Card;
    card.position.x = padding.left + (width * stackIndex);
    card.position.y = padding.top;
    stack.hidden.push(card)
  })

  stacks.map((stack) => {
    stack.visible.push(stack.hidden.pop() as Card);
  })

  return { stacks, remaining: spiderDeck };
};


