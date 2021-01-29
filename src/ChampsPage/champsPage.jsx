import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import {alertActions} from '../_actions/alert.actions'
import { userActions } from '../_actions';
import {campeonatosActions} from '../_actions/campeonatos.actions';
import {Grid, Button} from '@material-ui/core'


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
           getAlll();
         }, 300);
        }
       
 }

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

    return (
        <Grid container>
                <h3>Todos los Campeonatos:</h3>
                
                {campeonatos.loading && <em>Loading champs...</em>}
            {campeonatos.error && <span className="text-danger">ERROR: {campeonatos.error}</span>}
            {loading ? <em>Loading champs...</em> : ''}
            {campeonatos.items &&
                <ul>
                    {campeonatos.items.map((user, index) =>
                        <li key={user.id}>
                            {user.nombre + ' ' + user.fecha + ' ' + user.lugar}
                            <ul>
                                {user.inscriptos.map((inscripto)=>
                                 <li key={inscripto._id}>
                                     {inscripto.nombre+' '+inscripto.apellido+' '+inscripto.edad}
                                    <p>ID:{inscripto.id}</p>

                                   {userCurrent.id == inscripto.id ? <button className="btn btn-primary" onClick={()=>deleteIncripcion(inscripto.id, user)}>Quitar inscripción</button> : ''}
                                 </li>
                                
                                )}

                               
                            </ul>
                            <div>ID: {user.id}</div>
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <div><span> - <a onClick={() => handleDeleteChamp(user.id)} className="text-primary">Delete</a></span> <span> - <a onClick={() => handleEditChamp(user)} className="text-primary">Edit</a></span> - <span><a onClick={() => handleSuscribe(user)} className="text-primary">Inscribirse</a></span> </div>
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
        </Grid>
       
    )
}
