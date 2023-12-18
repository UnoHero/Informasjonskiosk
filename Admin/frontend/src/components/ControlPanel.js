import { useState } from 'react';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const ControlPanel = () => {
    const [box, setBox] = useState(
        [
            {
                id: 0,
                bg: "1"
            },
            {
                id: 1,
                bg: "2"
            },
            {
                id: 2,
                bg: "3"
            },
            {
                id: 3,
                bg: "4"
            }
        ]
    )

    function handleOnDragEnd(result) {
        if(!result.destination) return;
        const newBox = box;
        const [draggedItem] = newBox.splice(result.source.index, 1);
        newBox.splice(result.destination.index, 0, draggedItem);
        setBox(newBox);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="controlPanelBox">
                <Droppable droppableId="boxes">
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {box.map(({id, bg}, index) => 
                                <Draggable key= {id} draggableId={id.toString()} index={index}>
                                    {(provided) => (
                                        <li key={id} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                            <div className={`box`}></div>
                                        </li>
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </ul> 
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
};

export default ControlPanel;
