import { Loading } from "./components";
import React, { useEffect } from "react";
import "./App.css";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthPage = React.lazy(() => import("./pages/authPages"));
const UnAutnPage = React.lazy(() => import("./pages/unAuthPages"));

function App() {
  const { user } = useSelector((state) => ({
      user: state.user.user
    }),
    shallowEqual
  );
  console.log(user);

  const navigate = useNavigate();

  // 当用户状态失效后，清空路由
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="App">
        <React.Suspense fallback={<Loading />}>
          {user ? <AuthPage /> : <UnAutnPage />}
        </React.Suspense>
    </div>
  );
}

export default App;
