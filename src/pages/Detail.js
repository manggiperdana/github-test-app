import React,{useEffect, useState} from 'react';
import {useParams,Redirect} from 'react-router-dom';
import marked from "marked";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinkBottom from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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

function Detail() {
    const classes = useStyles();
    const [fileData, setFileData] = useState('');
    const [backProfile, setBackProfile] = useState(false);
    let { username } = useParams();
    let { repo } = useParams();

    useEffect(() => {
        
        // Get MD
        fetch('https://raw.githubusercontent.com/'+username+'/'+repo+'/master/README.md')
        .then(response => response.text())
        .then(text => {
            setFileData(marked(text))
        });
    },[]);

    if (backProfile) {
        return <Redirect to={`/profile/${username}`} />
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Main */}
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => setBackProfile(true)}>
                            Back
                        </Button>
                        </Grid>
                    </Grid>
                    <br />
                </div>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <section>
                            <article dangerouslySetInnerHTML={{__html: fileData}}></article>
                        </section>
                    </Container>
                </div>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    )
}

export default Detail