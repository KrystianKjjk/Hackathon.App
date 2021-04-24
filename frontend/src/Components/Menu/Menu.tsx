import { List } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import AddIcon from "@material-ui/icons/Add";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import PeopleIcon from "@material-ui/icons/People";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PersonIcon from "@material-ui/icons/Person";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { getUserFromLocalStorage, loggerRole } from "../../app/utils";
import ItemLink from "../ItemLink";

export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: "20vw",
                minWidth: 180,
                marginVertical: "auto",
                backgroundColor: "rgba(0,0,0,0.35)",
                color: "#fff",
                "& .MuiListItem-root": {
                    "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.35)",
                    },
                },
                "& .MuiListItemIcon-root": {
                    color: "inherit",
                },
            },
            span: {
                paddingLeft: "13px",
                float: "left",
                color: "black",
                fontSize: "1.5em",
                fontWeight: "bold",
            },
            userDiv: {
                borderBottom: "1px solid #666666",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginBottom: "1em",
            },
        })
    );

    const classes = useStyles();

    const role = loggerRole();
    const { user } = getUserFromLocalStorage();
    const VisibleOptions = () => {
        //@ts-ignore
        switch (role) {
            case "Admin":
                return (
                    <>
                        <ItemLink
                            path="/myprofil"
                            icon={<PersonIcon />}
                            text="TWOJ PROFIL"
                        />
                        <ItemLink
                            path="/teamsManagement"
                            icon={<AddIcon />}
                            text="KREATOR ZESPOŁÓW"
                        />
                        <ItemLink
                            path="/scenario"
                            icon={<MenuBookIcon />}
                            text="SCENARIUSZE"
                        />
                        <ItemLink
                            path="/ranking"
                            icon={<AssistantPhotoIcon />}
                            text="RANKING"
                        />
                        <ItemLink
                            path="/logout"
                            icon={<ExitToAppIcon />}
                            text="WYLOGUJ SIĘ"
                            textColor={"#244E9F"}
                            
                        />
                    </>
                );
            case "User":
                return (
                    <>
                        <ItemLink
                            path="/myprofil"
                            icon={<PersonIcon />}
                            text="TWÓj PROFIL"
                        />
                        <ItemLink
                            path="/myteam"
                            icon={<PeopleIcon />}
                            text="TWÓJA DRUŻYNA"
                        />
                        <ItemLink
                            path="/scenario"
                            icon={<MenuBookIcon />}
                            text="SCENARIUSZ GRY"
                        />
                        <ItemLink
                            path="/quest"
                            icon={<FlashOnIcon />}
                            text="QUEST"
                        />
                        <ItemLink
                            path="/ranking"
                            icon={<AssistantPhotoIcon />}
                            text="RANKING"
                        />
                        <ItemLink
                            path="/logout"
                            icon={<ExitToAppIcon />}
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
                    />
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
