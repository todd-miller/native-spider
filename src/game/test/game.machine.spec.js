import { createActor } from "xstate";
import { gameMachine } from "../game.machine";
import { assert, testActor } from "../../utils/test_utils";

describe("gameMachine tests", () => {
  let game, count;
  beforeEach(() => {
    game = gameMachine();
    count = 0;
  })
  it("should run tests", (done) => {
    const expected = [
      (state) => {
        expect(state.context).toEqual({ board: {} });
        expect(state.event.type).toEqual("xstate.init");
      },
      (state) => {
        expect(state.context).toEqual({ board: {} });
        expect(state.event.type).toEqual("LOG");
      },
      (state) => {
        expect(state.context).toEqual({ board: {} });
        expect(state.event.type).toEqual("LOG");
      },
      (state) => {
        expect(state.event.type).toEqual("xstate.stop");
      }
    ];
    const actor = testActor(game, expected);
    actor.start();
    actor.send({ type: "LOG" });
    actor.send({ type: "LOG" });
    actor.stop();
    done();
  });
})
