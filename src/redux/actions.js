export const addContact = {
  type: "contacts/ADD_CONTACT",
  payload: "add-contact",
};

export const removeContact = {
  type: "contacts/REMOVE_CONTACT",
  payload: "add-contact",
};

export const filterContact = {
  type: "contacts/filter_CONTACT",
  payload: "add-contact",
};
// //actionCreater - динамически настраиваемое действие
// export const testActionCreater = (value) => {
//   return {
//     type: "ADD_CONTACT",
//     payload: value,
//   };
// };
//
// or
//
// export const testActionCreater = (value) => ({
//     type: "ADD_CONTACT",
//     payload: value,
// });
//
