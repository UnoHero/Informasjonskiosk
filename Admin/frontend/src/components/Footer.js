import styled from "styled-components";

const FooterText = styled.p `
  padding: 10px;
`;


const Footer = () => {

    return (
      <footer>
        <div className="Footer">
        <FooterText>&#169; Scott</FooterText>
        </div>
      </footer>
    )
  }
  
  export default Footer