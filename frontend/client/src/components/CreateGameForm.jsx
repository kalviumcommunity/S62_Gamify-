import React from 'react'

function CreateGameForm() {

  

const backgroundImage = "https://wallpaperaccess.com/full/878531.jpg";

  return (
    <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 text-white"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >

<div className="bg-black bg-opacity-80 p-6 rounded-2xl shadow-lg w-full max-w-md text-white">
  <h1 className="text-3xl font-bold text-white-800 mb-6 text-center">Add Game</h1>
  
  <form className="space-y-4">
    {/* Game Name */}
    <div>
      <label className="block font-medium">Game Name:</label>
      <input
        type="text"
        name="gameName"
        className="w-full bg-black bg-opacity-70 text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter game name"
        />
    </div>

    {/* Game Description */}
    <div>
      <label className="block font-medium">Game Description:</label>
      <textarea
        name="gameDescription"
        rows="4"
        className="w-full bg-black bg-opacity-70 text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Describe the game..."
        ></textarea>
    </div>

    {/* Game Genre */}
    <div>
      <label className="block font-medium">Game Genre:</label>
      <select
        name="gameGenre"
        className="w-full bg-black bg-opacity-70 text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Role-Playing">Role-Playing</option>
        <option value="Racing">Racing</option>
        <option value="Shooter">Shooter</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Simulation">Simulation</option>
        <option value="Strategy">Strategy</option>
        <option value="Sports">Sports</option>
        <option value="Fighting">Fighting</option>
        <option value="Horror">Horror</option>
        <option value="Survival">Survival</option>
        <option value="Platformer">Platformer</option>
        <option value="MMORPG">MMORPG</option>
        <option value="Music">Music</option>
        <option value="Party">Party</option>
        <option value="Stealth">Stealth</option>
        <option value="Sandbox">Sandbox</option>
        <option value="Visual Novel">Visual Novel</option>
        <option value="Idle">Idle</option>
      </select>
    </div>

    {/* File Upload */}
    <div>
      <label htmlFor="fileUpload" className="block font-medium">
        Upload a file:
      </label>
      <input
        type="file"
        id="fileUpload"
        name="fileUpload"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
        />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
      Add Game
    </button>
  </form>
</div>
</div>

  )
}

export default CreateGameForm
