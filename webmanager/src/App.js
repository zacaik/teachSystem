import { Loading } from "./components";
import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAction } from "./pages/unAuthPages/store/actionCreators";
import { useHttp } from "./utils/http";

const AuthPage = React.lazy(() => import("./pages/authPages"));
const UnAuthPage = React.lazy(() => import("./pages/unAuthPages"));

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = useHttp();

  const [currentClass, setCurrentClass] = useState("");
  const [classList, setClassList] = useState([]);
  let { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const bootStrapUser = async () => {
    const token = localStorage.getItem("__auth-provider-token__");
    if (token) {
      request("scweb/teacher/byToken").then((res) => {
        if (res.data) {
          dispatch(setUserAction(res.data));
        }
      });
    }
  };

  useEffect(() => {
    if (!user) {
      bootStrapUser();
    }
  }, []);

  useEffect(async () => {
    console.log("user", user);
    if (!user) {
      navigate("/");
    } else {
      navigate("/brief");
      const classList = await request(`scweb/class/list/${user.id}`);
      setClassList(classList.data);
    }
  }, [user]);

  return (
    <div className="App">
      <React.Suspense fallback={<Loading />}>
        {user ? (
          <AuthPage
            currentClass={currentClass}
            setCurrentClass={setCurrentClass}
            classList={classList}
          />
        ) : (
          <UnAuthPage />
        )}
      </React.Suspense>
    </div>
  );
}

export default App;
