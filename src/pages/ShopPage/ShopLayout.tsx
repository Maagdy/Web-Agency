import { Outlet } from "react-router-dom";
import PageBackground from "../../components/UI/PageBackground";

const ShopLayout = () => {
  return (
    <>
      <PageBackground />
      <Outlet />
    </>
  );
};

export default ShopLayout;
