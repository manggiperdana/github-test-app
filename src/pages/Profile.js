import React, {useEffect, useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinkBottom from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

function Copyright() {
    return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Dev by '}
        <LinkBottom color="inherit" href="https://gieperdana.site/">
          Gie
        </LinkBottom>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  
  const cards = [1, 2, 3];

function Profile() {

    const classes = useStyles();
    const [profileData, setProfileData] = useState({});
    const [repoData, setRepoData] = useState([]);
    const [backHome, setBackHome] = useState(false);
    let { username } = useParams();

    useEffect(() => {
        
        // Profile Git
        fetch('https://api.github.com/users/' + username)
        .then(response => response.json())
        .then(data => {
            if(data.message !== 'Not Found'){
                setProfileData(data)
                // console.log(data)
            }
        });

        // Repos List
        fetch('https://api.github.com/users/' + username + '/repos')
        .then(response => response.json())
        .then(data => {
            if(data.message !== 'Not Found'){
                setRepoData(data)
                console.log(data)
            }
        });
    },[]);

    if (backHome) {
        return <Redirect to={`/`} />
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                <Container maxWidth="sm">

                    <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                    {profileData.name}
                    </Typography>

                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Company : {profileData.company}
                    </Typography>

                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Bio : {profileData.bio}
                    </Typography>

                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Location : {profileData.location}
                    </Typography>

                    <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => setBackHome(true)}>
                            Back
                        </Button>
                        </Grid>
                    </Grid>
                    </div>
                </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {repoData.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={card.owner.avatar_url}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {card.name}
                            </Typography>
                            <Typography>
                            {card.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={`/detail/${username}/${card.name}`}>
                                <Button size="small" color="primary">
                                View Readme
                                </Button>
                            </Link>
                            {/* <Button size="small" color="primary">
                            Edit
                            </Button> */}
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    )
}

export default Profile