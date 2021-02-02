import React, {useState, useEffect, Fragment} from 'react';
import {Paper, Typography, makeStyles, Grid, Button} from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector, useDispatch} from 'react-redux';
import {campeonatosActions} from '../_actions/campeonatos.actions'
import {userActions} from '../_actions/user.actions';
import {alertActions} from '../_actions/alert.actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@material-ui/core";



const useStyles = makeStyles((theme) =>({
    paper:{
        width:"90%",
        height:400,
        backgroundColor: "#f5f5f5",
        margin: "0 auto"
    },
    title:{
        fontSize: 20,
        color: "#000",
        textAlign: "center"
    },
    img:{
        width: "100%"
    },
    center:{
        textAlign: "center"
    },
    marker:{
        position: "absolute",
        width: "40px",
        height: "40px",
        left: "-20px",
        top: "-20px",
        border: "5px solid #f44336",
        borderRadius: "40px",
        backgroundColor: "white",
        textAlign: "center",
        color: "#3f51b5",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "4px"
    }
    
    
    
    
    }));

export const ChampDetaills = ({champ}) => {

    const users = useSelector(state => state.users);
    const campeonatos = useSelector(state => state.campeonatos);
    const user = useSelector(state => state.authentication.user);
    const userCurrent = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const [edit,setEdit] = useState({
        open:false,
        id:''
    });
    const [editchamp,setEditchamp] = useState({
        open:false,
        id:''
    });
    const [loading, setloading] = useState();
    const [openAdd, setopenAdd] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [champs, setchamps] = useState({
        nombre:'',
        fecha:'',
        lugar:'',
        descripcion: '',
        id: ''
    });
    const [champsNew, setchampsNew] = useState({
        nombre:'',
        fecha:'',
        lugar:'',
        descripcion: ''
    });
    const [error, seterror] = useState(false);
    const [search, setSearch] = useState();
    const [newUser, setNewUser] = useState({
        firstName:'',
        lastName: '',
        username: '',
        id:'',
        dateOfBirth:''
    });
    const [inscripto, setInscripto] = useState({
        nombre:'',
        apellido:'',
        edad: '',
        id:''
    });
    const [suscribed, setSuscribed] = useState();

    useEffect(() => {
        handleCheckSuscription(champ);
        setInscripto({
            nombre: user.firstName,
            apellido: user.lastName,
            edad: 20,
            id: user.id
        });
    }, []);

    function getAlllChamps(){
        dispatch(campeonatosActions.getAll());
    }
    

    function getAlll(){
        dispatch(userActions.getAll());
    }
    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }
    function handleDeleteChamp(id) {
        dispatch(campeonatosActions.delete(id));
    }
    function handleSearchById(id){
        dispatch(userActions.get_by_id(id));
    }
    function handleUpdate(user){
        dispatch(userActions.update_user(user));
       
    }
    function handleChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewUser({ ...newUser,
      [name]: value
    });
    }
    function handleEdit(id){
        console.log('iddddd  '+id);
        setNewUser({
            id
        });
        setEdit(
            {
                open:true, 
                id: id
            });

    }
    function handleEditChamp(user){
        console.log('iddddd  '+user.id);
        setchamps({...champs,
            descripcion: user.descripcion,
            lugar: user.lugar,
            fecha: user.fecha,
            nombre: user.nombre,
            id: user.id
        });
        setEditchamp(
            {
                open:true, 
                id: user.id
            });

    }
    function loadingClose(bool){
        setloading(bool); 
    }

    function handleSubmit(e){
        loadingClose(true);
       e.preventDefault();
      let objectUser = JSON.stringify(newUser);
      let objectUser1 = JSON.stringify(users);
      // console.log('jajajaj'+objectUser);
       handleUpdate(newUser);
       setEdit({
        open: false
    });
       console.log('newUser '+objectUser);
       console.log('Users '+objectUser1);
       setTimeout(() => {    
        getAlll();
        loadingClose(false);
      }, 300);

     
      
    }
