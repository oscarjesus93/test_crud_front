import { Link } from "react-router-dom";


const Lista = ({plato}) => (
    <tr>
        <td data-testid="rowId"> <input type="hidden" value={plato.id} /> {plato.campos}</td>
        <td>{plato.color}</td>
        <td>{plato.nombre}</td>
        <td>{plato.inicioActividad}</td>
        <td>{ (plato.oferta === true) ? 'Si' : 'No' }</td>
        <td>$ {plato.precio}</td>
        <td>
            <Link to={`/edit/${plato.id}`} className="btn btn-primary btn-sm">Seleccionar</Link>
        </td>
    </tr>
)

export default Lista;