import { motion, AnimatePresence } from "framer-motion";
import { Loading } from "../../../components/common/loading";

import { Button } from "../../../components/common";
import type { CommentModalData } from "../../../components/types/types";
import { usePostComments } from "../../../hooks/BlogPageHooks/usePostComments";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import CommentModal from "../../Portfolio/components/CommentModal";
import CommentCard from "../../Portfolio/components/CommentCard";
import { supabase } from "../../../supabaseClient";

const defaultAvatar =
  "https://icons.veryicon.com/png/o/miscellaneous/common-icons-31/default-avatar-2.png";

export default function PostCommentsSection({ postId }: { postId: string }) {
  const { comments, loading, error, refetch } = usePostComments(postId);
  const user = useAppSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleAddComment = async (data: CommentModalData) => {
    if (!user) return;

    try {
      const commentData = {
        post_id: postId,
        user_id: user.id,
        author: data.name,
        email: data.email,
        content: data.comment,
        parent_comment_id: data.parentCommentId ?? null,
        avatar_url: defaultAvatar,
      };

      const { data: insertedData, error } = await supabase
        .from("blog_comments")
        .insert([commentData])
        .select();

      if (error) {
        console.error("❌ Error saving comment:", error.message);
      } else {
        console.log("✅ Comment saved successfully!", insertedData);
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
        <div className="text-white">Error loading comments: {error}</div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl flex flex-col mx-auto bg-gradient-to-r from-blue-900 to-cyan-400">
      <section className="flex  py-10 px-12">
        <h1 className="relative text-3xl text-white font-semibold">
          Comments ({comments.length})
          <span className="h-12 w-1.5 bg-white absolute -left-12 top-0"></span>
        </h1>
      </section>

      <section className="flex flex-col flex-wrap sm:justify-start justify-center w-full gap-4 md:px-4 px-2 pb-10">
        {loading ? (
          <Loading className="!bg-transparent" text="Loading Project..." />
        ) : comments.length > 0 ? (
          comments
            .filter((comment) => comment && !comment.parent_comment_id)
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
            .map((comment) => {
              if (!comment || !comment.id) return null;

              const replies = comments.filter(
                (c) => c && c.parent_comment_id === comment.id
              );

              return (
                <div key={`comment-${comment.id}`} className="w-full relative">
                  <CommentCard
                    author={comment.author || "Anonymous"}
                    avatarUrl={comment.avatar_url || defaultAvatar}
                    content={comment.content || ""}
                    timestamp={comment.timestamp || comment.created_at}
                    id={comment.id}
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
                          onSubmit={handleAddComment}
                          parentCommentId={replyingTo}
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
              No comments yet. Be the first to comment!
            </div>
          )
        )}

        {/* Add top-level comment button */}
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
            {user ? "Add Comment" : "Login to Comment"}
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
                onSubmit={handleAddComment}
                parentCommentId={null}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
