import { createActorContext } from "@xstate/react";
import { assign, createMachine } from "xstate";

const CARD_TO_BOARD_RATIO = 0.085;

const assigns = {
  newGameContext: assign({
    dimensions: (c) => {
      

    },
    board: (c) => {
      const { width, height } = c.event.payload;
      return { width,  height };
    }, 
    card: (c) => {
      const { payload } = c.event;
      const width = payload.width * CARD_TO_BOARD_RATIO;
      const height = width * 4/3;
      return { width, height };
    },
    piles: () => {
      return []
    },
    stack: () => ['stack'],
  })
}
const actions = {
  log: (c) => console.log("actions.log(c) -> ", c),
}

const DEFAULT_CONTEXT = {
  board: {},
  card: {},
  piles: [],
  stack: []
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

