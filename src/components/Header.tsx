import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import logo from "../public/logo.png";

function Header() {
  const { i18n } = useTranslation();

  // Function to toggle the application language between English and Czech
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  // Get the current language from the i18n instance
  const currentLanguage = i18n.language;

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
      {/* inner content */}
      <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
        {/* Logo image */}
        <div className="max-w-[250px] w-full flex">
          <img src={logo} alt="logo" className="rounded-md size-12" />
        </div>
        {/* Application title */}
        <div className="rounded-md h-8 w-[200px] items-center justify-cente text-zinc-900 text-lg font-semibold hidden sm:block">
          NFCtron Keynote 2025
        </div>
        
         {/* Language toggle button */}
        <div className="max-w-[250px] w-full flex justify-end">
          <Button
            onClick={() =>
              changeLanguage(currentLanguage === "en" ? "cz" : "en")
            }
            className="rounded-full p-3"
          >
            {currentLanguage === "en" ? "CZ" : "EN"}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
