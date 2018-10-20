import React, { Component } from "react";
import { Route } from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";

const routes = [
  {
    path: "",
    component: asyncComponent(() => import("../dashboard"))
  },
  {
    path: 'drivers',
    component: asyncComponent(() => import('../Driver'))
  },
  {
    path: 'vehicles',
    component: asyncComponent(() => import('../Vehicle'))
  },
  {
    path: 'carts',
    component: asyncComponent(() => import('../Cart'))
  },
  {
    path: 'itineraries',
    component: asyncComponent(() => import('../Itinerary'))
  },
  {
    path: 'travels',
    component: asyncComponent(() => import('../Travel'))
  },
  {
    path: 'new_travel',
    component: asyncComponent(() => import('../Travel/addTravel'))
  },
  {
    path: 'edit_travel/:id',
    component: asyncComponent(() => import('../Travel/editTravel'))
  }
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
