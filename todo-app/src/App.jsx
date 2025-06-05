// src/App.jsx
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskStats from './components/TaskStats';
import mockService from './services/mockService';
import apiService from './services/apiService';
import './App.css'; // Asegúrate de tener este archivo para estilos globales
import { Plus, User, LogOut, CheckCircle } from 'lucide-react';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [useMockService, setUseMockService] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [taskForm, setTaskForm] = useState({ name: '', description: '' });
    const [isEditing, setIsEditing] = useState(null);
    const [showTaskForm, setShowTaskForm] = useState(false);

    const currentService = useMockService ? mockService : apiService;

    useEffect(() => {
        if (isLoggedIn) {
            loadTasks();
        }
    }, [isLoggedIn, useMockService]); // Recargar tareas cuando cambie el servicio o el login

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');
        try {
            const result = await currentService.login(loginForm.username, loginForm.password);
            setUser(result.user);
            setIsLoggedIn(true);
            // loadTasks(); // Se llama en el useEffect después de isLoggedIn
        } catch (error) {
            setLoginError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadTasks = async () => {
        setLoading(true);
        try {
            const taskList = await currentService.getTasks();
            setTasks(taskList);
        } catch (error) {
            console.error('Error cargando tareas:', error);
            // Aquí podrías agregar un estado para errores de carga de tareas
        } finally {
            setLoading(false);
        }
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                const updatedTask = await currentService.updateTask(isEditing, taskForm);
                setTasks(tasks.map(t => t.id === isEditing ? updatedTask : t));
                setIsEditing(null);
            } else {
                const newTask = await currentService.createTask(taskForm);
                setTasks([...tasks, newTask]);
            }
            setTaskForm({ name: '', description: '' });
            setShowTaskForm(false);
        } catch (error) {
            console.error('Error con la tarea:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (id) => {
        setLoading(true);
        try {
            await currentService.deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error eliminando tarea:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 0 ? 1 : 0;
        setLoading(true);
        try {
            const updatedTask = await currentService.updateTask(task.id, { ...task, status: newStatus });
            setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
        } catch (error) {
            console.error('Error actualizando estado:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setTasks([]);
        setLoginForm({ username: '', password: '' });
        setShowTaskForm(false); // Ocultar formulario de tarea al cerrar sesión
        setIsEditing(null); // Resetear estado de edición
        setTaskForm({ name: '', description: '' }); // Resetear formulario de tarea
    };

    const handleEditTask = (task) => {
        setTaskForm({ name: task.name, description: task.description });
        setIsEditing(task.id);
        setShowTaskForm(true);
    };

    if (!isLoggedIn) {
        return (
            <Login
                useMockService={useMockService}
                setUseMockService={setUseMockService}
                loginForm={loginForm}
                setLoginForm={setLoginForm}
                handleLogin={handleLogin}
                loading={loading}
                loginError={loginError}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Todo App</h1>
                                <p className="text-white/70 text-sm">Gestiona tus tareas de forma inteligente</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-xl">
                                <span className="text-white/70 text-sm">
                                    {useMockService ? '🔄 Mock' : '🌐 API'}
                                </span>
                                <button
                                    onClick={() => setUseMockService(!useMockService)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                        useMockService ? 'bg-blue-500' : 'bg-gray-600'
                                    }`}
                                >
                                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                        useMockService ? 'translate-x-5' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                            <div className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-2xl">
                                <User className="w-5 h-5 text-white" />
                                <span className="text-white font-medium">{user?.username}</span>
                                <span className="px-2 py-1 bg-blue-500/30 text-blue-200 text-xs rounded-lg">
                                    {user?.role}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <TaskStats tasks={tasks} />
                <div className="mb-6">
                    <button
                        onClick={() => {
                            setShowTaskForm(!showTaskForm);
                            setTaskForm({ name: '', description: '' });
                            setIsEditing(null);
                        }}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nueva Tarea</span>
                    </button>
                </div>
                {showTaskForm && (
                    <TaskForm
                        isEditing={isEditing}
                        taskForm={taskForm}
                        setTaskForm={setTaskForm}
                        handleTaskSubmit={handleTaskSubmit}
                        loading={loading}
                        setShowTaskForm={setShowTaskForm}
                        setIsEditing={setIsEditing}
                    />
                )}
                <div className="space-y-4">
                    {loading && tasks.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            <p className="text-white/70 mt-4">Cargando tareas...</p>
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10">
                            <CheckCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">¡No hay tareas!</h3>
                            <p className="text-white/70">Crea tu primera tarea para comenzar</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                handleToggleStatus={handleToggleStatus}
                                handleEditTask={handleEditTask}
                                handleDeleteTask={handleDeleteTask}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
