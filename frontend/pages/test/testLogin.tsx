import type { NextPage } from 'next'
import AuthStatus from '../../components/auth/AuthStatus'

const Demo: NextPage = () => {
    return (
        <>
        <div className="text-center text-green-700 font-bold bg-blue-400 left-5">
            Buatiful block 13
        </div>
        <AuthStatus />
        </>
    )
}

export default Demo;