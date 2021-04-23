import { Grid } from '@material-ui/core';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../../../Components/Navigation/Navigation';
import { navigationArrayWithRoutes } from '../../../Components/Navigation/createNavigation';


const NavigationTemplate: React.FC = ({ children }) => {
  return (
    <>
      <Grid>
          <Navigation
            makeNavigation={navigationArrayWithRoutes}
          />
      </Grid>
      {children}
    </>
  );
};

function NavigationView() {
  return (
    <>
        <NavigationTemplate>
          <Switch>
              <Route path="/" exact>
                 {/* KOMPONENT */}
              </Route>
              <Route path="/registration">
                {/* KOMPONENT */}
              </Route>
              <Route path="/login">
               {/* KOMPONENT*/}
              </Route>
          </Switch>
        </NavigationTemplate>
    </>
  );
}

export default NavigationView;
