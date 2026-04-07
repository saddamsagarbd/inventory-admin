import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    flag: "🇬🇧",
    name: "English",
  });

  const categoriesRef = useRef(null);
  const languageRef = useRef(null);

  const categories = [
    {
      name: "Fish & Meat",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/carp-fish_paxzrt.png",
      hasSubmenu: true,
    },
    {
      name: "Fruits & Vegetable",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340704/category%20icon/cabbage_n59uv3.png",
      hasSubmenu: true,
    },
    {
      name: "Biscuits & Cakes",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/cookie_1_ugipqa.png",
      hasSubmenu: true,
    },
    {
      name: "Household Tools",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/spray_pebsjt.png",
      hasSubmenu: true,
    },
    {
      name: "Pet Care",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340707/category%20icon/cat_tznwmq.png",
      hasSubmenu: true,
    },
    {
      name: "Beauty & Healths",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/beauty_vfbmzc.png",
      hasSubmenu: true,
    },
    {
      name: "Jam & Jelly",
      icon: "https://i.postimg.cc/rmLvfsMC/strawberry-jam-1.png",
      hasSubmenu: false,
    },
    {
      name: "Milk & Dairy",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340706/category%20icon/milk_dcl0dr.png",
      hasSubmenu: true,
    },
    {
      name: "Drinks",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/juice_p5gv5k.png",
      hasSubmenu: true,
    },
    {
      name: "Breakfast",
      icon: "https://res.cloudinary.com/ahossain/image/upload/v1658340705/category%20icon/bagel_mt3fod.png",
      hasSubmenu: true,
    },
  ];

  const languages = [
    { flag: "🇮🇩", name: "Bahasa Indonesia" },
    { flag: "🇩🇪", name: "Deutsch" },
    { flag: "🇻🇳", name: "Tiếng Việt" },
    { flag: "🇷🇺", name: "Русский" },
    { flag: "🇮🇳", name: "தமிழ்" },
    { flag: "🇹🇷", name: "Türkçe" },
    { flag: "🇮🇳", name: "हिन्दी" },
    { flag: "🇵🇹", name: "Português" },
    { flag: "🇯🇵", name: "日本語" },
    { flag: "🇨🇳", name: "中文" },
    { flag: "🇸🇦", name: "العربية" },
    { flag: "🇬🇧", name: "English" },
    { flag: "🇧🇩", name: "বাংলা" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setCategoriesOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setLanguageOpen(false);
  };
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Navigate to /products with category as a query parameter
    navigate(`/product-list?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="hidden md:block w-full bg-white border-b">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          {/* Categories Dropdown */}
          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="inline-flex items-center cursor-pointer text-gray-700 py-2 text-sm font-medium hover:text-(--color-primary) transition-colors"
            >
              Categories
              <ChevronDown
                className={`ml-1 w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 py-2 z-50">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-(--color-primary) transition-colors">
                        {category.name}
                      </span>
                    </div>
                    {category.hasSubmenu && (
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-(--color-primary) transition-colors" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            className="text-sm font-medium text-gray-700 hover:text-(--color-primary) transition-colors"
            to="/about-us"
          >
            About Us
          </Link>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-(--color-primary) transition-colors"
            to="/contact-us"
          >
            Contact Us
          </Link>

          {/* Pages Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="inline-flex text-gray-700 items-center py-2 text-sm font-medium hover:text-(--color-primary) transition-colors"
            >
              Pages
              <ChevronDown
                className={`ml-1 w-4 h-4 transition-transform ${pagesOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <a
            className="relative inline-flex items-center bg-red-100 px-3 py-1 rounded text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
            href="#offers"
          >
            Offers
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </a>
        </div>

        <div className="flex items-center space-x-6">
          {/* Language Dropdown */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center cursor-pointer text-gray-700 text-sm font-medium hover:text-(--color-primary) transition-colors"
            >
              {selectedLanguage.flag} {selectedLanguage.name}
              <ChevronDown
                className={`ml-1 w-4 h-4 transition-transform ${languageOpen ? "rotate-180" : ""}`}
              />
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 py-2 z-50 max-h-80 overflow-y-auto">
                {languages.map((language, index) => (
                  <button
                    key={index}
                    onClick={() => handleLanguageSelect(language)}
                    className="w-full flex items-center justify-between px-6 py-2 text-sm text-gray-900 hover:bg-gray-50 hover:text-(--color-primary) transition-colors"
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="ml-3 flex-1 text-left">
                      {language.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            className="text-sm font-medium text-gray-700 hover:text-(--color-primary) transition-colors"
            href="#privacy"
          >
            Privacy Policy
          </a>
          <a
            className="text-sm font-medium text-gray-700 hover:text-(--color-primary) transition-colors"
            href="#terms"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;
