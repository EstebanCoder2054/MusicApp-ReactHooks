import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';

function App(){

  //utilizar useState() con 3 propiedades - 3 states
    const [artista, agregarArtista] = useState('');
    const [letra, agregarLetra] = useState([]);
    const [info, agregarInfo] = useState({});


    //función para consultar API de letra
    const consultarAPILetra = async (busqueda) => {
      const artista = busqueda.artista;
      const cancion = busqueda.cancion;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      //consultar la API
      const respuesta = await axios(url);
      
      //agregar la letra al state de letra
      agregarLetra(respuesta.data.lyrics);
      
      //agregar el artista al state de artista
      agregarArtista(artista);
    }

    //función para consultar la API de la información de los artistas
    const consultarAPIInfo = async () =>{

      if(artista){
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`
      const resultado = await axios(url);

      agregarInfo(resultado.data.artists[0]);
      console.log(info);
      }
    }

    //ciclo de vida para que detecte cada que cambia el componente y hace el llamado a la API de info
    useEffect( () => {
      consultarAPIInfo();
    }, [artista] );

    return(
      <Fragment>
        <Formulario
          consultarAPILetra={consultarAPILetra}
        />

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Informacion 
                info={info}
              />
            </div>
              
            <div className="col-md-6">
              <Cancion 
                letra={letra}
              />
            </div>
          </div>
        </div>
      </Fragment>
    )

}

export default App;