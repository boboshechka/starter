const Board = ({provided}) => {

    // console.log('prooops', props)
    return ( 
        <div className="board" ref={provided.innerRef} { ...provided.droppableProps }>
            Здесь будет доска
        </div>

     )
}
 
export default Board