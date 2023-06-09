import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbums();
  }, []);

  const fetchPhotos = async (albumId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    fetchPhotos(album.id);
  };

  const closePopup = () => {
    setSelectedAlbum(null);
  };

  return (
    <div>
      <h1 className="header">Albums</h1>
      <div className="album-grid">
        {albums.map((album) => (
          <div
            key={album.id}
            className="album-card"
            onClick={() => handleAlbumClick(album)}
          >
            {album.title}
          </div>
        ))}
      </div>
      {selectedAlbum && (
        <div className="popup">
          <h2>{selectedAlbum.title}</h2>
          <div className="photo-grid">
            {photos.map((photo) => (
              <img
                key={photo.id}
                className="photo"
                src={photo.thumbnailUrl}
                alt={photo.title}
              />
            ))}
          </div>
          <button className="close-button" onClick={closePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
