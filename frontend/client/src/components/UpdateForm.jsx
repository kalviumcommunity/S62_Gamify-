import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateForm() {
    const { id } = useParams();
    const [game,setGame]=useState({})

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/CRUD-operations/games/${id}`);
                setGame(res.data); // Populate the form with fetched game data
            } catch (er) {
                console.error(`Error fetching game: ${er}`);
            }
        };
        fetchGame();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGame({ ...game, [name]: value });
    };


    const updateGame = async (id, game) => {
        try {
            const res = await axios.put(`http://localhost:8080/CRUD-operations/update-game/${id}`, game);
            console.log(res.data);
            window.location.href='/HomePage';

        } catch (er) {
            console.error(`Error updating game: ${er}`);
        }
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        updateGame(id, game);
    }

    const backgroundImage = "https://wallpaperaccess.com/full/878531.jpg";

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 text-white"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-black bg-opacity-80 p-6 rounded-2xl shadow-lg w-full max-w-md text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Update Game</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
                            value={game.name} // Bind the input value to the state
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Genre:</label>
                        <input
                            type="text"
                            name="genre"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
                            value={game.genre} // Bind the input value to the state
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Description:</label>
                        <textarea
                            name="description"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
                            value={game.description} // Bind the input value to the state
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-medium">Upload Image:</label>
                        <input
                            type="file"
                            name="image"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
                            onChange={handleInputChange} 
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Update Game
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateForm;
