import { Link } from "react-router-dom"; // 1. Import Link
import Logo from "../assets/logo/52-bazaar-logo.webp";

const MyLogo = () => {
  return (
    /* 2. Wrap everything in a Link pointing to "/" */
    <Link
      to="/"
      className="flex items-center justify-center gap-3 mb-2 cursor-pointer transition-opacity hover:opacity-80"
    >
      <img src={Logo} alt="52Bazar Logo" className="w-32 h-auto" />
    </Link>
  );
};

export default MyLogo;
