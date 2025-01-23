import React from 'react';
import GameCard from './components/GameCard'; // Import the GameCard component

const games = [
  {
    id: 1,
    title: "Game 1",
    genre: "Action",
    description: "An exciting action-packed game with stunning visuals.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Game 2",
    genre: "Adventure",
    description: "Explore mysterious worlds and uncover hidden treasures.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Game 3",
    genre: "RPG",
    description: "Build your character and embark on epic quests.",
    image: "https://via.placeholder.com/300",
  },
];

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Gamify</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard 
            key={game.id} 
            title={game.title} 
            genre={game.genre} 
            description={game.description} 
            image={game.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
