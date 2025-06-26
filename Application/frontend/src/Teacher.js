// Teacher.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Teacher.css';

const CLASS_OPTIONS = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
];

function Teacher() {
  const [TeacherData, setTeacherData] = useState({ name: '', subject: '', class: '' });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const getData = () => {
    fetch(`${API_BASE_URL}/teacher`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => { getData(); }, [getData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...TeacherData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      // Update
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(TeacherData)
      };
      fetch(`${API_BASE_URL}/teacher/${editId}`, requestOptions)
        .then((res) => res.json())
        .then(() => {
          setEditId(null);
          setTeacherData({ name: '', subject: '', class: '' });
          getData();
        })
        .catch((err) => console.log(err));
    } else {
      // Add
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(TeacherData)
      };
      fetch(`${API_BASE_URL}/addteacher`, requestOptions)
        .then((res) => res.json())
        .then(() => {
          setTeacherData({ name: '', subject: '', class: '' });
          getData();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (teacher) => {
    setEditId(teacher.id);
    setTeacherData({
      name: teacher.name,
      subject: teacher.subject,
      class: teacher.class,
    });
  };

  const handleDelete = (id) => {
    setShowDelete(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    fetch(`${API_BASE_URL}/teacher/${deleteId}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => {
        setShowDelete(false);
        setDeleteId(null);
        getData();
      })
      .catch((err) => console.error('Error deleting data:', err));
  };

  const cancelDelete = () => {
    setShowDelete(false);
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-100 to-blue-100">
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="inline-block px-6 py-2 bg-white border-2 border-orange-400 rounded-xl shadow-lg font-bold text-lg text-orange-600 hover:bg-orange-50 transition-all duration-200">Home</Link>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-10 mb-10 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">{editId ? 'Edit Teacher' : 'Teacher Details'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Name:</label>
              <input type="text" name="name" value={TeacherData.name} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Subject:</label>
              <input type="text" name="subject" value={TeacherData.subject} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Class:</label>
              <select name="class" value={TeacherData.class} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                <option value="" disabled>Select Class</option>
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-orange-500 text-white px-10 py-3 rounded-lg font-bold hover:bg-orange-600 transition text-lg shadow-lg">{editId ? 'Update' : 'Submit'}</button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Teacher List</h2>
        <table className="w-full max-w-2xl bg-white/90 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-200">
              <th className="px-4 py-2">TeacherID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : "bg-white"}>
                <td className="px-4 py-2 text-center">{d.id}</td>
                <td className="px-4 py-2 text-center">{d.name}</td>
                <td className="px-4 py-2 text-center">{d.subject}</td>
                <td className="px-4 py-2 text-center">{d.class}</td>
                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" onClick={() => handleEdit(d)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={() => handleDelete(d.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this teacher?</p>
            <div className="flex justify-end gap-4">
              <button onClick={cancelDelete} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition">Cancel</button>
              <button onClick={confirmDelete} className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teacher;
