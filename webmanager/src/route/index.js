import Recruit from "../pages/Recruit";
import { Redirect } from "react-router-dom";
import Brief from "../pages/Breif";

const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   render: () => <Redirect to={"/breif"} />,
  // },
  {
    path: "/breif",
    component: Brief,
  },
  {
    path: "/recruit",
    component: Recruit,
  },
];

export default routes;
