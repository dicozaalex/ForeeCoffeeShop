import React from "react"
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const SignOutComponent = () => {
    const signOut = useSignOut()

    return (
      <button onClick={() => signOut()}>Sign Out</button>
    )
}

export default SignOutComponent