import React, { useState } from 'react';
import { Upload, X, Plus, Tag, Image as ImageIcon } from 'lucide-react';
import '../styles/AddItem.css';

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: []
  });

  const [images, setImages] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Recreation',
    'Books & Media',
    'Automotive',
    'Toys & Games',
    'Health & Beauty',
    'Other'
  ];

  const conditions = [
    'New',
    'Like New',
    'Good',
    'Fair',
    'Poor'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            url: e.target.result,
            file: file
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', { ...formData, images });
      alert('Item listed successfully!');
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        type: '',
        size: '',
        condition: '',
        tags: []
      });
      setImages([]);
    }, 2000);
  };

  const isFormValid = formData.title && formData.description && formData.category && formData.condition;

  return (
    <div className="add-item-container">
      <div className="add-item-header">
        <h1>Add New Item</h1>
        <p>Fill in the details below to list your item</p>
      </div>

      <form onSubmit={handleSubmit} className="add-item-form">
        {/* Image Upload Section */}
        <div className="form-section">
          <h2>Images</h2>
          <div className="image-upload-area">
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="image-input"
            />
            <label htmlFor="image-upload" className="upload-label">
              <Upload className="upload-icon" />
              <span>Click to upload images or drag and drop</span>
              <small>PNG, JPG, GIF up to 10MB each</small>
            </label>
          </div>

          {images.length > 0 && (
            <div className="image-preview-grid">
              {images.map((image) => (
                <div key={image.id} className="image-preview">
                  <img src={image.url} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="remove-image-btn"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter item title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item in detail"
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="e.g., Laptop, Shirt, Book"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="e.g., Large, 15 inch, 250ml"
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition">Condition *</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                required
              >
                <option value="">Select condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="form-section">
          <h2>Tags</h2>
          <div className="tag-input-container">
            <div className="tag-input-wrapper">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tags to help people find your item"
                className="tag-input"
              />
              <button
                type="button"
                onClick={addTag}
                className="add-tag-btn"
                disabled={!currentTag.trim()}
              >
                <Plus size={16} />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="tags-list">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <Tag size={12} />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="remove-tag-btn"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`submit-btn ${isFormValid ? 'enabled' : 'disabled'}`}
          >
            {isSubmitting ? 'Listing Item...' : 'List Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;