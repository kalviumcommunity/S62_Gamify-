import React, { useEffect, useState } from 'react';
import GameCard from './GameCard'; // Import the GameCard component
import axios from 'axios'; // Import axios for API requests

const Homepage = () => {
  const [games, setGames] = useState([]);
  

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8080/CRUD-operations/games'); // Fetch data from the API
        console.log(response.data);
        setGames(response.data);
      } catch (error) {

        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const backgroundImage="https://wallpaperaccess.com/full/878531.jpg";
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center" 
    style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      backgroundColor: 'rgba(36, 36, 36, 0.85)', 
      backgroundBlendMode: 'overlay' 
    }}>
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Gamify</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.length > 0 ? (
          games?.map((game,index) => (
            <GameCard 
              key={game._id} 
              title={game.name} 
              genre={game.genre} 
              description={game.description} 
              image={game.image} 
            />
          ))
        ) : (
          <p>No games available.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
