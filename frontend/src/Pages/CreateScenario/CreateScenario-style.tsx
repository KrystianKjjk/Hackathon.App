import styled from "styled-components";
import { TextField as MaterialText } from "@material-ui/core";

export const Container = styled.div`
    position: relative;
    height: 95vh;
    align-items: center;
    display: flex;
    flex-direction: column;
`;
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
export const BottomButton = styled.button`
    position: absolute;
    bottom: 2%;
    align-self: center;
`;
export const QuestContainer = styled.div`
    background-color: rgba(200, 200, 200, 0.6);
    width: 76%;
    margin: 10px;
    padding: 10px;
    align-self: center;
`;

export const style = {};

export default style;
