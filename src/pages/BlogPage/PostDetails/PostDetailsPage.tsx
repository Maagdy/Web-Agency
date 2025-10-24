import { useParams } from "react-router-dom";
import { useBlogPost } from "../../../hooks/BlogPageHooks/usePost";
import { Text } from "../../../components/common";
import { Loading } from "../../../components/common/loading";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import SocialMediaBar from "../../../components/UI/SocialMediaBar";
import { allSocialMediaIcons } from "../../../common/constants/socialIcons";
import PostNavigation from "../components/PostNavigation";
import RelatedPosts from "../components/RelatedPosts";

import PostCommentsSection from "../components/PostCommentsSection";

function PostDetailsPage() {
  const { slug } = useParams();
  const { post, loading } = useBlogPost(slug || "");
  console.log(post?.img_src);

  return (
    <>
      <div className="flex flex-col lg:px-10 gap-6 w-full">
        {loading ? (
          <Loading
            className="force-main-color !bg-transparent"
            text="Loading Post..."
          />
        ) : post ? (
          <>
            <div className="w-full">
              <img
                src={post?.img_src}
                alt={post?.title}
                className="w-full h-auto max-h-[800px] object-cover rounded-md"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="w-full">
              {post.content.split("\n").map((para, index) => (
                <Text key={index} variant="body" className="mb-4">
                  {para}
                </Text>
              ))}

              <div className="mt-8 flex flex-wrap gap-4">
                <section className="flex items-center gap-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md border border-cyan-400 ">
                    <PersonIcon className="text-[var(--mainColor)] text-xl" />
                  </div>
                  <span className="text-[var(--mainColor)] rounded-md text-sm px-3 py-2 border border-[var(--mainColor)]/30 hover:bg-[var(--mainColor)] hover:text-white transition-colors duration-300 cursor-pointer">
                    {post.properties?.author}
                  </span>
                </section>
                <section className="flex items-center gap-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md border border-cyan-400 ">
                    <QueryBuilderIcon className="text-[var(--mainColor)] text-xl" />
                  </div>
                  <span className="text-[var(--mainColor)] rounded-md text-sm px-3 py-2 border border-[var(--mainColor)]/30 hover:bg-[var(--mainColor)] hover:text-white transition-colors duration-300 cursor-pointer">
                    {post.date}
                  </span>
                </section>
                <div className="flex items-center justify-center w-10 h-10 rounded-md border border-cyan-400 ">
                  <LocalOfferIcon className="text-[var(--mainColor)] text-xl" />
                </div>
                {post.properties?.keywords?.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[var(--mainColor)] rounded-md text-sm px-3 py-2 border border-[var(--mainColor)]/30 hover:bg-[var(--mainColor)] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <section className="my-10 border-gray-300">
                <SocialMediaBar allSocialMediaIcons={allSocialMediaIcons} />
              </section>
              <section className="my-10 border-gray-300">
                <PostNavigation post={post} />
              </section>
            </div>
            <section className="mb-10">
              <RelatedPosts category={post.category} excludeId={post.id} />
            </section>
            <section className="mb-10">
              <PostCommentsSection postId={post.id.toString()} />
            </section>
          </>
        ) : (
          <Text variant="lead" className="text-center text-red-500 py-20">
            Post Not Found.
          </Text>
        )}
      </div>
    </>
  );
}
export default PostDetailsPage;