function close(){
    setEdit({
        open: false
    })
}

const changeSearch = (e) =>{
    const target = e.target;
    const value = target.value;
    //const name = target.name;

    setSearch(value);
}

const submitSearch = (e)=>{
    e.preventDefault();
    setSubmitted(true);
    if(search !== ''){
        handleSearchById(search);
    }else{
        seterror(true);
    }
    
}

const refresh = () =>{
    setSearch('');
    document. getElementById('searchInput').value='';
    getAlll();
    seterror(false);
    setSubmitted(false);
}
 const addChamp = (champ) =>{
    dispatch(campeonatosActions.register(champ));
 }
 const updateChamps = (champ)=>{
     dispatch(campeonatosActions.update_user(champ));
 }

 const handleChangeChamps = (e) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setchampsNew({...champsNew,
      [name]: value
    });
 }
 const handleChangeChampsUpdate = (e) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setchamps({ ...champs,
      [name]: value
    });
 }
 const openAdding = ()=>{
     setopenAdd(!openAdd);
 }

 const handleSubmitChampsNew = (e) =>{
    e.preventDefault();
    console.log('champnew '+champsNew);
    if (champsNew.nombre !== '' && champsNew.fecha !== '' && champsNew.lugar !== '' && champsNew.descripcion !== '') {
       dispatch(campeonatosActions.register(champsNew));
    }else{
        console.log('no entro');
    }
    setTimeout(() => {    
        getAlllChamps();
        getAlll();
      }, 300);
 }

 const handleSubmitChampsUpdate = (e) =>{
    e.preventDefault();
    updateChamps(champs);
    setTimeout(() => {    
        getAlllChamps();
        getAlll();
      }, 300);

    
 }


 const handleSuscribe = (champ)=>{

       
        if(inscripto.nombre !== '' && inscripto.apellido !== '' && inscripto.edad !== ''){
            const inscriptosArray =champ.inscriptos.slice();
            let found = false;   
           for(var i = 0; i < inscriptosArray.length; i++) {  
                   if (inscriptosArray[i].nombre == inscripto.nombre && inscriptosArray[i].apellido == inscripto.apellido) {
                       dispatch(alertActions.error('Ya existe inscripto con ese nombre y apellido'));
                       found= true;
                       break;
                       }
               } 
           if(!found){
               inscriptosArray.push(inscripto);
               updateChamps({
                   inscriptos:inscriptosArray,
                   id: champ.id
               });
               }
           
         const visible = JSON.stringify(inscripto);
          console.log('inscripto '+visible);
          setTimeout(() => {    
           getAlllChamps();
         }, 300);
        }
       
 }

 const handleSuscribeSubcategory = (champ,subcaterory)=>{

       let Sub = subcategory;
    if(inscripto.nombre !== '' && inscripto.apellido !== '' && inscripto.edad !== ''){
        const SubCategoriasArray =champ.subcategorias.slice();
        let found = false;   
       for(var i = 0; i <  SubCategoriasArray.length; i++) {  
               if ( SubCategoriasArray[i].nombre == Sub) {
                   const ins = SubCategoriasArray[i].inscriptos.slice();
                   for(var u =0; u < ins; u++){
                    if ( ins[u].nombre == inscripto.nombre && ins[u].apellido == inscripto.apellido){
                        dispatch(alertActions.error('Ya existe inscripto con ese nombre y apellido en la categoria '+Sub));
                        found= true;
                        break;
                    }
                   }
                  
                   }
           } 
       if(!found){
        SubCategoriasArray[u].inscriptos.push(inscripto);
        updateChamps({
            subcategorias: SubCategoriasArray[u].inscriptos,
            id: champ.id
        });
           }
       
     const visible = JSON.stringify(inscripto);
      console.log('inscripto '+visible);
      setTimeout(() => {    
       getAlllChamps();
     }, 300);
    }
   
}
const handleAddSubCategory = ()=>{
    

}
 const [suscribed1, setSuscribed1] = useState(false);

 const handleCheckSuscription = (champ)=>{
    if(userCurrent.nombre !== '' && userCurrent.apellido !== '' && userCurrent.edad !== ''){
        const inscriptosArray =champ.inscriptos.slice();   
       for(var i = 0; i < inscriptosArray.length; i++) {  
               if (inscriptosArray[i].id == userCurrent.id) {
                  // dispatch(alertActions.error('Ya existe inscripto con ese nombre y apellido'));
                  setSuscribed1(!suscribed1);
                   break;
                   }
           }    
    }
}

 const classes = useStyles();
 //const dimensions = GetDimensions();
 const deleteIncripcion = (id, champ)=>{
    console.log('user '+id);

    const inscriptosArray =champ.inscriptos.slice();
    const filtradoArray = inscriptosArray.filter( ins => ins.id !== id);

   updateChamps({
       inscriptos:filtradoArray,
       id: champ.id
   })
   console.log('inscripto '+inscripto);
   setTimeout(() => {    
    getAlllChamps();
    getAlll();
  }, 300);
 }





    
   

    const AnyReactComponent = ({ text }) => <div className={classes.marker}>{text}</div>;

    const props = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };

      const [openDialog, setOpenDialog] = useState(false);
      const handleClose = () =>{
          setOpenDialog(!openDialog);
      }
      const handleOpen = () =>{
          setOpenDialog(!openDialog);
      }
      

    return (
        <Grid container>
                <Paper className={classes.paper} elevation={0}>
                <Grid item xs={12}>
                    <Typography className={classes.title}>Detalles del campeonato</Typography>
                        <Grid container flex-direction="column" className={classes.center}>
                        <Grid item xs={12}>
                            <Typography>Nombre: {champ.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <Typography>Lugar: {champ.lugar}</Typography>
                            </Grid>
                            <Grid item xs={12}>   
                                <Typography>Fecha:{champ.fecha}</Typography>   
                            </Grid>
                            <Grid item xs={12}>
                            <Typography> Descripcion: {champ.descripcion}</Typography>
                            </Grid>
                          
                           {suscribed1 ? <Button disabled>Inscripto</Button> :<Button onClick={()=>handleSuscribe(champ)}>Inscribirse</Button>}
                            <Button onClick={()=>handleOpen(true)}>Ver Inscriptos</Button>

                                        <h3>Ubicacion</h3>
                            <div style={{ height: '40vh', width: '100%' }}>
                                <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyB82FFgUCUaHMb1Seaot3aNM8iZoO0RHEk' }}
                                defaultCenter={props.center}
                                defaultZoom={props.zoom}
                                >
                                <AnyReactComponent
                                    lat={59.955413}
                                    lng={30.337844}
                                    text="X"
                                />
                                </GoogleMapReact>
                            </div>
                        </Grid>
                </Grid>
                </Paper>
                <Dialog open={openDialog} onClose={()=>handleClose()}>
                    <DialogTitle>
                                    Inscriptos
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>apellido</TableCell>
                                        <TableCell>edad</TableCell>
                                        {/*<TableCell>id</TableCell>*/}
                                        <TableCell></TableCell>
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                {champ.inscriptos.map((inscripto)=>
                                 <TableRow key={inscripto._id}>
                                     <TableCell>
                                     {inscripto.nombre}
                                     </TableCell>
                                     <TableCell>
                                     {inscripto.apellido}    
                                     </TableCell>
                                    <TableCell>
                                    {inscripto.edad}
                                    </TableCell>
                                    {/*<TableCell>
                                    {inscripto.id}
                                    </TableCell>*/}
                                    <TableCell>
                                    {userCurrent.id == inscripto.id ? <button className="btn btn-primary" onClick={()=>deleteIncripcion(inscripto.id, champ)}>Quitar inscripción</button> : ''}
                                    </TableCell>

                                  
                                 </TableRow>
                                
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                   
                               
                                
                    </DialogContent>
                </Dialog> 


        </Grid>

    



    )
}
