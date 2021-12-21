import { useSession, signIn, signOut } from "next-auth/react";

const AuthStatus = function (): JSX.Element {
  const { data: session, status } = useSession();
  let displayName = "{user}";

  if (status === "authenticated" && session) {
    displayName = (session.user.name === undefined) ? displayName : session.user.name;
    return (
      <>
        <br />
        Signed in as {displayName}<br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default AuthStatus;
