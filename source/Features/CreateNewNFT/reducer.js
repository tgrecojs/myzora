import autodux from "autodux";

export const {
  reducer,
  initial,
  slice,
  actions: { setForm, send, setError: setFormError },
  selectors: { getForm, getError: getFormError },
} = autodux({
  slice: "formData",
  initial: {
    form: {},
    error: null,
  },
  actions: {
    setForm: (state, payload) => ({ ...state, form: payload }),
  },
});
