import { createMachine } from "xstate";

const actions = {
  log: (c) => console.log("actions.log(c) -> ", c.event, c.context)
}

export const gameMachine = () => createMachine({
  context: {
    board: {}
  },
  initial: "INIT",
  states: {
    INIT: {
      on: {
        LOG: [
          { actions: [actions.log]}
        ],
        FOO: [
          { actions: [actions.log]}
        ]
      }
    }
  }
});
