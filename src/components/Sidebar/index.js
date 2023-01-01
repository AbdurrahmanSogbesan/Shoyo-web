import React from "react";
import "./Sidebar.css";
import { elastic as Menu } from "react-burger-menu";

import Icon from "../Icon/Icon";
import { Badge, IconButton } from "@material-ui/core";

function Sidebar({ badgeContent = 0, children }) {
  return (
    <Menu
      right
      customBurgerIcon={
        <IconButton aria-label="cart">
          <Badge badgeContent={badgeContent} color="secondary" showZero>
            <Icon icon="cart" fill="#868686" width={35} height={35} />
          </Badge>
        </IconButton>
      }
    >
      {children}
    </Menu>
  );
}

export default Sidebar;
