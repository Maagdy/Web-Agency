import { useParams } from "react-router-dom";
import IosShareIcon from "@mui/icons-material/IosShare";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import RelatedProjects from "./RelatedProjects";
import { Button, Text } from "../../../components/common";
import { allSocialMediaIcons } from "../../../common/constants/socialIcons";
import { useProject } from "../../../hooks/PortfolioPageHooks/useProject";
import { Loading } from "../../../components/common/loading";
import SocialMediaBar from "../../../components/UI/SocialMediaBar";
import ProjectNavigation from "./ProjectNavigation";
import ProjectCommentsSection from "./ProjectCommentsSection";

function PortfolioProjectDetails() {
  const { projectName } = useParams<{ projectName: string }>();

  const { project, error, loading } = useProject(projectName!);

  // ✅ Loading state
  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        role="status"
        aria-busy="true"
      >
        <Loading
          className="force-main-color !bg-transparent"
          text="Loading Project..."
        />
      </div>
    );
  }

  // ✅ Error state
  if (error || !project) {
    return (
      <Text variant="lead" className="text-center text-red-500 py-20">
        Failed to load project details.
      </Text>
    );
  }

  return (
    <div>
      {/* Main content */}
      <div className="flex flex-col-reverse md:flex-row md:items-start md:gap-8 py-10 xl:px-24 sm:px-14 px-4">
        {/* Left Info */}
        <div className="w-full md:w-1/2 max-w-xl mx-auto mt-8 space-y-6 px-4">
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-center md:text-left p-4 sm:p-6 md:p-0">
            Web design encompasses many different skills and disciplines in the
            production and maintenance of websites. The design process relates
            to the front-end design of a website.
          </p>

          {/* Properties */}
          <div className="space-y-4">
            {Object.entries(project.properties || {})
              .filter(([key]) => key !== "keywords")
              .map(([key, value]) => (
                <div className="flex items-center gap-2 w-full" key={key}>
                  <span className="text-gray-600 whitespace-nowrap capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="flex-1 border-b-2 border-cyan-200" />
                  <span className="text-[var(--mainColor)]/60 font-medium whitespace-normal sm:whitespace-nowrap">
                    {Array.isArray(value) ? value.join(" / ") : String(value)}
                  </span>
                </div>
              ))}

            <Button
              variant="primary"
              size="lg"
              iconRight={<IosShareIcon className="text-base sm:text-lg" />}
              className="mt-10"
            >
              Live Preview
            </Button>

            {/* Tags */}
            {project.properties?.keywords && (
              <div className="mt-8 flex flex-wrap gap-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[var(--mainColor)]/30 bg-[var(--mainColor)]/5">
                  <LocalOfferIcon className="text-[var(--mainColor)] text-xl" />
                </div>
                {project.properties.keywords.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-white text-[var(--mainColor)] text-sm px-3 py-2 border border-[var(--mainColor)]/30 hover:bg-[var(--mainColor)] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Image */}
        <section className="w-full md:w-1/2">
          <img
            src={project.img_src}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
            alt={project.title}
          />
        </section>
      </div>

      {/* Social Media */}
      <SocialMediaBar allSocialMediaIcons={allSocialMediaIcons} />

      {/* Navigation */}
      <ProjectNavigation project={project} />

      {/* Related & Comments */}
      <div className="mb-10">
        <RelatedProjects category={project.category} projectId={project.id} />
      </div>
      <div className="mb-10">
        <ProjectCommentsSection projectId={project.id} />
      </div>
    </div>
  );
}

export default PortfolioProjectDetails;
