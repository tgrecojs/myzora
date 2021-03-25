import { describe } from "riteway";
import render from "riteway/render-component";
import {
  fetchProvider,
  reportError,
  reportSuccess,
  handleError,
  reducer,
  FETCHING,
  SUCCESS,
  ERROR,
  IDLE,
} from "./reducer";

const defaultState = {
  payload: { type: "empty" },
  status: "idle",
};

const createState = (state = defaultState) => ({ ...state });

describe("metamaskProviderReducer", async (assert) => {
  const setup = reducer(undefined);
  assert({
    given: "no arguments",
    should: "have a status idle",
    actual: setup.status === "idle",
    expected: true,
  });

  assert({
    given: "no arguments",
    should: "have a payload of { type: 'empty'}",
    actual: setup.payload.toString() === { type: "empty" }.toString(),
    expected: true,
  });

  const fetchSetup = reducer(setup, fetchProvider());
  assert({
    given: "fetchProvider action",
    should: "have a status of fetching",
    actual: fetchSetup.status === "fetching provider",
    expected: true,
  });

  const testResponse = {
    _state: { chain: 0 },
  };
  const successSetup = reducer(fetchSetup, reportSuccess(testResponse));
  assert({
    given: "reportSuccess action",
    should: "transition to a status of success",
    actual: successSetup.status === "success",
    expected: true,
  });
  assert({
    given: "reportSuccess action",
    should: "update the payload object with response data",
    actual: successSetup.payload.toString() === testResponse.toString(),
    expected: true,
  });

  assert({
    given: "reportError action",
    should: "should not work when status is success",
    actual: reducer(successSetup, reportError()).status === 'success',
    expected: true,
  });
});
