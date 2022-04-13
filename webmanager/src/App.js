import { Loading } from "./components";
import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAction } from "./pages/unAuthPages/store/actionCreators";
import { http } from "./utils/http";

const AuthPage = React.lazy(() => import("./pages/authPages"));
const UnAuthPage = React.lazy(() => import("./pages/unAuthPages"));

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentClass, setCurrentClass] = useState("");
  const [classList, setClassList] = useState([]);
  console.log(classList);
  let { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const bootStrapUser = async () => {
    let data = null;
    const token = localStorage.getItem("__auth-provider-token__");
    if (token) {
      // data = await http("user", { token });
      data = 111;
    }
    dispatch(setUserAction(data));
    return data;
  };

  useEffect(() => {
    if (!user) {
      bootStrapUser().then((res) => {
        user = res;
      });
    }
  }, []);

  useEffect(async () => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/brief");
      const classList = await http("classList", {});
      console.log(classList);
      setClassList(classList);
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
