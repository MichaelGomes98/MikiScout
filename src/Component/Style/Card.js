import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {
  Link
} from "react-router-dom";

export default function Card(props) {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    }),
  );

  const classes = useStyles();




  return(

  <div className={classes.root} style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width:"100"}}>
  <Link style={{textDecoration: "none"}}
     to={{pathname: '/detail', state:{ vehicule:props.vehicule} }}
  >
    <Paper  style={{ width: '80%', margin:"auto", cursor:'hand'}}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {props.objet.marque} {props.objet.modele}
              </Typography>
              <Typography variant="body2" gutterBottom>

              </Typography>
              <Typography variant="body2" color="textSecondary">
                {props.objet.kilometre} km / {props.objet.annee}
              </Typography>
            </Grid>
          </Grid>
          <Grid item style={{marginRight:"2%"}}>
            <Typography variant="subtitle1" >{props.objet.prix}.-</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Link>
    <br/>
    <br/>
  </div>
)
}
