// import React, { useEffect, useState } from 'react';
// import GameCard from './components/GameCard'; // Import the GameCard component
// import axios from 'axios'; // Import axios

// const Homepage = () => {
//   const [games, setGames] = useState([]);

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/CRUD-operation/games'); // Fetch data from the API
//         setGames(response.data);
//       } catch (error) {
//         console.error("Error fetching games:", error);
//       }
//     };

//     fetchGames();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <h1 className="text-4xl font-bold text-center mb-8">Welcome to Gamify</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {games.length > 0 ? (
//           games.map((game) => (
//             <GameCard 
//               key={game._id} 
//               title={game.name} // Adjust according to your data structure
//               genre={game.genre} // Ensure this field exists in your data
//               description={game.description} 
//               image={game.image} // Ensure this field exists in your data
//             />
//           ))
//         ) : (
//           <p>No games available.</p>
//         )}
//       </div>
//     </div>
//   );
// };


// export default Homepage;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path='/HomePage' element={<Homepage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
