import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const slateObject = [
  {
    type: "paragraph",
    children: [
      { text: '' },
    ],
  },
];

const cell1 = "cell1";
const cell2 = "cell2";
const cell3 = "cell3";
const cell4 = "cell4";
const cell5 = "cell5";

const cardId1 = uuid();
const cardId2 = uuid();
const cardId3 = uuid();

const initialData = {
  cards: {
    [cardId1]: {
      id: cardId1,
      content: slateObject,
    },
    [cardId2]: {
      id: cardId2,
      content: slateObject,
    },
    [cardId3]: {
      id: cardId3,
      content: slateObject,
    },
  },
  cells: {
    [cell1]: {
      id: cell1,
      title: "Not Started",
      cardIds: [cardId1, cardId2, cardId3],
    },
    [cell2]: {
      id: cell2,
      title: "In progress",
      cardIds: [],
    },
    [cell3]: {
      id: cell3,
      title: "Review",
      cardIds: [],
    },
    [cell4]: {
      id: cell4,
      title: "Completed",
      cardIds: [],
    },
    [cell5]: {
      id: cell5,
      title: "Deployed",
      cardIds: [],
    },
  },
  cellOrder: [cell1, cell2, cell3, cell4, cell5],
};

export const reducer = createSlice({
  name: "home",
  initialState: {
    ...initialData,
  },
  reducers: {
    addTextBlock: (state) => {
      const newUUID = uuid();
      state.cards[newUUID] = {
        id: newUUID,
        content: slateObject,
      };
      state.cells[cell1].cardIds.push(newUUID);
    },
    setTextBlock: (state, { payload: { id, value } }) => {
      state.cards[id].content = value;
    },
    updateTextData: (state, { payload: { key, value } }) => {
      state[key] = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTextBlock, setTextBlock, updateTextData } = reducer.actions;

export default reducer.reducer;
