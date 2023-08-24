import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated, logIn, logOut, userMetadata } = useAuth()

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>{userMetadata?.username}</p>
          <img src={userMetadata?.imageUrl} alt="" />
          <button onClick={() => logOut()}>Log Out</button>
        </div>
      ) : (
        <button onClick={() => logIn()}>Log In</button>
      )}
    </div>
  )
}

export default HomePage
