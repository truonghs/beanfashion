import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { routes, adminRoutes } from "./routes/routes";
import { DefaultLayout } from "./layouts";
import { Fragment, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AccessDeny, Forbiden } from "./pages";
import NoneLayout from "./layouts/NoneLayout/NoneLayout";
function RouterCpn() {
  const { decodedToken } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {decodedToken?.userRole === "admin"
          ? adminRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })
          : adminRoutes.map((route, index) => {
              const Layout = NoneLayout;
              const Page = AccessDeny;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        {decodedToken
          ? null
          : adminRoutes.map((route, index) => {
              const Layout = NoneLayout;
              const Page = AccessDeny;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        <Route
          key={"0"}
          path={"*"}
          element={
            <NoneLayout>
              <Forbiden />
            </NoneLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterCpn;
