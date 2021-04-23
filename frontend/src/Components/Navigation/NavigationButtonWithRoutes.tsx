import React from 'react';
import NavigationText from './NavigationText';
import { StyledNavLink } from './StyledNavlink';

type propsForNavigationTextWithRoutes = {
   route: string,
   text: string
}

const NavigationTextWithRoutes: React.FC<propsForNavigationTextWithRoutes> = ({ route, text }) => {
  return (
    <StyledNavLink to={route}>
      <NavigationText mainText={text} />
    </StyledNavLink>
  );
};

export default NavigationTextWithRoutes;