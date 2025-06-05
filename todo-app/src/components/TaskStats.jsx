// src/components/TaskStats.jsx
import React from 'react';

export default function TaskStats({ tasks }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 1).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 flex items-center justify-between">
                <div>
                    <p className="text-white/70 text-sm">Total Tareas</p>
                    <h2 className="text-3xl font-bold text-white mt-1">{totalTasks}</h2>
                </div>
                <span className="p-3 bg-blue-500/20 text-blue-200 rounded-xl">📊</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 flex items-center justify-between">
                <div>
                    <p className="text-white/70 text-sm">Completadas</p>
                    <h2 className="text-3xl font-bold text-white mt-1">{completedTasks}</h2>
                </div>
                <span className="p-3 bg-green-500/20 text-green-200 rounded-xl">✅</span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 flex items-center justify-between">
                <div>
                    <p className="text-white/70 text-sm">Pendientes</p>
                    <h2 className="text-3xl font-bold text-white mt-1">{pendingTasks}</h2>
                </div>
                <span className="p-3 bg-amber-500/20 text-amber-200 rounded-xl">⏰</span>
            </div>
        </div>
    );
}