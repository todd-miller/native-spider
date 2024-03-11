import { createActorContext } from "@xstate/react";
import { assign, createMachine } from "xstate";
import { deal, Stack, Card } from "../utils/dealer";

const CARD_TO_BOARD_RATIO = 0.075;
const CARD_CORNER_RAIDUS = 1;
const STACK_WIDTH_RATIO = 1.2;
const NUM_STACKS = 10;
const TOP_PADDING_PERCENT = 0.05;

const assigns = {
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
      return { 
        ...context.dimensions,
        screen: { width,  height },
        card,
        stack,
        padding
      }
    }
  }),
  newGame: assign({
    game: ({ context }) => {
      const { padding, stack } = context.dimensions;
      const { stacks, remaining } = deal(padding, stack);
      return { stacks, remaining };
    }
  })
}

const DEFAULT_CONTEXT = {
  game: {
    stacks: [] as Stack[],
    remaining: [] as Card[]
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
    stack: {
      width: 60,
      height: 80
    }
  }
}

export const gameMachine = () => createMachine({
  context: DEFAULT_CONTEXT, 
  initial: "INIT",
  states: {
    INIT: {
      on: {
        START_GAME: [
          { target: "PLAYING", actions: [assigns.setDimensions, assigns.newGame] }
        ],
      }
    }, 
    PLAYING: {
      entry: () => console.log("playing...")
    }
  }
});

export const GameContext = createActorContext(gameMachine());

