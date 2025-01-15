import React from 'react';

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
          <div key={game.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{game.genre}</p>
              <p className="text-gray-300">{game.description}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;