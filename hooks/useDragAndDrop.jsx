import { createRef, useEffect, useRef, useState } from "react";

function useDragAndDrop(init) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const dragRef = createRef(null);
  

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setIsDraggingOver(true);
    // console.log(e);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e);
    setDragCounter((value) => value + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      console.log({ files: e.dataTransfer.files, items: e.dataTransfer.items });
      setIsDraggingOver(true);
    }
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    setDragCounter((value) => value - 1);
    if (dragCounter > 0) return;

    // console.log(e);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    console.log(e);
  };
  return {
    isDraggingOver,
    dragRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}

export default useDragAndDrop;
