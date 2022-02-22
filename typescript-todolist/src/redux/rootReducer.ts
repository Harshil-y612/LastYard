import { combineReducers } from "redux";
import reducer from "./reducers/crud";

//combine th ereducer using combine reducer
const RootReducer = combineReducers({
  reducer,
});

export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>;
