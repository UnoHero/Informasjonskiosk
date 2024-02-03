import React, { useState, useEffect } from 'react';

const View = () => {
    const [player, setPlayer] = useState();
    const [selectedCategory, setSelectedCategory] = useState('Media');
    const [ID, setID] = useState();
    const [players, setPlayers] = useState([]);

    const sendToKiosk = async (valueToSend) => {
        try {
            const response = await fetch('http://localhost:3001/api/updateData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: valueToSend }),
            });

            if (!response.ok) {
                console.error('Failed to send data to Kiosk');
            }

            if (response.ok) {
                console.log('Data sent to Kiosk:', valueToSend);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleButtonClick = () => {
        sendToKiosk("1");
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        const getCoCID = async () => {
            try {
                if (player) {
                    const response = await fetch(`http://localhost:3001/api/player/${player}`);
                    const ID = await response.json();
                    setID(ID);
                }
            } catch (error) {
                console.error('Error fetching CoC ID:', error);
            }
        };

        if (selectedCategory === 'CoC') {
            getCoCID();
        }
    }, [player, selectedCategory]);

    const handleGetPlayer = (event) => {
        setPlayer(event.target.value);
    };

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/players");
                const data = await response.json();

                // Assuming the response is an array of player names
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        getPlayers();
    }, []);

    return (
        <div className="ViewBox">
            <h2>Slide</h2>
            <div>
                <div>
                    <label htmlFor="type">Type of Slide</label>
                    <select
                        name="category"
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="Media">Media</option>
                        <option value="Swgoh">Swgoh</option>
                        <option value="Weather">Vær</option>
                        <option value="Text">Text</option>
                        <option value="CoC">CoC</option>
                    </select>
                </div>

                {selectedCategory === 'CoC' ? (
                    <div>
                        <label htmlFor="type">Player</label>
                        <select name="players" id="players" onChange={handleGetPlayer} value={player}>
                            {/* Default option with an empty value */}
                            <option value="">Select a player</option>

                            {players.map((playerOption, index) => (
                                <option key={index} value={playerOption}>
                                    {playerOption}
                                </option>
                            ))}
                        </select>
                        <textarea id="ID" name="ID" rows="1" cols="10" placeholder="Enter ID" value={ID}></textarea>
                    </div>
                ) : selectedCategory === 'Swgoh' ? (
                    <div>
                        <label htmlFor="type">Player</label>
                        <select name="players" id="players" onChange={handleGetPlayer}>
                            {/* Add options here */}
                        </select>
                    </div>
                ) : selectedCategory === "Weather" ? (
                    <div>
                        {/* Render content for the 'Weather' category */}
                    </div>
                ) : selectedCategory === "Text" ? (
                    <div>
                        <textarea id="freeform" name="freeform" rows="4" cols="50" placeholder="Enter text here..."></textarea>
                    </div>
                ) : (
                    // Default content if none of the conditions match
                    <div>
                        <button onClick={handleButtonClick} className="UploadButton">
                            Upload Picture
                        </button>
                        <textarea id="freeform" name="freeform" rows="4" cols="50" placeholder="Enter text here..."></textarea>
                    </div>
                )}
            </div>
        </div>
    );
};

export default View;
