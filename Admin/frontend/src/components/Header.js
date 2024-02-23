import styled from "styled-components";

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

  return (
    <header>
      <Head>
        <HeadLine>Welcome</HeadLine>
        <LogInn>LogInn</LogInn>
      </Head>
    </header>
  )
}

export default Header