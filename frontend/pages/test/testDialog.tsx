import type { NextPage } from 'next'
import { useState } from 'react';
import { DialogForm } from '../../components/task/DialogForm';
import FormNewTask from '../../components/task/FormNewTask'
import TaskList from '../../components/task/TaskList';
import useTasks from '../../lib/hooks/useTasks';

const Demo: NextPage = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <div className="text-center text-green-700 font-bold bg-blue-400 left-5">
                Buatiful block A1
            </div>
            <button
					className="w-64 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
					onClick={() => setIsOpen(!isOpen)}
				>
					Open Modal
				</button>
                <span>Hello</span>
                <div>
            <DialogForm/>

                </div>
        </>
    )
}

export default Demo;