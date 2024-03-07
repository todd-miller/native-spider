import { createActor } from "xstate";


export const assert = (transition, expected, index) => {
  if (transition.type === "@xstate.snapshot") {
   try {
      const { snapshot, event } = transition;
      const { value, context } = snapshot;
      expected[index]({ context, event, value });
    } catch (e) {
      throw new Error(`Failure: blew up on transition ${index} from ${e}`);
    }
    index += 1;
  }
  return index;
}

export const testActor = (machine, behavior) => {
  let count = 0;
  return createActor(machine, {
    inspect: (transition) => {
      count = assert(transition, behavior, count);
    }
  })
}
