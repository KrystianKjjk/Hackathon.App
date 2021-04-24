import { List } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppsIcon from "@material-ui/icons/Apps";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleIcon from "@material-ui/icons/People";
import React from "react";
import { getUserFromLocalStorage, loggerRole } from "../../app/utils";
import ItemLink from "../ItemLink";

export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: "20vw",
                maxWidth: 360,
                minWidth: 180,
                margin: "auto",
                backgroundColor: "transparent",
                color: "#fff",
                "& .MuiListItem-root": {
                    "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.56)",
                    },
                },
                "& .MuiListItemIcon-root": {
                    color: "inherit",
                },
            },
            span: {
                paddingLeft: "13px",
                float: "left",
                color: "#9E9E9E",
                fontSize: "14px",
            },
            userDiv: {
                borderBottom: "1px solid #666666",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginBottom: "1em"
            },
        })
    );

    const classes = useStyles();

    const role = loggerRole();
    const { user } = getUserFromLocalStorage();
    console.log("info", role);
    const VisibleOptions = () => {
        //@ts-ignore
        switch (role) {
            case "Admin":
                return (
                    <>
                        <ItemLink
                            path="/myprofil"
                            icon={<PeopleIcon />}
                            text="TWOJ PROFIL"
                        />
                        <ItemLink
                            path="/teamsManagement"
                            icon={<NotificationsIcon />}
                            text="CREATOR ZESPOŁÓW"
                        />
                        <ItemLink
                            path="/createScenario"
                            icon={<NotificationsIcon />}
                            text="CREATOR ZESPOŁÓW"
                        />
                        <ItemLink
                            path="/ranking"
                            icon={<AppsIcon />}
                            text="RANKING"
                        />
                        <ItemLink
                            path="/logout"
                            icon={<EmojiObjectsIcon />}
                            text="WYLOGUJ SIĘ"
                        />
                    </>
                );
            case "User":
                return (
                    <>
                        <ItemLink
                            path="/myprofil"
                            icon={<PeopleIcon />}
                            text="TWÓj PROFIL"
                        />
                        <ItemLink
                            path="/myteam"
                            icon={<NotificationsIcon />}
                            text="TWÓJA DRUŻYNA"
                        />
                        <ItemLink
                            path="/scenario"
                            icon={<AssignmentIcon />}
                            text="SCENARIUSZ GRY"
                        />
                        <ItemLink
                            path="/quest"
                            icon={<AssignmentIcon />}
                            text="QUEST"
                        />
                        <ItemLink
                            path="/ranking"
                            icon={<AppsIcon />}
                            text="RANKING"
                        />
                        <ItemLink
                            path="/logout"
                            icon={<EmojiObjectsIcon />}
                            text="WYLOGUJ SIĘ"
                        />
                    </>
                );
            default:
                return <List component="nav"></List>;
        }
    };

    return (
        <div className={classes.root}>
            <List component="nav">
                <div className={classes.userDiv}>
                    <AccountCircleIcon
                        style={{ paddingTop: 20, fontSize: 40 }}
                    ></AccountCircleIcon>
                    <p style={{ fontWeight: 500 }}>
                        {user?.name} {user?.surname}
                    </p>
                </div>
                <VisibleOptions />
            </List>
        </div>
    );
};

export default Menu;
