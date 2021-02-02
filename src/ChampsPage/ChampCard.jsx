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
    height:500,
    backgroundColor: "#f5f5f5",
    margin: "0 auto"
},
title:{
    fontSize: 20,
    color: "#000",
    textAlign: "center"
},
img:{
    width: "100%",
    maxHeight: "400px"
},
contImg:{
    padding: 10,
    textAlign: "center"
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
               
                    <Fragment>
                         <Typography className={classes.title}>{champ.nombre}</Typography>
                         <Typography>Categoria: {champ.categoria}</Typography>
                        <Grid item className={classes.contImg}>
                        <img src={imagen} className={classes.img} alt="portada campeonato" />
                        </Grid>
                        <Typography>Precio de incripcion: ${champ.precio}</Typography>
                        <Typography>Inscripciones hasta: {fecha}</Typography>
                    </Fragment>
          
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
