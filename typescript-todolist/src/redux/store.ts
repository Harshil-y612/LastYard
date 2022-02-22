import { applyMiddleware, createStore } from "redux";

import RootReducer from "./rootReducer";
import thunk from "redux-thunk"

// create the store
export const store = createStore(RootReducer,applyMiddleware(thunk));

