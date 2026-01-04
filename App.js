import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const fetchNotes = async () => {
    const res = await fetch("http://127.0.0.1:8000/notes");
    setNotes(await res.json());
  };

  const addNote = async () => {
    await fetch("http://127.0.0.1:8000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const searchNotes = async () => {
    const res = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    setResult(await res.json());
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Notes Manager</h2>

      <h3>Add Note</h3>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br /><br />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
      />
      <br /><br />

      <button onClick={addNote}>Save</button>

      <h3>Search</h3>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search notes"
      />
      <button onClick={searchNotes}>Search</button>

      {result && (
        <div>
          <h4>Best Match</h4>
          <b>{result.title}</b>
          <p>{result.content}</p>
        </div>
      )}

      <h3>All Notes</h3>
      {notes.map(n => (
        <div key={n.id}>
          <b>{n.title}</b>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
