import React, { useEffect } from "react";
import { BigUploadIcon } from "../../assets/images";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import styles from "./drag-and-drop-input.module.css";

function DragAndDropInput({ name }) {
  const {
    isDraggingOver,
    dragRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDragAndDrop();

  useEffect(() => {
    let item = dragRef.current
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("drop", handleDrop);

    return () => {
      item.removeEventListener("dragenter", () => {});
      item.removeEventListener("dragleave", () => {});
      item.removeEventListener("dragover", () => {});
      item.removeEventListener("drop", () => {});
    };
  });

  let containerClass = `${styles["container"]}`;
  if (isDraggingOver) containerClass += ` ${styles["active"]}`;

  return (
    <div ref={dragRef} className={containerClass}>
      <label>
        <input type="file" name={name} id={name} className="hidden" />
        <BigUploadIcon />
        <p className="text-xs mt-3">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
      </label>
    </div>
  );
}

export default DragAndDropInput;
