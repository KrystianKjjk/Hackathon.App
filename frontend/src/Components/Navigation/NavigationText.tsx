
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';


const StyledButton = withStyles(() => ({
  root: {
    margin: '0 auto',
    fontWeight: 400,
    fontSize: 16,
    '&:hover': {
      transition: '.3s ease-in',
      backgroundColor: 'transparent',
      color: 'rgba(255, 251, 30, 0.582)',
    },
  },
}))(Button);

type propsForNavigationText = {
   margin?:string,
   mainText:string,
   variant?:"text" | "outlined" | "contained" | undefined
}

const NavigationText: React.FC<propsForNavigationText> = ({
  margin = '30px',
  mainText,
  variant = 'text',
}) => {
  return (
      <StyledButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant={variant}
      >
        {mainText}
      </StyledButton>
  );
};

export default NavigationText;
