import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { useNoteStore } from '../../noteStore';

const Home: React.FC = () => {
  const electron = (window as any).electron;
  const ipcRenderer = (window as any).ipcRenderer;
  const fs = (window as any).electronFs;
  const addNote = useNoteStore((state) => state.addNote);

  const nav = useNavigate();

  const handleAddNote = () => {
    const newNoteId = uuid();
    const infoInitialNoteForStore = {
      id: newNoteId,
      title: '',
      tags: [],
      createdAt: dayjs().toString(),
      updatedAt: '',
    };
    const infoInitialNote = { ...infoInitialNoteForStore, content: '' };

    // Write into a file
    const stringInfoNote = JSON.stringify(infoInitialNote);
    fs.appendFile(`${newNoteId}.json`, stringInfoNote, function (err) {
      if (err) throw err;
    });
    // Add into the store
    addNote(infoInitialNoteForStore);
    nav(`notes/${newNoteId}`);
  };

  return (
    <div>
      {/* The home director is @{ipcRenderer.homeDir()}
      The OS is @{electron.osVersion()} */}
      <button onClick={handleAddNote}>New Note</button>
    </div>
  );
};

export { Home };
