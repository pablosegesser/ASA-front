import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import {alertActions} from '../_actions/alert.actions'
import { userActions } from '../_actions';
import {campeonatosActions} from '../_actions/campeonatos.actions';
import {Grid, Button, makeStyles, Typography, TextField} from '@material-ui/core';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { GetDimensions } from '../_helpers';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './carousel.css';
import { ChampCard } from './ChampCard';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { ChampDetaills } from './ChampDetaills';
import {Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {
    DatePicker,
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
  import { es } from "date-fns/locale";
  import moment from 'moment';
  import {ChampsTest} from './ChampsTest';




export const champsPage = () => {
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
        getAlllChamps();
        getAlll();
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
    function handleEditChamp1(user, index){
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
                id: user.id,
                index: index
            });


    }
    const handleClosing = ()=>{
        setEditchamp({
            open:false
        })
        
    }
    const handleClosingAdd = ()=>{
        setopenAdd(false)
        
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
 const useStyles = makeStyles((theme) => ({
    sliderSection: {
      height:550, 
      width: 1100,
      [theme.breakpoints.down('sm')]: {
        width: 300
      },
      [theme.breakpoints.up(1450)]:{
        width: 1300
      }
    },
    paddLeft:{
        paddingLeft: 20
    }
}));

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
           getAlll();
         }, 300);
        }
       
 }
const [subcat,setSubcat] = useState({
    nombre:'',
    genero:'',
    inscriptos:[]
});

const [subcatIns,setSubcatIns] = useState({
    nombre:'',
    genero:'',
    inscriptos:[]
});

