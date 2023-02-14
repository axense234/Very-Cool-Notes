// React
import React, { useEffect, useState } from "react";
// React Router
import { Link } from "react-router-dom";
// Components
import NoteModalMenu from "../Modals/NoteModal";
// SCSS
import "../../scss/components/Note/Note.scss";
// TS
import { NoteType, NoteProps } from "../../types";
// Redux
import {
  selectNoteContent,
  selectNoteOptions,
  setShowNoteModal,
  setShowNoteModalMenu,
} from "../../redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { State } from "../../redux/api/store";
import { selectNoteById } from "../../redux/slices/notesSlice";

const Note: React.FC<NoteProps> = ({
  lineHeight,
  maxChars,
  id,
  type,
  displayMode,
}) => {
  const noteByDefault = useAppSelector(selectNoteContent);
  const noteByQuery = useAppSelector((state: State) =>
    selectNoteById(state, id)
  );
  const dispatch = useAppDispatch();
  const noteDefaultOptions = useAppSelector(selectNoteOptions);

  const note =
    (type === "write" || type === "update"
      ? noteByDefault
      : (noteByQuery as NoteType)) || noteByDefault;

  const noteOptions =
    type === "view" || type === "update"
      ? noteDefaultOptions
      : note.styleOptions;

  const { content, title, authorName, createdById } = note as NoteType;

  const preparedContent = usePrepareContent(
    content.slice(0, maxChars),
    lineHeight,
    maxChars
  );

  const renderedContent = preparedContent.map((line: string) => {
    return (
      <div className='rc-line' key={line}>
        <li
          key={Math.random() * 10}
          style={{
            color: `${noteOptions?.textColor}`,
            fontSize: `${displayMode ? "16px" : noteOptions?.fontSize}`,
          }}
        >
          {line}
        </li>
        <hr />
      </div>
    );
  });

  return (
    <div
      className='note-container'
      style={{
        backgroundColor: `${noteOptions?.backgroundColor}`,
        fontFamily: `${noteOptions?.fontFamily}`,
      }}
      onMouseEnter={() => dispatch(setShowNoteModalMenu(id as string))}
      onMouseLeave={() => {
        dispatch(setShowNoteModalMenu(""));
        dispatch(setShowNoteModal(""));
      }}
    >
      <NoteModalMenu id={id as string} />
      <section
        className='note-container__info'
        style={{
          color: `${noteOptions?.titleColor}`,
          fontSize: `${noteOptions?.titleFontSize}`,
        }}
      >
        <p className='note-container__author'>
          by
          <Link to={`/authors/${createdById}`}>{authorName}</Link>
        </p>
        <p className='note-container__date'>
          {note.createdAt
            ? new Date(note.createdAt as string).toDateString()
            : new Date().toDateString()}
        </p>
      </section>
      <section className='note-container__content'>
        <Link className='note-container__title' to={`/notes/${id}`}>
          <h3
            style={{
              color: `${noteOptions?.titleColor}`,
              fontSize: `${noteOptions?.titleFontSize}`,
            }}
          >
            {title}
          </h3>
          <hr />
        </Link>
        <ul className='note-container__note-content'>{renderedContent}</ul>
      </section>
    </div>
  );
};

const usePrepareContent = (
  content: string,
  lineHeight: number,
  maxChars: number
) => {
  const [renderedContent, setRenderedContent] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const tempRenderedContent: string[] = [];
    while (i < content.length) {
      if (i + lineHeight >= content.length && content.length >= maxChars) {
        tempRenderedContent.push(
          content.slice(i, i + lineHeight).concat("...")
        );
      } else {
        tempRenderedContent.push(content.slice(i, i + lineHeight));
      }
      i += lineHeight;
    }
    setRenderedContent(tempRenderedContent);
  }, [content]);

  return renderedContent;
};

export default Note;
