import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get("/repositories");
        setRepositories(response.data);
      } catch (error) {
        throw error;
      }
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("/repositories", {
        title: `Fagner ${getRandomInt(0, 100)}`,
        url: "https://github.com/fschwalm",
        techs: ["Node", "Express", "TypeScript"],
      });
      setRepositories((prevState) => [...prevState, response.data]);
    } catch (error) {
      throw error;
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories((prevState) =>
        prevState.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
