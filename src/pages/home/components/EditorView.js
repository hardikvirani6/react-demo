import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { useDispatch } from "react-redux";
import { setTextBlock } from "../../../store/reducer/home";

const EditorView = ({ id, block }) => {
  const dispatch = useDispatch();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate
      editor={editor}
      value={block}
      onChange={(value) => dispatch(setTextBlock({ value, id }))}
    >
      <Editable placeholder="Type here" style={{'cursor':'pointer'}} />
    </Slate>
  );
};

export default EditorView;
