import useWindowSize from "@/hooks/useWindowSize";
import theme from "@/styles/theme";
import { useEffect } from "react";
import styled from "styled-components";
import Nav from "@/components/common/Nav";
import { Outlet } from "react-router-dom";

let vh = 0;

function Layout() {
  const windowSize = useWindowSize();

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [windowSize.height]);

  return (
    <StyledLayout>
      <Nav />
      <Outlet />
    </StyledLayout>
  );
}

export default Layout;

const StyledLayout = styled.main`
  min-height: calc(var(--vh, 1vh) * 100);
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  background-color: ${theme.color.white};
`;
