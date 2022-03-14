import React from "react";
import { Button, Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { PlusOutlined } from '@ant-design/icons';

import Cells from "./components/Cells";
import { addTextBlock, updateTextData } from "../../store/reducer/home";
import "./style.scss";

const { Header, Content } = Layout;

const Home = () => {
  const [cells, cellOrder] = useSelector((state) => [
    state.home.cells,
    state.home.cellOrder,
  ]);
  const dispatch = useDispatch();

  const onDragEnd = (props) => {
    const { draggableId, source, destination } = props;
    if (!destination || !source) return;

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
        return;
    }

    const from = cells[source.droppableId];
    const to = cells[destination.droppableId];
    if (from === to) {
      const newCardIds = Array.from(from.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...from,
        cardIds: newCardIds,
      };

      const newCells = {
        ...cells,
        [newColumn.id]: newColumn,
      };
      dispatch(updateTextData({ key: "cells", value: newCells }));
      return;
    }

    // Moving from one list to another
    const fromCardIds = Array.from(from.cardIds);
    fromCardIds.splice(source.index, 1);
    const newFrom = {
      ...from,
      cardIds: fromCardIds,
    };
    const toCardIds = Array.from(to.cardIds);
    toCardIds.splice(destination.index, 0, draggableId);
    const newTo = {
      ...to,
      cardIds: toCardIds,
    };
    const newCells = {
      ...cells,
      [newFrom.id]: newFrom,
      [newTo.id]: newTo,
    };
    dispatch(updateTextData({ key: "cells", value: newCells }));
  };

  return (
    <div className="container">
      <Header className="header">
        <Button className="addButton" type="primary" onClick={() => dispatch(addTextBlock())} icon={<PlusOutlined />} />
      </Header>
      <Content className="content">
        <DragDropContext onDragEnd={onDragEnd}>
          {cellOrder.map((cell, index) => (
            <Cells cell={cells[cell]} key={index} index={index} />
          ))}
        </DragDropContext>
      </Content>
    </div>
  );
};

export default Home;
