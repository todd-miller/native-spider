import { createActorContext } from "@xstate/react";
import { assign, createMachine } from "xstate";
import { createDeck, STACK_SIZES } from "../utils/dealer";
import { Card, Stack } from "../types";

const CARD_TO_BOARD_RATIO = 0.075;
const CARD_CORNER_RAIDUS = 1;
const STACK_WIDTH_RATIO = 1.2;
const NUM_STACKS = 10;
const DEAL_COUNT = STACK_SIZES.reduce((sum, next) => sum + next, 0);
const TOP_PADDING_PERCENT = 0.05;

const assigner = {
  startMove: assign({
    move: ({ event, context }) => {
      const { id } = event;
      const { cards } = context.game;
      const card = cards.filter((card: Card) => card.id === id)[0]
      return { start: card };
    }
  }),
  moveCard: assign({
    game: ({ event, context }) => {
      const { id } = event;
      const { game } = context;
      const { cards } = game;
      const cardIndex = cards.map((card: Card) => card.id).indexOf(id);
      const card = cards[cardIndex];

      let x: number, y: number;
      if (event.event.type === "pointermove") {
        const { clientX, clientY } = event.event;
        console.debug("pointermove: ", clientX, clientY);
        x = clientX, y = clientY;
      } else if (event.event.type === "touchmove") {
        const { touches } = event.event;
        const { clientX, clientY } = touches[0];
        x = clientX, y = clientY;
        console.debug("touchmove: ", clientX, clientY);
      } else {
        if (Object.hasOwn(event.event, "nativeEvent")) {
          const { nativeEvent } = event.event;
          const { pageX, pageY} = nativeEvent.touches[0];
          x = pageX, y = pageY;
          console.debug("ios event: ", pageX, pageY);
        } else {
          x = card.position.x;
          y = card.position.y;
        }
      }
      
      cards[cardIndex] = {
        ...card,
        position: { x, y, z: 100 }
      }

      return { ...game, cards: cards }
    }
  }),
  resetsMove: assign({
    game: ({ context, event }) => {
      const { id } = event;
      const { game, move } = context;
      const { cards } = game;
      const cardIndex = cards.map((card: Card) => card.id).indexOf(id);
      cards[cardIndex] = move.start
      return { ...game, cards }
    },
    move: () =>  undefined,
  }),
  setDimensions: assign({
    dimensions: ({ event, context }) => {
      const { width, height } = event.payload;
      const card = {
        width: width * CARD_TO_BOARD_RATIO,
        height: width * 1.452 * CARD_TO_BOARD_RATIO,
        radius: CARD_CORNER_RAIDUS
      };
      const stack = {
        width: card.width * STACK_WIDTH_RATIO,
        height: card.height
      }

      const padding = {
        left: (width - (stack.width * NUM_STACKS)) / 2,
        top: width * TOP_PADDING_PERCENT 
      };

      const stacks = STACK_SIZES.map((_, index) => {
        return {
          x: padding.left + (stack.width * index)
        }
      });

      return { 
        ...context.dimensions,
        screen: { width,  height },
        card,
        stacks,
        padding
      }
    }
  }),
  newGame: assign({
    game: ({ context }) => {
      const { cards, remaining } = context.game;
      const { padding, screen, card: cardDimensions, stacks: stackPositions } = context.dimensions;

      // initialize stack objects
      const stacks: Stack[] = STACK_SIZES.map(() => ({
        hidden: [], 
        visible: [], 
        completed: [],
      }));

      // deal cards to stacks
      let count = 0;
      while (count < DEAL_COUNT) {
        const stackIndex = count % NUM_STACKS;
        const dealRound = Math.floor(count / NUM_STACKS); 
        const card = cards[count];
        const nextX = stackPositions[stackIndex].x

        cards[count] = {
          ...card,
          position: {
            ...card.position,
            y: padding.top + (5*dealRound),
            x: nextX,
          }
        }
        stacks[stackIndex].hidden.push(cards[count].id)
        count+=1;
      }

      // position remaining cards
      for (let i = count; i < cards.length; i++) {
        const setNumber = Math.floor((i - count) / NUM_STACKS)
        const card = cards[i];
        cards[i] = {
          ...card,
          position: {
            x: stackPositions[stackPositions.length-1].x,
            y: screen.height - (cardDimensions.height + padding.top) + (5 * setNumber),
            z: 10
          }
        }
        remaining.push(cards[i].id);
      }

      // flip top card of every stack
      stacks.forEach((stack) => {
        const flipId = stack.hidden.pop();
        const flipIndex = cards.map((card: Card) => card.id).indexOf(flipId);
        stack.visible.push(flipId as string);
        cards[flipIndex] = {
          ...cards[flipIndex],
          hidden: false,

        }
      })

      return { cards: cards, stacks, remaining };
    }
  })
}

const guards = {
  illegalMove: ({ event, context }) => {
    const { id } = event;
    const { cards, stacks } = context.game;
    const { stacks: stackDimensions, card: cardDimensions } = context.dimensions;
    const cardIndex = cards.map((card: Card) => card.id).indexOf(id);


    console.log("stacks: ", stacks);
    console.log("stackDimensions: ", stackDimensions);
    console.log("cardWidth: ", cardDimensions.width);
    console.log("card position: ", cards[cardIndex].position.x);
    return true
  } 
}

const DEFAULT_CONTEXT = {
  game: {
    cards: [...createDeck('0'), ...createDeck('1')],
    stacks: [] as Stack[],
    remaining: [] as Card[]
  },
  move: {
    start: undefined,
  },
  dimensions: {
    padding: { left: 55, top: 25 },
    screen: {
      width: 100,
      height: 100 
    },
    card: {
      width: 60,
      height: 80,
      radius: CARD_CORNER_RAIDUS
    },
    stacks: []
  }
}

export const gameMachine = () => createMachine({
  context: DEFAULT_CONTEXT, 
  initial: "INIT",
  states: {
    INIT: {
      on: {
        START_GAME: { 
          target: "PLAYING",
          actions: [assigner.setDimensions, assigner.newGame] 
        },
      }
    }, 
    PLAYING: {
      entry: () => console.debug("playing"),
      on: {
        START_MOVE: { target: "MOVING" },
      }
    },
    MOVING: {
      entry: assigner.startMove,
      exit: [() => console.log("END OF MOVE")],
      on: {
        MOVE: {
          target: "MOVING",
          actions: [assigner.moveCard]
        },
        END_MOVE: [ 
          { target: "PLAYING", actions: [assigner.resetsMove], guard:guards.illegalMove }, 
        ]
      }
    }
  }
});

export const GameContext = createActorContext(gameMachine());

