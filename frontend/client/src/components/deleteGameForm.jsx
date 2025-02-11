import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

function DeleteGameForm() {
  const {id}=useParams()
  const [game, setGame] = useState({});

  useEffect(()=>{
    const fetchGame=async()=>{
      try{
        const res=await axios.get(`http://localhost:8080/CRUD-operations/games/${id}`)
        setGame(res.data)
      }catch(er){
        console.log(`Error fetching data: ${er}`)
      }
    };
    fetchGame();

  },[id])

  const handleDelete= async()=>{
    try{
      
      await axios.delete(`http://localhost:8080/CRUD-operations/delete-game/${id}`)
      console.log(`Game data deleted successfully`)
      window.location.href='/HomePage'

    }catch(er){
      console.log(`Error deleting data: ${er}`)
    }
  }


  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Game</h2>
  <p className="text-gray-600 mb-6">
    Are you sure you want to delete the game: <span className="font-semibold">{game.name}</span>?
  </p>
  <button
    onClick={handleDelete}
    className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition duration-300"
  >
    Delete Game
  </button>
</div>

  )
}

export default DeleteGameForm
