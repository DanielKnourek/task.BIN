import { useSession, signIn, signOut } from "next-auth/react";
import { MdAccountCircle, MdLogin, MdLogout } from "react-icons/md";
import { SideBarItem } from "../sideBar";

const AuthStatus = function (): JSX.Element {
  const { data: session, status } = useSession();
  let displayName = "{user}";

  if (status === "authenticated" && session) {
    displayName = (session.user.name === undefined) ? displayName : session.user.name;
    return (
      <>
        <SideBarItem icon={<MdAccountCircle size={28} />} text={`Signed as ${displayName}`}/>
        <button onClick={() => signOut()}
          name="Sign-out"
        >
          <SideBarItem icon={<MdLogout size={28} />} text='Sign out' />
        </button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}
        name="Sign-in"
      >
        <SideBarItem icon={<MdLogin size={28} />} text='Sign in' />
      </button>
    </>
  )
}

export default AuthStatus;
