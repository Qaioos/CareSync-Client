import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAxiosPrivate } from "../../../Hook/RequestsWithToken/useAxiosPrivet";

import type { Task } from "../../../Types/api.responses";
import type { AxiosError } from "axios";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void; 
    onAdd: (newTask: Task) => void; 
}
interface Worker{
    
    id:  number,
    username:string
    
}

const TaskModal:React.FC<TaskModalProps> = ({ isOpen, onClose, onAdd }) => {
    const axiosPrivate = useAxiosPrivate();

    const [formData, setFormData] = useState<Task>({
        Title: "",
        Room: "",
        PatientName: "",
        Priority: "Normal",
        DueTime: "",
        Worker: "",
        Description: "",
        IsCompleted: false,
    });

    const [workersList, setworkersList] = useState<Worker[]>([]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onAdd(formData);
        onClose()
    };

    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });

                if (isMounted) {
                    setworkersList(response.data);
                }
            } catch (error) {
                const err = error as AxiosError
                    console.log(err.message);
                
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [isOpen, axiosPrivate]);

    return (
        <AnimatePresence>
            {isOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* الخلفية المغبشة */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* جسم النافذة المنبثقة */}
                    <motion.div
                        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6 z-10 border border-gray-100 dark:border-gray-700"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.4 }}
                    >
                        {/* button close X */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-lg"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            Add a new medical mission 
                        </h3>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {/* Title Filed */}
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    name="Title"
                                    value={formData.Title}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Room Number */}
                            <div>
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                                    Room Number
                                </label>
                                <input
                                    type="text"
                                    name="Room"
                                    value={formData.Room}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                                    Patient Name
                                </label>
                                <input
                                    type="text"
                                    name="PatientName"
                                    value={formData.PatientName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                                    Priority
                                </label>
                                <select
                                    name="Priority"
                                    value={formData.Priority}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="Critical_Due_Soon"> Critical_Due_Soon</option>
                                    <option value="Normal">Normal</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                                    Due Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="DueTime"
                                    value={formData.DueTime}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                                    Worker
                                </label>
                                <select
                                    name="Worker"
                                    value={formData.Worker}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">
                                        Choose a nurse/doctor...
                                    </option>
                                    {workersList &&
                                        workersList.map((worker) => (
                                            <option
                                                key={worker.id}
                                                value={worker.id}
                                            >
                                                {worker.username}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="Description"
                                    value={formData.Description}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none h-20 resize-none dark:bg-gray-700 dark:text-white"
                                ></textarea>
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-2 mt-2 border-t pt-4 border-gray-100 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                                >
                                    Add Task 
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TaskModal;
