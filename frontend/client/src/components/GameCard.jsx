import React from 'react';

const GameCard = ({ title, genre, description, image }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-400 mb-4">{genre}</p>
        <p className="text-gray-300">{description}</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;
