
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

import axios from "axios";

const Register = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ primeraPeticion, guardarPrimeraPeticion ] = useState(false);    

    //cambiar
    const [ data, guardarData ] = useState({
        nombre: '',
        color: '',
        campos: '',
        oferta: false,
        precio: '0'
    })

    const [ mostrarMensaje, guardarMostrarMensaje ] = useState('');
    const [ validacion, guardarValidacion ] = useState(false);

    useEffect(() => {
        if(primeraPeticion === false){

            if(id === undefined || id === null){
                guardarValidacion(false);
                return;
            }

            consultarRegistro(id);
            guardarPrimeraPeticion(true);
        }
    }, [primeraPeticion])

    const consultarRegistro = async (id) => {
        const response = await axios.get(`http://localhost:8080/dish/${id}`).then((res) => {
            return res
        }).catch((err) => { return err.response }).then((data => { return data }))

        if(response.status === 404 || response.status === 400){
            guardarValidacion(true);
            guardarMostrarMensaje(response.data.message)
            return;
        }

        guardarData({
            nombre: response.data.nombre,
            color: response.data.color,
            campos: response.data.campos,
            oferta: response.data.oferta,
            precio: response.data.precio
        })
    }

    const procesarRegistro = async () => {

        if(campos.length <= 0 || color.length <= 0 || nombre.length <= 0 || oferta == false || parseInt(precio) === 0){
            guardarValidacion(true);
            guardarMostrarMensaje('Todos los campos son obligatorios')
            return;
        }

        let payload = data;
        payload.oferta = (payload.oferta === false) ? 0 : 1;

        await axios.post('http://localhost:8080/dish', payload )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error)
                return {}
            })
            .then((response) => {
                console.log(response)                
                navigate("/");
            })

    }

    const procesarUpdate = async () => {
        let payload = data;
        payload.oferta = (payload.oferta === false) ? 0 : 1;

        await axios.put(`http://localhost:8080/dish/${id}`, payload )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error)
                return {}
            })
            .then((response) => {
               
                if(response.status === 200){
                    navigate("/");
                    return;
                }
                
                guardarMostrarMensaje(response.data.message)
                
            })
    }

    const procesarDelete = async () => {
        await axios.delete(`http://localhost:8080/dish/${id}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error)
            return {}
        })
        .then((response) => {            
            if(response.status === 204){
                navigate("/");
                return;
            }            
            guardarMostrarMensaje(response.data.message)
            
        })
    }

    const onChange = (e) => {
        guardarData( {...data,
            [e.target.name]: (e.target.type === "checkbox") ? e.target.checked : e.target.value
        })
    }   

    const { nombre,  color, campos, oferta, precio } = data;
 
    return(
        <div className="container-fluid">
            <div className="row" id="myform">

                <div className="col-md-12">
                    <h1>Registro de platos</h1>
                </div>

                <div>
                    <hr />
                </div>

                <div className="col-md-12 pb-5 pt-4" data-testid="alert">
                {
                    (validacion === true) ? (
                        <div class="alert alert-danger">
                            {mostrarMensaje}
                        </div>
                    ) : (
                        null
                    )
                }
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" value={nombre} onChange={onChange} className="form-control" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <input type="text" name="color" id="color" value={color} onChange={onChange} className="form-control" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="campos">Campos</label>
                        <input type="text" name="campos" id="campos" value={campos} onChange={onChange} className="form-control" />
                    </div>
                </div>

                <div className="align-self-md-center col-md-4 text-center pt-5">
                    <div className="form-check text-center">
                        <input type="checkbox" name="oferta" id="oferta" checked={oferta} onChange={onChange} />
                        Oferta
                    </div>
                </div>

                <div className="align-self-md-center col-md-4 text-center pt-5">
                    <div className="form-group">
                        <label>Precio</label>
                        <input type="number" name="precio" id="precio" value={precio} onChange={onChange} className="form-control" />
                    </div>
                </div>

                <div className="align-self-md-center col-md-4 text-center pt-5">
                    {
                        (id != undefined || id != null) ? (
                            <Fragment>
                                <button type="button" data-testid="actualizar" onClick={() => procesarUpdate()} className="btn btn-primary btn-sm m-4">Actualizar</button>
                                <button type="button" data-testid="eliminar" onClick={() => procesarDelete()} className="btn btn-danger btn-sm m-4">Eliminar</button>
                            </Fragment>
                        ) : (
                            <button type="button" data-testid="registrar" onClick={() => procesarRegistro()} className="btn btn-success btn-sm m-4">Registrar</button>
                        )
                    }
                    <Link to={`/`} className="btn btn-info btn-sm m-4" >Volver</Link>
                </div>

            </div>
        </div>
    )
}
export default Register;