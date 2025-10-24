import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import { useNavigate, useLocation } from "react-router-dom";
import { banner } from "../../common/assets/images";

const PageBackground: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formatTitle = (str: string) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const pageTitle =
    pathSegments.length > 0
      ? formatTitle(pathSegments[pathSegments.length - 1])
      : "Home";

  return (
    <div
      className="flex flex-col items-center justify-center home-background"
      style={{
        minHeight: "50vh",
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* Page title from last path segment */}
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase">
        {pageTitle}
      </h1>

      {/* Breadcrumbs */}
      <div className="flex flex-wrap justify-center items-center font-bold text-sm mt-8 space-x-2 text-cyan-400">
        <button onClick={() => navigate("/")} className="cursor-pointer">
          <HomeOutlinedIcon />
        </button>

        {pathSegments.map((segment, index) => {
          const pathUpToHere = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <div key={pathUpToHere} className="flex items-center gap-2">
              <ArrowRightAltSharpIcon />
              {isLast ? (
                <span className="cursor-default">{formatTitle(segment)}</span>
              ) : (
                <button
                  onClick={() => navigate(pathUpToHere)}
                  className="cursor-pointer hover:underline"
                >
                  {formatTitle(segment)}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageBackground;
