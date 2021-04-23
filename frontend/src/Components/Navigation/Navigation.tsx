import React from 'react';
import { NavLink } from 'react-router-dom';
import { TNavigationCreator } from './createNavigation';
import NavigationTextWithRoutes from './NavigationButtonWithRoutes';
import NavigationText from './NavigationText';
import { StyledNavLink } from './StyledNavlink';

type propsForNavigation = {
   makeNavigation: Array<TNavigationCreator>
}

const Navigation: React.FC<propsForNavigation> = ({makeNavigation}) => {
const isLogged = false


  return (
     <>
     <NavLink to='/' exact>
        {/* LOGO */}
     </NavLink>

     {/* SPRAWDZAMY LOGOWANIE */}
     {isLogged ?
     <>
     <StyledNavLink to="/userAccount">
      <NavigationText margin="0" mainText="Profil" />
      </StyledNavLink>
      <NavLink to="/">
      <NavigationText margin="0" mainText="Wyloguj" />
      </NavLink>
   </>
   : <>
   <StyledNavLink to="/registration">
     <NavigationText margin="0" mainText="Rejestracja" />
   </StyledNavLink>
   <StyledNavLink to="/login">
     <NavigationText mainText="Logowanie" />
   </StyledNavLink>
   </>}

{/* TWORZYMY NAWIGACJE */}
{makeNavigation.map((nav, id) => {
     return (
       <NavigationTextWithRoutes
         key={id}
         text={nav.name}
         route={nav.route}
       />
     );
   })}
   </>
  )
};

export default Navigation;