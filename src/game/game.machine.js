import { createActorContext } from "@xstate/react";
import { createMachine } from "xstate";

const actions = {
  log: (c) => console.log("actions.log(c) -> ", c.event, c.context),
  deal: () => {
    console.log("dealing ...")
  }
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
        NEW_GAME: {
          actions: actions.deal
        },
        LOG: {
          actions: actions.log
        }
      }
    }
  }
});

export const GameContext = createActorContext(gameMachine());

