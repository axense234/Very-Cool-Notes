// Content
import Note from ".";
// TS
import { NoteProps } from "../../types";

const TempIndNote: React.FC<NoteProps> = ({ id, type }) => {
  return (
    <section className='note-page-container__wrapper'>
      <Note id={id} lineHeight={100} maxChars={10000} type={type} />
    </section>
  );
};

export default TempIndNote;
