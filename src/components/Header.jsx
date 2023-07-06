import { AppBar, Toolbar, Typography } from '@mui/material';
import '@fontsource/montserrat';

const headerStyles = {
  appBar: {
    backgroundColor: 'black',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 5,
  },
  logo: {
    width: 40,
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  },
};

const Header = () => {
  return (
    <AppBar position="sticky" style={headerStyles.appBar}>
      <Toolbar>
        <img
          src="src/assets/logo-header.png"
          alt="Logo"
          style={headerStyles.logo}
        />
        <Typography variant="h6" style={headerStyles.title}>
          chakri chai
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
