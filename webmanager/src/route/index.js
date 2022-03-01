import Brief from "../pages/Breif";
import Course from "../pages/Course";
import Grade from "../pages/Grade";

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
    path: "/course",
    component: Course,
  },
  {
    path: "/grade",
    component: Grade,
  },
];

export default routes;
