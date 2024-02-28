import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Head = styled.div `
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0.5% 0 0.5% 0;
`;

const HeadLine = styled.h1 `
  text-align: center;
  color: white;
  grid-column: 3;
  margin: 0;
  margin: auto;
`;

const LogInn = styled.h2 `
  text-align: center;
  color: white;
  grid-column: 5;
  margin: auto;
  font-size: medium;
`;

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <Head>
        <HeadLine>Welcome</HeadLine>
        <nav>
          { user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          { !user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
          </div>
          )}
        </nav>
      </Head>
    </header>
  )
}

export default Header