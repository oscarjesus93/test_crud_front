import { Link } from "react-router-dom";


const Lista = ({plato}) => (
    <tr>
        <td>{plato.id}</td>
        <td>{plato.field}</td>
        <td>{plato.color}</td>
        <td>{plato.name}</td>
        <td>{plato.startActivity}</td>
        <td>{ (plato.offer === true) ? 'Si' : 'No' }</td>
        <td>$ {plato.price}</td>
        <td>
            <Link to={`/edit/${plato.id}`} data-testid={`button_${plato.id}`} className="btn btn-primary btn-sm">Select</Link>
        </td>
    </tr>
)

export default Lista;