

const Lista = ({plato}) => (
    <tr>
        <td>{plato.campos}</td>
        <td>{plato.color}</td>
        <td>{plato.nombre}</td>
        <td>{plato.inicioActividad}</td>
        <td>{ (plato.oferta === true) ? 'Si' : 'No' }</td>
        <td>$ {plato.precio}</td>
    </tr>
)

export default Lista;