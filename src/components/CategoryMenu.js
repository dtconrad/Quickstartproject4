import React from 'react';
import '../styles/Dashboard.css'; // Import shared styles for consistency

function CategoryMenu({ categories, onCategorySelect }) {
  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id} onClick={() => onCategorySelect(category._id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMenu;