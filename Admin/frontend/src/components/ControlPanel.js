import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ControlSection = styled.div`
  margin: auto;
  padding: 1%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: #001e80;
  max-width: 60%;
`;

const ToDB = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 2.5%;
  padding: 1%;
  background-color: #808080; /* Dark gray */
  border-radius: 10px;
  font-size: 18px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #cccccc; /* Light gray */
    opacity: 0.8;
  }
`;

const View = () => {
  const [player, setPlayer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Media");
  const [ID, setID] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [chosen, setChosen] = useState()

  let slideNumber = 1

  let files = {}
  let slideOrientation = {}

  const handleButtonClick = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      sendToKiosk(file);
    }
  };

  const sendToKiosk = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3001/api/updateData", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to send data to Kiosk");
      } else {
        console.log("Data sent to Kiosk:", file);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const sendHandler = () => {
    sendToKiosk(slideOrientation, files)
  }

  useEffect(() => {
    const getCoCID = async () => {
      try {
        if (player) {
          const response = await fetch(`http://localhost:3001/api/player/${player}`);
          const ID = await response.json();
          setID(ID);
        }
      } catch (error) {
        console.error("Error fetching CoC ID:", error);
      }
    };

    if (selectedCategory === "CoC") {
      getCoCID();
    }
  }, [player, selectedCategory]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/players");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    getPlayers();
  }, []);

  const ControlPanel = () => {
    const [box, setBox] = useState([
      { id: 1, bg: "1" },
      { id: 2, bg: "2" },
      { id: 3, bg: "3" },
      { id: 4, bg: "4" },
    ]);

    const [selectedBox, setSelectedBox] = useState("1");

    function handleOnDragEnd(result) {
      if (!result.destination) return;
      const newBox = [...box];
      const [draggedItem] = newBox.splice(result.source.index, 1);
      newBox.splice(result.destination.index, 0, { ...draggedItem, bg: (result.destination.index + 1).toString() });
      newBox.forEach((item, index) => {
        item.bg = (index + 1).toString();
      });
      setBox(newBox);
      setSelectedBox(newBox[result.destination.index].bg);
    }

    const handleGetPlayer = (event) => {
      setPlayer(event.target.value);
    };

    useEffect(() => {
      // Set the initial state of the `bg` property for each box based on its index
      const initialBoxState = box.map((item, index) => ({
        ...item,
        bg: (index + 1).toString(),
      }));
      setBox(initialBoxState);
    }, []);
    
    const Slide = ({ slideNumber }) => {
      return (
        <div className="slide">
          <h2>Slide {slideNumber}</h2>
          {/* Rest of the Slide component */}
        </div>
      );
    };
    
    return (
      <>
      {/* Drag and drop boxes */}
        <ControlSection>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="controlPanelBox">
              <Droppable droppableId="boxes">
                {(provided) => (
                  <ul ref={provided.innerRef} {...provided.droppableProps}>
                    {box.map(({ id, bg }, index) => (
                      <Draggable key={id} draggableId={id.toString()} index={index}>
                      {(provided) => (
                        <li
                          key={bg}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          onClick={() => {
                            setSelectedBox(bg);
                          }}
                          className={selectedBox === bg ? "selected" : ""}
                        >
                          <div
                            className={`box ${selectedBox === bg ? "selected" : ""}`}
                            style={{ backgroundColor: `#${bg}` }}
                            data-id={bg}
                          >
                            {bg}
                          </div>
                        </li>
                      )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </DragDropContext>

          {/* Main slide selector and buttons */}
          <div className="ViewBox">
            <Slide slideNumber={selectedBox} />
            <div className="ViewIndex">
              <div className="types">
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

              {selectedCategory === "CoC" ? (
                <>
                  <div className="playerTab">
                    <label htmlFor="type">Player</label>
                    <select name="players" id="players" onChange={handleGetPlayer} value={player}>
                      <option value="">Select a player</option>
                      {players.map((playerOption, index) => (
                        <option key={index} value={playerOption}>
                          {playerOption}
                        </option>
                      ))}
                    </select>
                    <textarea id="ID" name="ID" rows="1" cols="10" placeholder="Enter ID" value={ID} onChange={(e) => setID(e.target.value)}></textarea>
                  </div>
                </>
              ) : selectedCategory === "Swgoh" ? (
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
                <>
                  <label htmlFor="mediaInput" className="UploadPic">
                    Upload Picture
                    <input
                      type="file"
                      id="mediaInput"
                      accept="image/*, video/*"
                      onChange={handleButtonClick}
                      style={{ display: "none" }}
                    />
                  </label>
                  <textarea id="freeform" name="freeform" rows="4" cols="50" placeholder="Enter text here..."></textarea>
                </>
              )}
            </div>
          </div>
        </ControlSection>
        <ToDB onClick={() => sendHandler()}>Upload</ToDB>
      </>
    );
  };

  return <ControlPanel />;
};

export default View;