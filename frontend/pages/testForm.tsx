import type { NextPage } from 'next'
import FormNewTask from '../components/task/FormNewTask'

const Demo: NextPage = () => {
    return (
        <>
            <div className="text-center text-green-700 font-bold bg-blue-400 left-5">
                Buatiful block A1
            </div>
            <FormNewTask/>
        </>
    )
}

export default Demo;