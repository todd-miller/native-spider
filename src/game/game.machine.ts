import { createActorContext } from "@xstate/react";
import { assign, createMachine } from "xstate";

const CARD_TO_BOARD_RATIO = 0.085;
export const DECK_SIZES = [6, 6, 6, 6, 5, 5, 5, 5, 5, 5]

const assigns = {
  newGameContext: assign({
    dimensions: (c) => {
      const { width, height } = c.event.payload;
      const card = {
        width: width * CARD_TO_BOARD_RATIO,
        height: width * 4/3 * CARD_TO_BOARD_RATIO
      };
      return { 
        screen: { width,  height },
        card,
        piles: {
          width: 10,
          height: card.height
        }
      };
    },
  })
}

const actions = {
  log: ({ context }) => console.log("actions.log(c) -> ", context),
}

const DEFAULT_CONTEXT = {
  dimensions: {
    padding: 10,
    screen: {
      width: 100,
      height: 100 
    },
    card: {
      width: 60,
      height: 80
    },
    piles: {
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
          { target: "PLAYING", actions: [assigns.newGameContext, actions.log] }
        ],
      }
    }, 
    PLAYING: {
      entry: () => console.log("playing...")
    }
  }
});

export const GameContext = createActorContext(gameMachine());

