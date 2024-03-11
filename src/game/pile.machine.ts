import { createMachine } from "xstate";


export const pileMachine = () => createMachine({
  context: {
    visible: [],
    hidden: [],
    completed: []
  },
  initial: "INIT",
  states: {
    INIT: {
      on: {
        ADD_CARDS: [],
        REMOVE_CARDS: []
      }
    },
  }
});
