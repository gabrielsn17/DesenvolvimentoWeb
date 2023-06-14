import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('https://648a2b9d5fa58521cab0f4be.mockapi.io/tarefas')
      .then(response => response.json())
      .then(data => setTarefas(data))
      .catch(error => console.log(error));
  }, []);

  const handleExcluirTarefa = (id) => {
    fetch(`https://648a2b9d5fa58521cab0f4be.mockapi.io/tarefas/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        }
      })
      .catch(error => console.log(error));
  };

  const [starredTarefas, setStarredTarefas] = useState([]);

  const handleToggleStar = (id) => {
    if (starredTarefas.includes(id)) {
      setStarredTarefas(starredTarefas.filter(tarefaId => tarefaId !== id));
    } else {
      setStarredTarefas([...starredTarefas, id]);
    }
  };

  const handleInputChange = (event) => {
    setBusca(event.target.value);
  };

  const filteredTarefas = tarefas.filter(tarefa =>
    tarefa.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <h1>Carros</h1>
      <div id='busca1'>
        <input
          className="inputBusca"
          value={busca}
          onChange={handleInputChange}
          type="search"
          placeholder="Pesquisar carro"
          aria-label="Search"
        />
      </div>
      <div className="tarefas-container">
        {filteredTarefas.map(tarefa => (
          <div className="tarefa-item" key={tarefa.id}>
            <div id="d1"></div>
            <p>{tarefa.descricao}</p>
            <div id="d2"></div>
            <button style={{ border: "none" }} id="b1" onClick={() => handleExcluirTarefa(tarefa.id)}>
              Excluir
            </button>
            <button
              className={`star-button ${starredTarefas.includes(tarefa.id) ? 'starred' : ''}`}
              onClick={() => handleToggleStar(tarefa.id)}
            >
              {starredTarefas.includes(tarefa.id) ? <AiFillStar /> : <AiOutlineStar />}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;