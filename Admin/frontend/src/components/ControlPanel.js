import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ControlPanel = () => {
  const [box, setBox] = useState([
    { id: 1, bg: '1' },
    { id: 2, bg: '2' },
    { id: 3, bg: '3' },
    { id: 4, bg: '4' },
  ]);

  const [selectedBox, setSelectedBox] = useState(null);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const newBox = [...box];
    const [draggedItem] = newBox.splice(result.source.index, 1);
    newBox.splice(result.destination.index, 0, { ...draggedItem, bg: (result.destination.index + 1).toString() });
    newBox.forEach((item, index) => {
      item.bg = (index + 1).toString();
    });
    setBox(newBox);
    setSelectedBox(draggedItem.id);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="controlPanelBox">
        <Droppable droppableId="boxes">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {box.map(({ id, bg }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <li
                      key={id}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      onClick={() => setSelectedBox(id)}
                      className={selectedBox === id ? 'selected' : ''}
                    >
                      <div className={`box`} style={{ backgroundColor: `#${bg}` }}>
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
  );
};

export default ControlPanel;
