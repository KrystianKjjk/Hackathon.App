import React, {useState, useEffect } from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { Grid} from "@material-ui/core";
import { Container } from './UserScenarioView-style'
import styleCss from './UserScenarioView.module.css';

interface UserScenarioViewProps {

}

const UserScenarioView: React.FC<UserScenarioViewProps> = () => {
    const [scenarioTitle, setCurrentScenarioTitle]=useState();
    const [scenarioDescription, setCurrentScenarioDescription]=useState();
    const [scenarioEndDate, setCurrentScenarioEndDate]=useState();
    const [loading, setLoading]=useState<boolean>(false);
    const id = localStorage.getItem('toRoute');
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://hackathon-backend-application.herokuapp.com/api/scenarios/${id}`);
            let data = await response.json();
            setCurrentScenarioTitle(data.name);
            setCurrentScenarioDescription(data.description);
            const dateString = moment.unix(data.endDate/1000).format("DD-MM-YYYY");
            //@ts-ignore
            setCurrentScenarioEndDate(dateString)
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchData()
    },[])

    return loading ? (<p>Loading...</p>):(
    <Container className={styleCss.container}>
        <Grid container direction="row">
                <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                >
                    <Container >
                         <Typography className={styleCss.title} variant="h2">{"Aktualny scenariusz: "}</Typography>
                         <Typography className={styleCss.title} variant="h3">{scenarioTitle}</Typography>
                    </Container>
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                >
                    <Container>
                         <Typography className={styleCss.description} variant="h2">{scenarioDescription}</Typography>
                    </Container>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                >
                    <Container>
                         <Typography className={styleCss.description} variant="h2"> Ten scenariusz zakończy się <strong>{scenarioEndDate}</strong>. Współpracuj ze swoją drużyną, aby osiągnąć sukces.</Typography>
                    </Container>
                </Grid>
            </Grid>
    </Container>
    )
    }


    export default UserScenarioView