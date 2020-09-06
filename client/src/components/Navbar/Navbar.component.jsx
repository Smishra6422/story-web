import React, { useState } from "react";
import "./navbar.style.scss";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../Auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
}));

const Navbar = ({ history }) => {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);

  const displayNavbar = () => {
    setFlag(!flag);
  };

  return (
    <div className="navbar-container ">
      <div className="navbar-logo">
        <Link to="/">
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            style={{ height: "2.4rem" }}
          >
            SW
          </Avatar>
        </Link>
        <Link>
          {/* <i class="fas fa-bars"></i> */}
          <IconButton aria-label="share" onClick={displayNavbar}>
            <MenuIcon />
          </IconButton>
        </Link>
      </div>
      <div className={flag ? "navbar-lnks" : "hide-navbar-links"}>
        <ul className="navbar-item">
          <li className="navbar-item-list">
            <Link to="/">All Story</Link>
          </li>
          {!isAuthenticated() && (
            <li className="navbar-item-list">
              <Link to="/signin">Login</Link>
            </li>
          )}
          {!isAuthenticated() && (
            <li className="navbar-item-list">
              <Link to="/signup">Signup</Link>
            </li>
          )}

          {isAuthenticated() && (
            <li className="navbar-item-list">
              <Link to="/addstory">Add Story</Link>
            </li>
          )}

          {isAuthenticated() && (
            <li className="navbar-item-list">
              <Link
                onClick={() => {
                  signout(() => {
                    history.push("/signin");
                  });
                }}
              >
                Signout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
