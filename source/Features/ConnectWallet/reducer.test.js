import { describe } from "riteway";
import {
  reducer,
  fetchWallet,
  reportError,
  reportSuccess,
  disconnectWallet,
  handleError,
} from "./reducer";

// a function to test
describe("reducer()", async (assert) => {
  const testError = new Error("default error message");
  assert({
    given: "no arguments",
    should: "have a status of signed out",
    actual: reducer(undefined).status,
    expected: "signed out",
  });
  {
    // fetchWallet
    const setup = reducer(undefined);
    assert({
      given: "fetchWallet()",
      should: "transition to a status of authenticating",
      actual: reducer(setup, fetchWallet()).status,
      expected: "authenticating",
    });
  }
  {
    const setup = reducer(
      reducer(undefined, fetchWallet()),
      reportSuccess("0x00000000")
    );

    assert({
      given: "disconnectWallet()",
      should: "transition to a status of signed out",
      actual: reducer(setup, disconnectWallet()).status,
      expected: "signed out",
    });
  }
  {
    const setup = reducer(undefined, fetchWallet());
    const state = reducer(setup, reportError(payload))
    // reportError & handleError
    const payload = new Error("testing reportError function");
    assert({
      given: "reportError()",
      should: "transition to a status of error",
      actual: state.status,
      expected: "error",
    });
    assert({
      given: "reportError()",
      should: "update the payload with an error message.",
      actual: state.payload,
      expected: payload,
    });
  }
  {
    const setup = reducer(
      reducer(undefined, fetchWallet()),
      reportError(testError)
    );

    assert({
      given: "handleError()",
      should: "update the status to be signed out",
      actual: reducer(setup, handleError()).status,
      expected: "signed out",
    });
  }
});
