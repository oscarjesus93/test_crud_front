
import React, { useEffect, useState } from "react";
import axios from "axios";

import NotContent from "./NotContent";
import Lista from "./Lista";

import { Link } from "react-router-dom";

const Home = () => {

    const [ listaPlatos, guardarListaPlatos ] = useState([]);
	const [ primeraCarga, guardarPrimeraCarga ] = useState(true);

	useEffect(() => {

		if(primeraCarga === true){

			consultarListaPlatos();
			guardarPrimeraCarga(false);
		}

	}, [primeraCarga])


	const consultarListaPlatos = async () => {
		await axios.get(`http://localhost:8080/dish`)
		.then(response => {
			return response;
		})
		.catch(error => {
			return error.response;
		})
		.then(response => {

			if(response.status == 200){
				guardarListaPlatos(response.data);
			}
						
		})
	}

    return(
        <div className="container-fluid">
			<div className="row">

				<div className="col-md-12">
					<h1>Lista de platos</h1>
                    <Link to={'/register'}>Registrar</Link>
				</div>

				<div>
					<hr />
				</div>

				<div className="col-md-12">
				<table name="table" id="listRegister" className="table table-striped">
					<thead>
						<tr>	
							<th scope="col">Id</th>						
							<th scope="col">Campos</th>
							<th scope="col">Color</th>
							<th scope="col">Nombre</th>
							<th scope="col">Inicio actividad</th>
							<th scope="col">Oferta</th>
							<th scope="col">Precio</th>
							<th scope="col">Acciones</th>
						</tr>
					</thead>
					<tbody data-testid="table-tbody">
						
						{
							(listaPlatos.length === 0) ? (
								<NotContent />
							) : (
								listaPlatos.map((plato, index) => (
									<Lista 
										key={index}
										plato={plato}
									/>
								))
							)
						}
					</tbody>
					</table>
				</div>

			</div>
		</div>
    )
}

export default Home;