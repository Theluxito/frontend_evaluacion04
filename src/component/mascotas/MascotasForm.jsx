import { useState } from 'react'
import api from '../../services/Api'
import "./MascotasForm.css"

function MascotasForm({onMascotaCreada}){

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [estado, setEstado] = useState("perdida");
    const [tipoAnimal, setTipoAnimal] = useState("otro");
    const [edad, setEdad] = useState("");
    const [raza, setRaza] = useState("");
    const [sexo, setSexo] = useState("");
    const [tamano, setTamano] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre.trim() === ""){
            alert("El nombre no puede estar vacio")
            return
        }
        if (descripcion.trim() === ""){
            alert("La descripción no puede estar vacia")
            return
        }
        if (!imagen){
            alert("Seleccione una imagen")
            return
        }
        if (edad.trim() === ""){
            alert("Edad no puede estar vacio")
            return
        }
        if (isNaN(Number(edad))) {
            alert("Edad tiene que ser un numero")
        }
        if (Number(edad) < 0){
            alert("La edad no puede ser menor que 0")
            return
        }
        if (raza.trim() === ""){
            alert("Ingrese la raza de la mascota")
            return
        }
        if (sexo === ""){
            alert("Ingrese el sexo de la mascota")
            return
        }
        if (tamano === ""){
            alert("Ingrese el tamaño de la mascota")
            return
        }

        const formData = new FormData()
        formData.append("nombre", nombre)
        formData.append("descripcion", descripcion)
        formData.append("imagen", imagen)
        formData.append("estado", estado)
        formData.append("tipo_animal", tipoAnimal)
        if (edad) formData.append("edad", edad)
        if (edad) formData.append("raza", raza)
        if (edad) formData.append("sexo", sexo)
        if (edad) formData.append("tamano", tamano)

        try{
            const response = await api.post("mascotas/", formData)
            console.log("Mascota creada:", response.data)
            alert("Se ha creado una mascota.")

            setNombre("")
            setDescripcion("")
            setImagen(null)
            setEstado("perdida")
            setTipoAnimal("otro")
            setEdad("")
            setRaza("")
            setSexo("")
            setTamano("")
            if (onMascotaCreada){
                onMascotaCreada()
            }
        }catch(error){
            if (error.response?.status === 400) {
                alert("Error de validación: " + JSON.stringify(error.response.data));
            }

            if (error.response?.status === 404) {
                alert("No se encontró el recurso solicitado.");
            }

            if (error.response?.status === 405) {
                alert("Método HTTP no permitido.");
            }

            if (error.response?.status === 415) {
                alert("El tipo de contenido enviado no es válido.");
            }

            if (!error.response) {
                alert("No se pudo conectar con el servidor.");
            }
        }
    };

    return(
        <form onSubmit={handleSubmit} className='mascota-form'>
            <h2>Crear Mascota</h2>
            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>

            <label>Descripción:</label>
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>

            <label>Imagen:</label>
            <input type="file" onChange={(e) => setImagen(e.target.files[0])}/>

            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="perdida">Perdida</option>
                <option value="encontrada">Encontrada</option>
                <option value="en_adopcion">En adopción</option>
                <option value="adoptada">Adoptada</option>
            </select>
            
            <label>Tipo animal:</label>
            <select value={tipoAnimal} onChange={(e) => setTipoAnimal(e.target.value)}>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="ave">Ave</option>
                <option value="roedor">Roedor</option>
                <option value="reptil">Reptil</option>
                <option value="otro">Otro</option>
            </select>

            <label>Edad:</label>
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)}/>
            <p>Edad aproximada en años, si se conoce.</p>

            <label>Raza:</label>
            <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)}/>

            <label>Sexo:</label>
            <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="">--------</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
                <option value="desconocido">Desconocido</option>
            </select>

            <label>Tamaño:</label>
            <select value={tamano} onChange={(e) => setTamano(e.target.value)}>
                <option value="">--------</option>
                <option value="pequeno">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
                <option value="desconocido">Desconocido</option>
            </select>

            <button type='submit'>Agregar</button>
        </form>
    )
}

export default MascotasForm;