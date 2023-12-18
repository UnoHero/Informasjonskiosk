import React from 'react';

const View = () => {
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

    return (
        <div className="ViewBox">
            <h2>Slide </h2>
            <div>
                <div>
                    <label htmlFor="type">Type of Slide</label>
                    <select name="membership" id="membership">
                        <option value="media" defaultValue>Media</option>
                        <option value="SWgoh">Swgoh</option>
                        <option value="Vær">Vær</option>
                        <option value="video">Video</option>
                    </select>
                </div>

                <button onClick={handleButtonClick} className="UploadButton">
                    Upload Picture
                </button>

                <textarea id="freeform" name="freeform" rows="4" cols="50">
                    Enter text here...
                </textarea>
            </div>
        </div>
    );
};

export default View;