const handleSuscribeSub = (champ,subcate,genero)=>{

        const subcatArray =champ.subcategorias.slice();   
       for(var i = 0; i < subcatArray.length; i++) {  
               if (subcatArray[i].nombre == subcate) {
                const inscriptosArray =subcatArray[i].inscriptos.slice();      
                inscriptosArray.push(inscripto);
                setSubcatIns({
                    nombre: subcate,
                    genero: genero,
                    inscriptos: inscriptosArray
                })
                updateChamps({
                    subcategorias: subcatIns,
                    id:champ.id
                })
                
                   }else{
                    dispatch(alertActions.error('No existe una categoria con ese nombre'));
                   }
           } 
      
       
     const visible = JSON.stringify(inscripto);
      console.log('inscripto '+visible);
      setTimeout(() => {    
       getAlllChamps();
     }, 300);
    
   
}
 const handleAddSubCategory = (champ,subcatName,subcatGenere)=>{

let name = subcatName;
let genere = subcatGenere
if(name !== '' && genere !== ''){

    setSubcat({ ...subcat,
        nombre: subcatName,
        genero: subcatGenere
    })   


    if(subcat.nombre !== '' && subcat.genero !== ''){
        const subcatArray =champ.subcategorias.slice();
        let found = false;   
       for(var i = 0; i < subcatArray.length; i++) {  
               if (subcatArray[i].nombre == subcatName) {
                   dispatch(alertActions.error('Ya existe una subcategoria con ese nombre'));
                   found= true;
                   break;
                   }
           } 
       if(!found){
           subcatArray.push(subcat);
           updateChamps({
               subcategorias:subcatArray,
               id: champ.id
           });
           }
       
     const visible = JSON.stringify(subcat);
      console.log('subcategory '+visible);
      setTimeout(() => {    
       getAlllChamps();
     }, 300);
    }
   }
}



 const classes = useStyles();
 const dimensions = GetDimensions();
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
const [date, setDate] = useState(new Date());

 const renderSelections = () => {
      const champs = campeonatos.items;
      return champs.map((element, idx) => {
        return (
          <Slide key={element.id}>
            <ChampCard champ={element} />
          </Slide>
        );
      });
    
  }
  if(campeonatos.items){
      const length = campeonatos.items.length;
      console.log('lenght '+length);
  }
  const [detaills, setDetaill] = useState(false);


 


  
    return (
        <Grid container className={classes.paddLeft}>
                <h3>Todos los Campeonatos:</h3>
                
                <CarouselProvider
              naturalSlideWidth={260}
              naturalSlideHeight={500}
              totalSlides={campeonatos.items ? campeonatos.items.length: ''}
              visibleSlides={dimensions >= 768 ? 3 : 1}
             
            >
           
           {campeonatos.loading && <em>Loading champs...</em>}
            {campeonatos.error && <span className="text-danger">ERROR: {campeonatos.error}</span>}
            {loading ? <em>Loading champs...</em> : ''}

              {campeonatos.items &&
                   <Slider className={classes.sliderSection}>
                    {campeonatos.items.map((user, index) =>
                        <Slide key={user.id}>
                          <ChampCard champ={user} />
                          {user.deleting ? <em> - Deleting...</em>
                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                            : <div><span><a onClick={() => handleDeleteChamp(user.id)} className="text-primary">Borrar</a></span><span> - <a onClick={() => handleEditChamp(user,index)} className="text-primary">Edit</a></span></div>}
                            
                        </Slide>
                    
                    )}

                </Slider>
                
                
            }
                
                 
              
              <Grid container direction={"row"} justify={"space-between"}>
                <ButtonBack style={{border:"1px solid #0FC42D", borderRadius: 20, height: 50, width: 50}}> <ArrowLeft style={{color:"#0FC42D", fontSize: 25}}/> </ButtonBack>
                <ButtonNext style={{border:"1px solid #0FC42D", borderRadius: 20, height: 50, width: 50}}> <ArrowRight style={{color:"#0FC42D", fontSize: 25}} /> </ButtonNext>
              </Grid>
            </CarouselProvider>
            <Grid container>
         <Grid item xs={12}>
             <Typography variant="h5">ADMIN PANEL <br /> si estas viendo esto eres Administrador del sitio</Typography>
            <Grid item>
            <Button variant="contained" color="primary" onClick={openAdding}>Agregar +</Button>
            </Grid>
           
           
               {openAdd == true && 

                <Grid item xs={12}>
                    <h3>Agregando Campeonato...</h3>
                    <form onSubmit={handleSubmitChampsNew}>
                        <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" onChange={handleChangeChamps}  className="form-control"></input>
                        </div>
                        <div className="form-group">
                        <label>Fecha</label>
                        <input type="text" name="fecha" onChange={handleChangeChamps}  className="form-control"></input>
                        </div>
                        <div className="form-group">
                        <label>Lugar</label>
                        <input type="text" name="lugar" onChange={handleChangeChamps}  className="form-control"></input><br></br>
                        </div>
                        <div className="form-group">
                        <label>Descripcion</label>
                        <input type="text" name="descripcion" onChange={handleChangeChamps} className="form-control"></input><br></br>
                        </div>
                        <div className="form-group">
                        <label>Categoria</label>
                        <input type="text" name="categoria" onChange={handleChangeChamps} className="form-control"></input><br></br>
                        </div>
                        <div className="form-group">
                        <label>Genero</label>
                        <input type="text" name="genero" onChange={handleChangeChamps} className="form-control"></input><br></br>
                        </div>
                        <div className="form-group">
                        <label>Fecha hasta</label>
                        <input type="date" name="fechaHasta" onChange={handleChangeChamps} className="form-control"></input><br></br>
                        </div>
                        <div className="form-group">
                        <label>Precio</label>
                        <input type="number" name="precio" onChange={handleChangeChamps} className="form-control"></input><br></br>
                        </div>
                        <div className="form-group">
                        <label>Url de Imagen</label>
                        <input type="text" name="image" onChange={handleChangeChamps} className="form-control"></input><br></br>
                        </div>
                        <button onClick={handleClosingAdd} className="btn btn-primary" style={{margin: "10px"}}>Cancel</button>        
                        <button type="submit" className="btn btn-primary" style={{margin: "10px"}}>Guardar</button>
                        
                        </form>
                </Grid>
                        }
                        {campeonatos.items &&
                                    <Grid item className="col-lg-4 offset-lg-4">
                                    {campeonatos.items.map((user, index) =>
                                    <div key={user.id}>
                                            {editchamp.open == true && editchamp.id == user.id &&
                                        <div>
                                             <h3>Editando... {user.nombre}</h3>
                                        <form onSubmit={handleSubmitChampsUpdate}>
                                        <div className="form-group">
                                        <label>Nombre</label>
                                        <input type="text" name="nombre" onChange={handleChangeChampsUpdate} defaultValue={user.nombre} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                        <label>Fecha</label>
                                        <input type="text" name="fecha" onChange={handleChangeChampsUpdate} defaultValue={user.fecha} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                        <label>Lugar</label>
                                        <input type="text" name="lugar" onChange={handleChangeChampsUpdate} defaultValue={user.lugar} className="form-control"></input><br></br>
                                        </div>
                                        <div className="form-group">
                                        <label>Descripcion</label>
                                        <input type="text" name="descripcion" onChange={handleChangeChampsUpdate} defaultValue={user.descripcion} className="form-control"></input><br></br>
                                        </div>
                                        <div className="form-group">
                                        <label>Categoria</label>
                                        <input type="text" name="categoria" onChange={handleChangeChampsUpdate} defaultValue={user.categoria} className="form-control"></input><br></br>
                                        </div>
                                        <div className="form-group">
                                        <label>Genero</label>
                                        <input type="text" name="genero" onChange={handleChangeChampsUpdate} defaultValue={user.genero} className="form-control"></input><br></br>
                                       
                                        </div>
                                        <div className="form-group">
                                        <label>Fecha hasta</label>
                                        <input type="date" name="fechaHasta" onChange={handleChangeChampsUpdate} defaultValue={moment(user.fechaHasta).format('DD-MM-YYYY')} className="form-control"></input><br></br>
                                       
                                        </div>
                                        <div className="form-group">
                                        <label>Precio</label>
                                        <input type="number" name="precio" onChange={handleChangeChampsUpdate} defaultValue={user.precio} className="form-control"></input><br></br>
                                        </div>
                                        <div className="form-group">
                                        <label>Url de Imagen</label>
                                        <input type="text" name="image" onChange={handleChangeChampsUpdate} defaultValue={user.image} className="form-control"></input><br></br>
                                        </div>
                                        <button onClick={handleClosing} className="btn btn-primary" style={{margin: "10px"}}>Cancel</button>        
                                        <button type="submit" className="btn btn-primary" style={{margin: "10px"}}>Guardar</button>
                                        
                                        </form>
                                        
                                        </div>
                                    
                                        }
                                        </div>
                                            
                                    
                                    )}
                               </Grid>
                  
                    
                        }


         </Grid>
     </Grid>
   
          <ChampsTest />
        </Grid>
       
    )
}
