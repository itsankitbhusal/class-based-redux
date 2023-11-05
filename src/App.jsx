import Weather from "./components/Weather";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <div className=" grid place-items-center min-h-screen">
      <Provider store={store}>
        <Weather />
      </Provider>
    </div>
  );
}
