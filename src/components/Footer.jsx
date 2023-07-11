import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const footerStyles = {
  footer: {
    backgroundColor: "black",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: 0,
    zIndex: 999,
  },
  githubIcon: {
    color: "white",
  },
};

const Footer = () => {
  return (
    <>
      <div style={{ paddingBottom: "56px" }}></div>
      <BottomNavigation style={footerStyles.footer}>
        <BottomNavigationAction
          icon={<GitHubIcon style={footerStyles.githubIcon} />}
          href="https://github.com/abhimazumder"
          target="_blank"
          rel="noopener noreferrer"
        />
      </BottomNavigation>
    </>
  );
};

export default Footer;
