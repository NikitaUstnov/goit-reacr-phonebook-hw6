import { createStore } from "redux";

const initialState = { contacts: [], filter: "" };

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "contacts/ADD_CONTACT":
      return { contacts: (state.contacts = [...contacts, contacts]) };
  }
  console.log(action);
  return state;
};

const store = createStore(reducer);

export default store;
