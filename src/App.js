import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((resp) => setRepositories(resp.data));
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        title: `Repositório ${repositories.length + 1}`,
        url: "http://github.com/iago1501",
        techs: ["Node.js", "Express"],
      })
      .then((resp) => setRepositories([...repositories, resp.data]));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then(
        setRepositories(
          repositories.filter((repositorie) => repositorie.id !== id)
        )
      );
  }
  return (
    <div>
      <ul data-testid="repository-list">        
        {repositories.map((repositorie) => (
          <li>
            <a href={repositorie.url}>{repositorie.title}</a>
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
