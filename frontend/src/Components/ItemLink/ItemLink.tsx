import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

export interface ListItemLinkProps {
    path: string;
    icon: React.ReactNode;
    text: string;
    textColor?: string;
}

const ItemLink = ({ path, icon, text, textColor }: ListItemLinkProps) => {
    const style = textColor !== undefined ? { color: textColor } : undefined;
    return (
        <ListItem button component={Link} to={path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} style={style} />
        </ListItem>
    );
};

export default ItemLink;
