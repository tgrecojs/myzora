import { describe } from "riteway";
import render from "riteway/render-component";
import {
  fetchMetamaskProvider,
  reportError,
  reportSuccess,
  handleError,
  reducer,
  txnStatus,
  txnPayload,
} from "./reducer";

const defaultState = {
  payload: { type: "empty" },
  status: "idle",
};

const createState = (state = defaultState) => ({ ...state });

describe("metamaskProviderReducer", async (assert) => {
  const setup = reducer();
  assert({
    given: "no arguments",
    should: "have a status idle",
    actual: reducer(),
    expected: {}
  });

  assert({
    given: "no arguments",
    should: "have a payload of { type: 'empty'}",
    actual: setup.payload.toString() === { type: "empty" }.toString(),
    expected: true,
  });
  {
    const setup = reducer(undefined , reducer())
    assert({
      given: "fetchProvider action",
      should: "have a status of fetching",
      actual: reducer(setup, fetchMetamaskProvider()),
      expected: {status: "fetching provider" },
    });
  }
});
