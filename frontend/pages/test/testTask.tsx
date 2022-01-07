import type { NextPage } from 'next'
import FormNewTask from '../../components/task/FormNewTask'
import TaskList from '../../components/task/TaskList';
import useTasks from '../../lib/hooks/useTasks';

const Demo: NextPage = () => {
    

    return (
        <>
            <div className="text-center text-green-700 font-bold bg-blue-400 left-5">
                Buatiful block A1
            </div>
            {/* <FormNewTask/> */}
            <div className="antialiased bg-gray-200 text-gray-900 font-sans p-6">
                <TaskList access='public' />
            </div>
        </>
    )
}

export default Demo;