import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Nav() {
  const location = useLocation();

  const NAV_STATE = {
    "/login": "Login",
    "/tokenize-car": "TOKENIZE",
    "/car-info": "Car TOKENLIZE",
    "/send-nft": "Send NFT",
    "/sell-car": "Sell Car",
    "/car-loan": "Car Loan",
    "/insurance-ai": "Insurance AI",
    "/insurance-claim": "Insurance Claim",
    "/dashboard": "Dashboard",
  };

  return <StyledWrapper>{NAV_STATE[location.pathname]}</StyledWrapper>;
}

export default Nav;

const StyledWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;
