import React, { useState } from "react";
import { useQuery } from "urql";
import styles from "./Notes.module.scss";
const getNotesQuery = `
  query {
    getNotes {
      text
      uuid
    }
  }
`;
interface NotesProps {}
function Notes({}: NotesProps) {
  const [noteInput, setNoteInput] = useState("");
  const [result, reExecuteQuery] = useQuery({
    query: getNotesQuery,
  });
  return (
    <div className={styles.Notes}>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(noteInput);
          }}
        >
          <input
            name="noteInput"
            placeholder="Enter Note"
            value={noteInput}
            onChange={(e) => {
              setNoteInput(e.target.value);
            }}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className={styles.notesList}>
        {(result.data?.getNotes as { text: string; uuid: string }[])?.map(
          (note, i) => (
            <p key={i}>{note.text}</p>
          )
        )}
      </div>
    </div>
  );
}

export default Notes;
