import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const footerStyles = {
  footer: {
    backgroundColor: "black",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  icon: {
    color: "white",
    margin: "0 5px",
  },
};

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:abhish_mazumder@gmail.com";
  };

  return (
    <>
      <BottomNavigation style={footerStyles.footer}>
        <BottomNavigationAction
          icon={<GitHubIcon style={footerStyles.icon} />}
          href="https://github.com/abhimazumder"
          target="_blank"
          rel="noopener noreferrer"
        />
        <BottomNavigationAction
          icon={<LinkedInIcon style={footerStyles.icon} />}
          href="https://www.linkedin.com/in/abhish-mazumder"
          target="_blank"
          rel="noopener noreferrer"
        />
        <BottomNavigationAction
          icon={<MailOutlineIcon style={footerStyles.icon} />}
          onClick={handleEmailClick}
        />
      </BottomNavigation>
    </>
  );
};

export default Footer;
