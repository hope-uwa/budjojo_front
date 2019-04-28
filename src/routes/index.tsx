import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from '../utils/constants/routes';
import Home from '../components/Home';
import UserDashboard from '../components/Dashboard';



class AppComponent extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  public render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* <Route exact={true} path={routes.LANDING} component={Landing} />
            
            */}
            <Route exact={true} path={routes.HOME} component={Home} />
            <Route exact={true} path={routes.USER} component={UserDashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppComponent;
