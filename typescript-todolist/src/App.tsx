import { Provider } from "react-redux";
import "./App.css";
import CrudFor from "./components/CrudFor";
import { store } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div className="App">
      <h1 className="text-primary">CRUD - TYPESCRIPT</h1>

      <Provider store={store}>
        <CrudFor />
      </Provider>
    </div>
  );
};
export default App;
