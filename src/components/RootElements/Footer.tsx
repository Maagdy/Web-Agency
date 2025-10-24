import { useNavigate } from "react-router-dom";
import { footerItems } from "../../common/constants/navItems";
import { socialMediaIcons } from "../../common/constants/socialIcons";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { banner, logo } from "../../common/assets/images";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer
      style={{
        backgroundImage: `url(${banner})`,
      }}
      className="home-background pb-20 md:pb-0 flex flex-col items-center w-full px-6 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="max-w-7xl flex flex-col lg:flex-row justify-between items-center md:items-start w-full py-12 lg:py-16 gap-12 lg:gap-20 xl:gap-28">
        <div className="flex flex-col gap-4 items-center lg:items-start lg:max-w-md">
          <img
            className="w-34 lg:w-32 xl:w-36 2xl:w-40 cursor-pointer object-contain"
            onClick={() => navigate("/")}
            src={logo}
            loading="lazy"
            alt="XTRAWEB Logo"
          />
          <p className="text-sm sm:text-base text-center lg:text-left lg:text-lg xl:text-lg text-white/70 mt-6 leading-relaxed">
            XTRA WordPress theme is the last theme you will ever have to buy for
            your business. More powerful and easy to use than any other themes
            on the market with incredible features and friendly support.
          </p>
          <div className="flex gap-3 mt-6">
            {socialMediaIcons.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center text-white bg-[var(--mainColor)] rounded-md transition-all duration-300 ${social.hoverColor}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-start gap-12 lg:gap-20 xl:gap-28 w-full">
          {footerItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center lg:items-start w-full lg:w-auto"
            >
              <h1 className="text-white font-bold text-lg mb-2">
                {item.title}
              </h1>
              <span className="w-full h-[2px] bg-cyan-400 mb-4"></span>
              <ul className="flex flex-col gap-2 w-full">
                {item.links.map((link, index) => (
                  <li
                    key={index}
                    className="text-sm text-nowrap sm:text-base lg:text-lg xl:text-lg text-white/70 hover:text-white cursor-pointer transition-colors duration-300 leading-relaxed"
                    onClick={() => navigate(link.path)}
                  >
                    <ArrowForwardIosRounded
                      style={{
                        fontSize: "0.7rem",
                        marginRight: "8px",
                      }}
                    />
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="w-full border-t border-white/20" />

      <section className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full py-6 text-sm text-white/70 max-w-7xl">
        <p>© 2024 Web Design Agency. All rights reserved.</p>
        <p className="text-center sm:text-right">
          Privacy Policy | Terms of Service
        </p>
      </section>
    </footer>
  );
}

export default Footer;
