import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    // Lấy danh sách tất cả ảnh từ backend khi component được mount
    const fetchImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/images');
        setGallery(res.data);  // Lưu danh sách ảnh vào state
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setGallery([...gallery, res.data]);  // Thêm ảnh mới vào gallery
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Gallery</h2>
      <div className="gallery-grid">
        {gallery.map((img, index) => (
          <img key={index} src={img.url} alt="Uploaded" style={{ width: '200px', height: '200px' }} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
