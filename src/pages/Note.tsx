import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNoteStore } from '../../noteStore';

const Note: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ipcRenderer = (window as any).ipcRenderer;
  const fs = (window as any).electronFs;

  const updateNoteStore = useNoteStore((state) => state.updateNote);

  const [content, setContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [tagsChoosed, setTagsChoosed] = useState<Array<string>>([]);
  const [data, setData] = useState<string | null>(null);

  const readNote = async () => {
    // const note = await Filesystem.readFile({
    //   path: `notes/${id}.json`,
    //   directory: Directory.Data,
    //   encoding: Encoding.UTF8,
    // });
    await fs.readFile(`${id}.json`, function (err, data) {
      if (err) {
        throw err;
      }
      setData(data);
      console.log(data);
    });

    // const noteObj = JSON.parse(note.data);

    // setTitle(noteObj.title);
    // setContent(noteObj.content);
    // setCreatedAt(noteObj.createdAt);
    // setUpdatedAt(noteObj.updatedAt);
    // setTagsChoosed(noteObj.tags);
  };
  useEffect(() => {
    readNote();
  }, []);

  return (
    <div>
      {data}
      {id}
      {title}
      {content}
      {createdAt}
      {updatedAt}
      {tagsChoosed}
    </div>
  );
};

export { Note };
