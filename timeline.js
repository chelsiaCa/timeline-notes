import React, { useEffect, useRef } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';

function TimelineView({ notes }) {
  const containerRef = useRef();

  useEffect(() => {
    const items = new DataSet(
      notes.map(note => ({
        id: note.id,
        content: note.title,
        start: note.date,
      }))
    );

    new Timeline(containerRef.current, items, {});
  }, [notes]);

  return <div ref={containerRef} style={{ height: '400px' }}></div>;
}

export default TimelineView;
