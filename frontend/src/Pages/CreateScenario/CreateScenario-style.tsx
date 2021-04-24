import styled from "styled-components";
import { TextField as MaterialText } from "@material-ui/core";

export const Container = styled.div``;
export const Header = styled.h2``;

export const Input = styled(MaterialText)`
    width: 80%;
    min-height: 150px;
    background-color: rgba(200, 200, 200, 0.6);
    margin: 20px;
    box-sizing: border-box;
    text-decoration: none;
`;
export const QuestElement = styled.div`
    font-weight: bold;
    margin: 10px;
    :hover {
        background-color: rgba(0, 0, 0.7);
        cursor: pointer;
    }
`;
export const QuestContainer = styled.div``;

export const style = {};

export default style;
