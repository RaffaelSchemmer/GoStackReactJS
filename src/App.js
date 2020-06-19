import React , {useState , useEffect} from 'react';
import api from './services/api'

import "./styles.css";

function App() {
  
  const [projects,setProjects] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
        
        setProjects(response.data);
      
    })

  } , []);

  async function handleAddRepository() {
   
    // const title = prompt('Informe o nome do projeto'); 
    const title = `Novo Projeto ${Date.now()}`;

    const response = await api.post(
      
      'repositories', 
      {
          title: title,
          owner: 'Raffael Schemmer'
      }
    );
    
    const project = response.data;
    setProjects([...projects,project]);

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(
      
      'repositories/'+id,
      
    );
    
    if(response.status === 204){
      
      document.getElementById(id).remove();

    }

    console.log(projects);
    
  }

  return (
  
    <div>
      <ul data-testid="repository-list">
        
      { projects.map(project => (

          <li id={project.id} key={project.id}>{project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
          
          </li>

      )) }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
