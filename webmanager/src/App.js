import { Loading } from "./components";
import React from "react";
import "./App.css";
import store from "./store";
import { Provider, useSelector, shallowEqual } from "react-redux";

const AuthPage = React.lazy(() => import("./pages/authPages"));
const UnAutnPage = React.lazy(() => import("./pages/unAuthPages"));

function App() {
  const { user } = useSelector((state) => ({
      user: state.user.user
    }),
    shallowEqual
  );
  console.log(user);

  return (
    <div className="App">
        <React.Suspense fallback={<Loading />}>
          {user ? <AuthPage /> : <UnAutnPage />}
        </React.Suspense>
    </div>
  );
}

export default App;
