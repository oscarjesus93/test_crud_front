
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

import axios from "axios";

const Register = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ primeraPeticion, guardarPrimeraPeticion ] = useState(false);    

    //cambiar
    const [ data, guardarData ] = useState({
        name: '',
        color: '',
        field: '',
        offer: false,
        price: '0'
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
            name: response.data.name,
            color: response.data.color,
            field: response.data.field,
            offer: response.data.offer,
            price: response.data.price
        })
    }

    const procesarRegistro = async () => {

        if(field.length <= 0 || color.length <= 0 || name.length <= 0 || offer === false || parseInt(price) === 0){
            guardarValidacion(true);
            guardarMostrarMensaje('TAll fields are required')
            return;
        }

        let payload = data;
        payload.offer = (payload.offer === false) ? 0 : 1;

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
        payload.offer = (payload.offer === false) ? 0 : 1;

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

    const { name,  color, field, offer, price } = data;
 
    return(
        <div className="container-fluid">
            <div className="row" data-testid="myform">

                <div className="col-md-12">
                    <h1>The plate register</h1>
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
                        <label htmlFor="nombre">Name</label>
                        <input type="text" name="name" id="nombre" value={name} onChange={onChange} className="form-control" />
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
                        <label htmlFor="campos">Fields</label>
                        <input type="text" name="field" id="campos" value={field} onChange={onChange} className="form-control" />
                    </div>
                </div>

                <div className="align-self-md-center col-md-4 text-center pt-5">
                    <div className="form-check text-center">
                        <label>
                            <input type="checkbox" name="offer" data-testid="oferta" checked={offer} onChange={onChange} /> Offer                        
                        </label>                        
                    </div>
                </div>

                <div className="align-self-md-center col-md-4 text-center pt-5">
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" name="price" id="precio" value={price} onChange={onChange} className="form-control" />
                    </div>
                </div>

                <div className="align-self-md-center col-md-4 text-center pt-5">
                    {
                        (id != undefined || id != null) ? (
                            <Fragment>
                                <button type="button" data-testid="update" onClick={() => procesarUpdate()} className="btn btn-primary btn-sm m-4">Update</button>
                                <button type="button" data-testid="delete" onClick={() => procesarDelete()} className="btn btn-danger btn-sm m-4">Delete</button>
                            </Fragment>
                        ) : (
                            <button type="button" data-testid="register" onClick={() => procesarRegistro()} className="btn btn-success btn-sm m-4">Register</button>
                        )
                    }
                    <Link to={`/`} className="btn btn-info btn-sm m-4" >Go back</Link>
                </div>

            </div>
        </div>
    )
}
export default Register;