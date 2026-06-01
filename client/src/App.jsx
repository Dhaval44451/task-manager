import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const API_URL = 'http://localhost:5000/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      if (editTaskId) {
        await axios.put(`${API_URL}/${editTaskId}`, { title: input });
        await fetchTasks();
        setEditTaskId(null);
      } else {
        const response = await axios.post(API_URL, { title: input });
        setTasks(prevTasks => [...prevTasks, response.data]);
      }

      setInput('');
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      if (editTaskId === id) {
        setEditTaskId(null);
        setInput('');
      }
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const startEditing = (task) => {
    setInput(task.title);
    setEditTaskId(task._id);
  };

  const cancelEdit = () => {
    setInput('');
    setEditTaskId(null);
  };

  return (
    <div style={styles.appWrap}>
      {/* Injecting styles directly into the document head */}
      <style>{`
        body { background-color: #f4f6f9; margin: 0; }
      `}</style>

      <div style={styles.appContainer}>
        <h1 style={styles.heading}>MERN Task Manager</h1>
        
        <form onSubmit={addTask} style={styles.taskForm}>
          <input 
            type="text" 
            placeholder="Write a new task..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.addBtn}>
            {editTaskId ? 'Update Task' : 'Add Task'}
          </button>
          {editTaskId && (
            <button type="button" onClick={cancelEdit} style={styles.cancelBtn}>
              Cancel
            </button>
          )}
        </form>

        {editTaskId && (
          <p style={styles.editMessage}>Editing task — make your changes and click Update Task, or Cancel to abort.</p>
        )}

        {taskToDelete && (
          <div style={styles.confirmOverlay}>
            <div style={styles.confirmBox}>
              <h2 style={styles.confirmTitle}>Confirm delete</h2>
              <p style={styles.confirmText}>
                Are you sure you want to delete this task?
                <strong> {taskToDelete.title}</strong>
              </p>
              <div style={styles.confirmActions}>
                <button onClick={() => deleteTask(taskToDelete._id)} style={styles.confirmYes}>Yes</button>
                <button onClick={cancelDelete} style={styles.confirmNo}>No</button>
              </div>
            </div>
          </div>
        )}

        <ul style={styles.taskList}>
          {tasks.map(task => (
            <li key={task._id} style={styles.taskItem}>
              <span style={styles.taskTitle}>{task.title}</span>
              <div style={styles.taskActions}>
                <button onClick={() => startEditing(task)} style={styles.editBtn}>Edit</button>
                <button onClick={() => confirmDelete(task)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- Inline Professional Styles ---
const styles = {
  appWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    paddingTop: '50px',
  },
  appContainer: {
    background: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '400px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginTop: '0',
    marginBottom: '20px',
  },
  taskForm: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
  },
  addBtn: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  taskList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
    fontSize: '16px',
    color: '#444',
  },
  taskTitle: {
    flex: 1,
    minWidth: 0,
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },
  taskActions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  },
  deleteBtn: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '8px',
  },
  editBtn: {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelBtn: {
    background: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  editMessage: {
    marginTop: '0',
    marginBottom: '16px',
    color: '#555',
    fontSize: '14px',
    background: '#eef6ff',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cfe2ff',
  },
  confirmOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.35)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  confirmBox: {
    background: 'white',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
    width: '360px',
    textAlign: 'center',
  },
  confirmTitle: {
    margin: '0 0 12px',
    fontSize: '20px',
    color: '#333',
  },
  confirmText: {
    margin: '0 0 20px',
    fontSize: '15px',
    color: '#444',
  },
  confirmActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  confirmYes: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  confirmNo: {
    background: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default App;