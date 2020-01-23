import React, {useEffect, useState} from 'react';

import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css'
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]); //adição no final do array
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>


      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

//COMPONENTE  - função que retorna algum conteúdo html, css ou javascript
//pedaços isolados do app que não interferem entre si
//Facebook: timeline, posts, anúncios, etc...
//Separados em um arquivo cada
//Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação

//ESTADO
//informação que o componente vai manipular
//INformações mantidas pelo componente (Lembrar: imutabilidade)


//PROPRIEDADES (atributos ex.: 'title=""')
//são acessados a partir de 'props' no parâmetro da criação do componente
//Informações que um componente PAI passa para o componente FILHO
//fragment = tag sem estilização "<> </>"
