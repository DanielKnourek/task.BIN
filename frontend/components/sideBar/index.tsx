import Link from 'next/link'
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { MdKeyboardArrowDown, MdHome, MdFilterAlt } from 'react-icons/md';
import { ImDrawer } from 'react-icons/im'
import { IoCreate } from 'react-icons/io5'

import AuthStatus from '../auth/AuthStatus';
import useStore from '../../lib/hooks/useStore';
import { TasksContext } from '../../lib/hooks/useTasks';
import { DialogForm } from '../task/DialogForm';
import { DialogFilters } from './DialogFilters'

type SideBarProps = {
}

const SideBar = ({ }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const { data: session, status } = useSession();

    return (
        <nav
            className={`fixed top-0 left-0 h-screen w-16 flex flex-col text-white text-center
            bg-violet-xl shadow-lg transform transition duration-500 ${!isOpen && 'translate-y-[calc(100%-64px)]'}`}
        >
            <button
                onClick={e => { setIsOpen(!isOpen) }}
            >
                <SideBarItem
                    className={!isOpen ? 'rotate-180 transform transition duration-500' : ''}
                    icon={<MdKeyboardArrowDown size={42} />}
                    text='Hide menu' />
            </button>
            <Divider />
            {/* Nav */}
            <Link href={"/"} passHref>
                <a>
                    <SideBarItem icon={<MdHome size={28} />} text='Go → Home' />
                </a>
            </Link>
            <Link href={"/my"} passHref>
                <a>
                    <SideBarItem icon={<ImDrawer className='-translate-y-0.5' size={21} />} text='Go → My tasks' />
                </a>
            </Link>
            <SideBarTools />

            <div className='flex-grow'></div>
            <Divider />
            {/* Account */}
            <AuthStatus />
        </nav>
    )
}

type SideBarItemProps = {
    icon: JSX.Element,
    text: string,
    className?: string,
}

export const SideBarItem = ({ icon, text, className }: SideBarItemProps) => {

    return (
        <div
            className={`sidebar-icon group ${className ? className : ''}`}
        >
            {icon}
            <span
                className='sidebar-tooltip group-hover:scale-100'
            >
                {text}
            </span>
        </div>
    )
}

const Divider = () => <hr className="sidebar-hr" />;


const SideBarTools = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const { setListFilters } = useStore();




    return (
        <>
            {/* Tools */}
            <Divider />

            {/* Create new Task btn */}
            {
                status === "authenticated" && session &&
                <>
                    <button
                        onClick={e => { setIsOpen(!isOpen) }}
                    >
                        <SideBarItem
                            className={''}
                            icon={<IoCreate size={21} />}
                            text='Create new task' />
                    </button>
                    <TasksContext.Provider value={{
                        type: 'create',
                        access: 'private',
                        message: {
                            title: 'Create Task',
                            success: "Successfully created.",
                            error: "Could not create Task.",
                        },
                        form: {
                            isOpen, setIsOpen,
                        }
                    }}>
                        <DialogForm />
                    </TasksContext.Provider>
                </>
            }

            {/* Set filters btn */}
            <button
                // onClick={e => { setListFilters({ type: 'set', data: ['completed'] }) }}
                onClick={e => { setIsFiltersOpen(!isFiltersOpen) }}
            >
                <SideBarItem
                    className={''}
                    icon={<MdFilterAlt size={21} />}
                    text='Select Filters' />
            </button>
            <DialogFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
        </>
    )
}

export default SideBar;