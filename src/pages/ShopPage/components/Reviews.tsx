import { motion, AnimatePresence } from "framer-motion";
import { Loading } from "../../../components/common/loading";
import { Button } from "../../../components/common";
import type { CommentModalData } from "../../../components/types/types";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import CommentModal from "../../Portfolio/components/CommentModal";
import CommentCard from "../../Portfolio/components/CommentCard";
import { supabase } from "../../../supabaseClient";
import { useProductComments } from "../../../hooks/ShopPageHooks/useProductComments";

const defaultAvatar =
  "https://icons.veryicon.com/png/o/miscellaneous/common-icons-31/default-avatar-2.png";

export default function ProductReviewsSection({
  productId,
}: {
  productId: number;
}) {
  const { comments, loading, error, refetch } = useProductComments(productId);
  const user = useAppSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  // Calculate average rating
  const averageRating =
    comments.length > 0
      ? (
          comments
            .filter((c) => c.rating !== null && !c.parent_comment_id)
            .reduce((sum, c) => sum + (c.rating || 0), 0) /
          comments.filter((c) => c.rating !== null && !c.parent_comment_id)
            .length
        ).toFixed(1)
      : "0.0";

  const handleAddReview = async (data: CommentModalData) => {
    if (!user) return;

    try {
      const reviewData = {
        product_id: productId,
        user_id: user.id,
        author: data.name,
        email: data.email,
        content: data.comment,
        rating: data.rating ?? null, // Convert undefined to null for database
        parent_comment_id: data.parentCommentId ?? null,
        avatar_url: defaultAvatar,
      };

      const { data: insertedData, error } = await supabase
        .from("product_comments")
        .insert([reviewData])
        .select();

      if (error) {
        console.error("❌ Error saving review:", error.message);
      } else {
        console.log("✅ Review saved successfully!", insertedData);
        setIsModalOpen(false);
        setReplyingTo(null);
        await refetch();
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl flex flex-col mx-auto bg-gradient-to-r from-blue-900 to-cyan-400 py-10 px-12">
        <div className="text-white">Error loading reviews: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl flex flex-col mx-auto bg-gradient-to-r from-blue-900 to-cyan-400">
      <section className="flex flex-col py-10 px-12 gap-4">
        <h1 className="relative text-3xl text-white font-semibold">
          Customer Reviews (
          {comments.filter((c) => !c.parent_comment_id).length})
          <span className="h-12 w-1.5 bg-white absolute -left-12 top-0"></span>
        </h1>

        {/* Average Rating Display */}
        {comments.length > 0 && (
          <div className="flex items-center gap-2 text-white">
            <span className="text-4xl font-bold">{averageRating}</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(parseFloat(averageRating))
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 fill-current"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm">
              ({comments.filter((c) => !c.parent_comment_id).length} reviews)
            </span>
          </div>
        )}
      </section>

      <section className="flex flex-col flex-wrap sm:justify-start justify-center w-full gap-4 md:px-4 px-2 pb-10">
        {loading ? (
          <Loading className="!bg-transparent" text="Loading Reviews..." />
        ) : comments.length > 0 ? (
          comments
            .filter((comment) => comment && !comment.parent_comment_id)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((comment) => {
              if (!comment || !comment.id) return null;

              const replies = comments.filter(
                (c) => c && c.parent_comment_id === comment.id
              );

              return (
                <div key={`review-${comment.id}`} className="w-full relative">
                  <CommentCard
                    author={comment.author || "Anonymous"}
                    avatarUrl={comment.avatar_url || defaultAvatar}
                    content={comment.content || ""}
                    timestamp={comment.timestamp || comment.created_at}
                    id={comment.id}
                    rating={comment.rating}
                    replayFunction={() => {
                      setReplyingTo(comment.id);
                      setIsModalOpen(true);
                    }}
                    replies={replies}
                  />

                  {/* Reply modal with animation */}
                  <AnimatePresence>
                    {isModalOpen && replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        layout
                        className="overflow-hidden"
                      >
                        <CommentModal
                          isOpen={true}
                          onClose={() => {
                            setIsModalOpen(false);
                            setReplyingTo(null);
                          }}
                          onSubmit={handleAddReview}
                          parentCommentId={replyingTo}
                          //   showRating={false}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
            .filter(Boolean)
        ) : (
          !loading && (
            <div className="text-white text-center py-8">
              No reviews yet. Be the first to review this product!
            </div>
          )
        )}

        {/* Add top-level review button */}
        {!isModalOpen && !loading && (
          <Button
            variant="primary"
            size="md"
            className="self-start ml-4 mt-6"
            onClick={() => {
              setReplyingTo(null);
              setIsModalOpen(true);
            }}
            disabled={!user}
          >
            {user ? "Write a Review" : "Login to Review"}
          </Button>
        )}

        {/* Top-level modal with animation */}
        <AnimatePresence>
          {isModalOpen && replyingTo === null && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              layout
              className="overflow-hidden"
            >
              <CommentModal
                isOpen={true}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddReview}
                parentCommentId={null}
                showRating={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
