import type { NextPage } from 'next'
import Head from 'next/head'
import TaskList from '../components/task/TaskList';
import SideBar from '../components/sideBar';

const PageMy: NextPage = () => {

    return (
        <div
            className="flex flex-col min-h-screen bg-gray-200"
        >
            <Head>
                <title>My tasks - task.BIN</title>
                <html lang='en'/>
            </Head>
            <SideBar />
            
            <div className="antialiased text-gray-900 font-sans p-4">
                <TaskList access='private' />
            </div>
            <div className='flex-grow'></div>
        </div>
    )
}

export default PageMy;