import React, { Fragment, useEffect, useState } from 'react';
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




export const ChampsTest = () => {
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

        dispatch(alertActions.clear());

        getAlllChamps();
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


const setInscriptoss = (arr,gen,name)=>{
    setSubcatIns({
        ...subcatIns,
        nombre: name,
        genero: gen,
        inscriptos: arr
    }, );
}

const updateNow = (champ,i)=>{
    updateChamps({
        subcategorias:subcatIns,
        id:champ.id
    });
}
const fireClick = (e)=>{
    e.preventDefault();
    updateNow(champ)
}
const handleSuscribeSub =(champ,subcate,genero,index)=>{

    const subcatArray =champ.subcategorias.slice();   
       for(var i = 0; i < subcatArray.length; i++) {  
               if (subcatArray[i].nombre == subcate && subcatArray[i].genero == genero) {
                const inscriptosArray =subcatArray[i].inscriptos.slice();
                let found = false;
                for(var u =0; u < inscriptosArray.length;u++){
                    if(inscriptosArray[u].nombre == inscripto.nombre && inscriptosArray[u].apellido == inscripto.apellido){
                        dispatch(alertActions.error('Ya existe un usuario inscripto con el mismo nombre y apellido'));
                        found = true;
                        break;
                    }
                }
                
                if(!found){
                    inscriptosArray.push(inscripto);
                    if(index == i){
                        console.log('for innecesario!!!');
                    }
                    subcatArray[i].inscriptos = inscriptosArray;
                    updateChamps({
                        subcategorias:subcatArray,
                        id:champ.id
                    });
                    const visible1 = JSON.stringify(subcatArray);
                    const visible12 = JSON.stringify(inscriptosArray);
                    console.log('inscriptos en '+ champ.nombre+': '+visible12+' y sus subcategoria son '+visible1)
                   
                }
               
                   }
           } 
      
       
     const visible = JSON.stringify(inscripto);
      console.log('inscripto '+visible);
      setTimeout(() => {    
       getAlllChamps();
     }, 300);
    
   
}
const handleSuscribeSub1 =(champ,subcate,genero,index)=>{

    const subcatArray =champ.subcategorias.slice();     
               if (subcatArray[index].nombre == subcate) {
                const inscriptosArray =subcatArray[index].inscriptos.slice();      
                inscriptosArray.push(inscripto);
                setSubcatIns({
                    ...subcatIns,
                    nombre: subcate,
                    genero: genero,
                    inscriptos: inscriptosArray
                });
                updateChamps({
                    subcategorias:[...champ.subcategorias, subcatIns],
                    id:champ.id
                });
                const visible1 = JSON.stringify(subcatIns);
                console.log('inscriptos en '+champ.nombre+' '+visible1)
                
                   }else{
                    dispatch(alertActions.error('No existe una categoria con ese nombre'));
                   }
           
      
       
     const visible = JSON.stringify(inscripto);
      console.log('inscripto '+visible);
      setTimeout(() => {    
       getAlllChamps();
     }, 300);
    
   
}


const handleSetSubcat = (champ)=>{


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
               if (subcatArray[i].nombre == subcatName && subcatArray[i].genero == subcatGenere) {
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

 const deleteIncripcionSub = (id, champ,index)=>{
    console.log('user '+id);
    const subcatArray = champ.subcategorias.slice();
    const inscriptosArray =champ.subcategorias[index].inscriptos.slice();
    const filtradoArray = inscriptosArray.filter( ins => ins.id !== id);

    subcatArray[index].inscriptos=filtradoArray;
   updateChamps({
       subcategorias:subcatArray,
       id: champ.id
   })
   console.log('quitar inscripcion '+inscripto);
   setTimeout(() => {    
    getAlllChamps();
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
 

const onchangeSubcat = (e)=>{
let name = e.target.name;
let value = e.target.value;
setSubcat({...subcat,
[name]: value
});

}

const handleSubmitSubCat = (e)=>{
    e.preventDefault();
    if(subcat.nombre !== '' && subcat.genero !== ''){
        updateChamps({ ...champs,
            subcategorias: subcat
            });
    }

}
 
return (
<Fragment>
     {campeonatos.loading && <em>Loading champs...</em>}
     {campeonatos.error && <span className="text-danger">ERROR: {campeonatos.error}</span>}
     {loading ? <em>Loading champs...</em> : ''}
     {campeonatos.items &&
         <ul>
             {campeonatos.items.map((user, index) =>
                 <li key={user.id}>
                     {'Campeonato: '+user.nombre + ' ' + user.fecha + ' ' + user.lugar}
                     <ul>
                         {user.subcategorias.map((subcat, index1)=>
                          <li key={subcat._id}>
                              {'Subcategoria: '+subcat.nombre+' '+subcat.genero}
                                 {subcat.inscriptos.map((insub)=>
                                 <div key={insub._id}>
                                 <p>{'Inscripto: '+insub.nombre + ' '+ insub.apellido + ' ' + insub.edad + ' '+ insub.id }</p>
                                 {userCurrent.id == insub.id ? <button className="btn btn-primary" onClick={()=>deleteIncripcionSub(inscripto.id, user,index1)}>Quitar inscripción</button> : ''}
                                 </div>
                                 
                                 )}
                                 
                                 <span><a onClick={() => handleSuscribeSub(user,subcat.nombre, subcat.genero,index1)} className="text-primary">Inscribirse</a></span>
                                    
                          
                          </li>
                          
                           
                         
                         )}
                           <div>
                               
                               <div className="form-group">
                                   <label>Nombre</label>
                                   <input type="text" name="nombre" onChange={onchangeSubcat} className="form-control"></input>
                               </div>
                               <div className="form-group">
                                   <label>Genero</label><br/>
                                   <span>Masculino <input type="radio" name="genero" onChange={onchangeSubcat}  value="masc" ></input></span>
                                   <span> Femenino  <input type="radio" name="genero" onChange={onchangeSubcat}  value="fem" ></input></span>
                               
                               </div>
                           
                           
                       </div>

                     <button className="btn btn-primary" onClick={()=>handleAddSubCategory(user,subcat.nombre,subcat.genero)}>ADD SUBCATEGORY</button>
                   
                     </ul>
                     <div>ID: {user.id}</div>
                     {
                         user.deleting ? <em> - Deleting...</em>
                         : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                         : <div><span> - <a onClick={() => handleDeleteChamp(user.id)} className="text-primary">Delete</a></span> <span> - <a onClick={() => handleEditChamp(user)} className="text-primary">Edit</a></span> </div>
                     }
                      {editchamp.open && editchamp.id == user.id &&
             
                 <div>
                 
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
                 <button onClick={close} className="btn btn-primary" style={{margin: "10px"}}>Cancel</button>        
                 <button type="submit" className="btn btn-primary" style={{margin: "10px"}}>Guardar</button>
                 
                 </form>
                 
                 </div>
             
                 }
                 </li>
                     
                 
             )}

            
             </ul>
     }
        <Grid item>
        <Button className="btn btn-primary" onClick={openAdding}>Agregar +</Button>
        </Grid>
        
        
            {openAdd && 
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
                 <input type="text" name="descripcion" onChange={handleChangeChamps}  className="form-control"></input><br></br>
                 </div>
                 <button onClick={close} className="btn btn-primary" style={{margin: "10px"}}>Cancel</button>        
                 <button type="submit" className="btn btn-primary" style={{margin: "10px"}}>Guardar</button>
                 
                 </form>}
                

                 <Dialog>
                    <DialogContent>
                        <Grid>
                            <Typography>¿Seguro que quiere inscribirse en este campeonato?</Typography>
                            <Button>SI</Button><Button>NO</Button>
                        </Grid>
                    </DialogContent>
                 </Dialog>

                 </Fragment>
)}                  
    