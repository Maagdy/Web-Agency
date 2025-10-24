import { Outlet } from "react-router-dom";
import PageBackground from "../../components/UI/PageBackground";

const PortfolioLayout = () => {
  return (
    <>
      <PageBackground />
      <Outlet />
    </>
  );
};

export default PortfolioLayout;
