import { Dispatch } from "redux";
import { Action } from "../actionTypes/Actions";
import { User } from "../actionTypes/Types";

//add user action creator
export const addUser = (object: User) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "ADD-USER",
      playload: object,
    });
  };
};

//delete user action creator
export const deleteUser = (listId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "DELETE_USER",
      playload: listId,
    });
  };
};

// edit user action creator
export const editUser = (updatedObj: User) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: "EDIT_USER",
      playload: updatedObj,
    });
  };
};