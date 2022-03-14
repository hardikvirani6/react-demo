import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./../style.scss";
import EditorView from "./EditorView";

const Cells = ({ cell, index }) => {
  const blocks = useSelector((state) => state.home.cards);

  return (
    <Droppable key={cell.id} droppableId={cell.id} index={index}>
      {(provided) => (
        <div
          className="cell-contain"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <div className='title-wrapper'>
              <span className="cell-title">{cell.title}</span>
            </div>
            <div>
              {cell.cardIds.map((blockId, index) => {
                const data = blocks[blockId];
                return (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided) => (
                      <div
                        className="card-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <EditorView
                          block={data.content}
                          key={data.id}
                          id={data.id}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Cells;
