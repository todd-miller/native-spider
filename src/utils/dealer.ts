export const LABELS = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king'
];

export const SUITS = [
  'clubs', 
  'diamonds',
  'hearts',
  'spades'
];

export const STACK_SIZES = [6, 6, 6, 6, 5, 5, 5, 5, 5, 5];

export interface Card {
  label: string;
  suit: string;
  hidden: boolean;
  x: number;
  y: number;
}

export interface Stack {
  hidden: Card[];
  visible: Card[];
  completed: string[];
}

const createDeck = () => {
  const cards:Card[]  = [];
  LABELS.forEach((label) => {
    SUITS.forEach((suit) => {
      cards.push({
        label,
        suit,
        hidden: true,
        x: 0,
        y: 0
      });
    })
  })
  return cards;
};

const shuffledArray = (array: Card[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  return shuffled
}

export const deal = (padding, { width }) => {
  const spiderDeck: Card[] = shuffledArray([ ...createDeck(), ...createDeck() ]);
  const stacks: Stack[] = STACK_SIZES.map(() => ({hidden: [], visible: [], completed: []}));
  
  let cardsToDeal = STACK_SIZES.reduce((sum, next) => sum + next, 0);

  // deal the cards
  [...Array(cardsToDeal)].forEach((_, index) => {
    const stackIndex = index % STACK_SIZES.length
    const stack = stacks[stackIndex];
    const card = spiderDeck.pop() as Card;
    card.x = padding.left + (width * stackIndex);
    card.y = padding.top;
    stack.hidden.push(card)
  })

  // flip the top card in each stack
  stacks.map((stack) => {
    stack.visible.push(stack.hidden.pop() as Card);
  })

  return { stacks, remaining: spiderDeck };
};


