import MainHeader from "./MainHeader";
import NavigationBar from "./NavigationBar";
import MobileBottomNav from "./MobileBottomNav";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import TopBar from "./TopBar";

const Header = () => {
  const { getCartQty } = useContext(CartContext);

  const cartCount = getCartQty() || 0;

  return (
    <div className="sticky top-0 z-50 w-full">
      <TopBar />
      <MainHeader cartCount={cartCount} />
      <NavigationBar />
      <MobileBottomNav cartCount={cartCount} />
    </div>
  );
};

export default Header;
