import { Action } from "../actionTypes/Actions";
import { State } from "../actionTypes/Types";

// intial state
const initialState: State = {
  listArray: [],
};

// reducer function
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    // add user reducer
    case "ADD-USER":
      return {
        ...state,
        listArray: [...state.listArray, action.playload],
      };
    // delete user reducer

    case "DELETE_USER":
      return {
        ...state,
        listArray: state.listArray.filter(
          (user) => user.id !== action.playload
        ),
      };
    // edit user reducer

    case "EDIT_USER":
      console.log(action.playload);
      return {
        ...state,
        listArray: state.listArray.map((list) =>
          list.id === action.playload.id
            ? {
                ...list,
                firstName: action.playload.firstName,
                lastName: action.playload.lastName,
                age: action.playload.age,
                email: action.playload.email,
              }
            : list
        ),
      };
    default:
      return state;
  }
};

export default reducer;


