import { useState } from "react"
import Board from "./Board"

import './css/planner.css'
import firstObj from './img/1.png'
import secondObj from './img/2.png'
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

const Planner = () => {
    const [objsList, setObjsList] = useState([
        { id: '1', order: 1, src: firstObj, text: 'Карточка 1' },
        { id: '2', order: 2, src: secondObj, text: 'Карточка 2' },
    ]
    )
    const [currentObj, setCurrentObj] = useState(null)


    return (
        <div className="planner">
            <DragDropContext>
                <Droppable droppableId="objs">
                    {provided => (
                        <>
                            {/* {...provided.droppableProps} ref={provided.innerRef} */}
                            <div className="obj-container" >
                                {objsList.map((card, index) =>
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {provided => (
                                            <img
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                src={card.src}
                                            />
                                        )}
                                    </Draggable>
                                )}
                            </div>

                            <Board provided={provided}/>
                        </>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Planner