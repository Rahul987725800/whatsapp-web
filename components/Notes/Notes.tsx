import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import styles from "./Notes.module.scss";
const getNotesQuery = `
  query {
    getNotes {
      text
      uuid
    }
  }
`;
const createNoteMutation = `
  mutation ($data: createNoteInput) {
    createNote(data: $data) {
      uuid
      text
    }
  }
`;
const deleteNoteMutation = `
  mutation ($uuid: String) {
    deleteNote(uuid: $uuid) {
        message
    }
  }
`;
interface NotesProps {}
function Notes({}: NotesProps) {
  const [uuid, setUuid] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [createNoteResult, createNote] = useMutation(createNoteMutation);
  const [deleteNoteResult, deleteNote] = useMutation(deleteNoteMutation);

  const [result, reExecuteQuery] = useQuery({
    query: getNotesQuery,
  });
  return (
    <div className={styles.Notes}>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await createNote({
              data: {
                uuid: uuid || Math.random().toString(),
                text: noteInput,
              },
            });
            console.log(result);
            setNoteInput("");
            setUuid("");
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
            <div key={note.uuid}>
              <p
                onClick={() => {
                  setNoteInput(note.text);
                  setUuid(note.uuid);
                }}
              >
                {note.text}
              </p>
              <button
                onClick={async () => {
                  await deleteNote({
                    uuid: note.uuid,
                  });

                  reExecuteQuery({ requestPolicy: "network-only" });
                }}
              >
                delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Notes;
