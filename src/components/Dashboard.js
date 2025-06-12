import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryMenu from './CategoryMenu'; // Import the CategoryMenu component
import '../styles/Dashboard.css';

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  // Fetch questions for the selected category
  const fetchQuestions = async (categoryId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/api/questions/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(response.data);
      setSelectedCategory(categoryId);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>SEC Football Forum - Dashboard</h1>
      {/* Render the CategoryMenu component */}
      <CategoryMenu categories={categories} onCategorySelect={fetchQuestions} />
      <div className="questions">
        <h2>Questions</h2>
        {selectedCategory ? (
          questions.map((question) => (
            <div key={question._id}>
              <h3>{question.title}</h3>
              <p>{question.content}</p>
            </div>
          ))
        ) : (
          <p>Select a category to view questions</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;