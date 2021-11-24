import gamesReducer, {
  increment,
  decrement,
  incrementByAmount,
} from "./gamesSlice";

describe("games reducer", () => {
  const initialState = {
    value: 3,
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(gamesReducer(undefined, { type: "unknown" })).toEqual({
      value: 0,
      status: "idle",
    });
  });

  it("should handle increment", () => {
    const actual = gamesReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it("should handle decrement", () => {
    const actual = gamesReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it("should handle incrementByAmount", () => {
    const actual = gamesReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
