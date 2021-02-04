import React, { Fragment, useState } from 'react';
import {Paper, Typography, makeStyles, Grid, Button} from '@material-ui/core';
import {Slide} from 'pure-react-carousel';
import image from '../assets/imagen1.jpg';
import {ChampDetaills} from './ChampDetaills';
import { useHistory } from "react-router-dom";
import moment from 'moment';


 

const useStyles = makeStyles((theme) =>({
paper:{
    width:"90%",
    height:550,
    backgroundColor: "#f5f5f5",
    padding:20,
    margin: "0 auto",
    overflowY:"auto",
    [theme.breakpoints.down('xs')]:{
        width:"100%"
    }
},
title:{
    fontSize: 26,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold"
},
img:{
    maxWidth: "320px",
    maxHeight: "320px",
    [theme.breakpoints.down('xs')]:{
        maxWidth:"100%"
    }
},
contImg:{
    padding: 10,
    textAlign: "center"
},
center:{
    textAlign:"center"
}




}));

export const ChampCard = ({champ}) => {
    const [detaills, setDetaill] = useState(false);

    const history = useHistory();

const imagen = champ.image ? champ.image : image;
    
const fecha = moment(champ.fechaHasta).format('DD-MM-YYYY');

    const classes =useStyles(); 
    const renderChamps = () =>{
        if(!detaills){
            return(
               
                    <Grid className={classes.center}>
                         <Typography className={classes.title}>{champ.nombre}</Typography>
                         <Typography><strong>Categoria:</strong> {champ.categoria}</Typography>
                        <Grid item className={classes.contImg}>
                        <img src={imagen} className={classes.img} alt="portada campeonato" />
                        </Grid>
                        <Typography><strong>Precio de incripcion:</strong> ${champ.precio}</Typography>
                        <Typography><strong>Inscripciones hasta:</strong> {fecha}</Typography>
                    </Grid>
          
            );
        }else{
            return(
                <Fragment>
                    
                     <ChampDetaills champ={champ} />
                </Fragment>
               
            );
        }
    }

    return (
           
        <Paper className={classes.paper}>
             <Button variant="contained" color="primary" onClick={()=>setDetaill(!detaills)}>{detaills ? 'Volver' : 'Ver detalles'}</Button>
              {renderChamps()}
            
          </Paper> 
        
    )
}
