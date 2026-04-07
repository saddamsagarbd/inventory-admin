import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronUp,
} from "lucide-react";
import Logo from "../assets/logo/52-bazaar-logo.webp";

export function CompanyInfo() {
  return (
    <div className="space-y-4">
      {/* Logo Placeholder */}
      <div className="flex items-center gap-2 mb-6">
        <img src={Logo} alt="52Bazar Logo" className="w-20 h-auto" />
      </div>

      {/* Contact Information */}
      <div className="space-y-3 text-black">
        <p className="text-sm">
          <span className="font-semibold">Address:</span> 60-49 Road 11378 New
          York
        </p>
        <p className="text-sm">
          <span className="font-semibold">Phone:</span> +65 11.188.888
        </p>
        <p className="text-sm">
          <span className="font-semibold">Email:</span>{" "}
          info.deercreative@gmail.com
        </p>
      </div>

      {/* Social Media Icons */}
      <div className="flex gap-3 pt-4">
        <button className="w-10 h-10 bg-gray-100 hover:bg-(--color-primary) hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
          <Facebook className="w-4 h-4" color="gray" />
        </button>
        <button className="w-10 h-10 bg-gray-100 hover:bg-(--color-primary) hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
          <Twitter className="w-4 h-4" color="gray" />
        </button>
        <button className="w-10 h-10 bg-gray-100 hover:bg-(--color-primary) hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
          <Linkedin className="w-4 h-4" color="gray" />
        </button>
        <button className="w-10 h-10 bg-gray-100 hover:bg-(--color-primary) hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
          <Instagram className="w-4 h-4" color="gray" />
        </button>
      </div>
    </div>
  );
}
