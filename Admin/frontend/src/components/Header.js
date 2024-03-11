import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const HeadLine = styled.h1 `
  text-align: center;
  color: white;
  grid-column: 3;
  margin: 0;
  margin: auto;
`;

const Buttons = styled.button `
  text-align: center;
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
      <nav>
        <HeadLine>Welcome</HeadLine>
        { user && (
          <div className="Grid">
            <span className="Name">{user.name}</span>
            <Buttons onClick={handleClick}>Log out</Buttons>
          </div>
        )}
        { !user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header;
