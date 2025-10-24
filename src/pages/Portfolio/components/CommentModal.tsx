import React, { useState } from "react";
import { Send } from "lucide-react";
import { Rating } from "@mui/material";
import { Button } from "../../../components/common";
import { useAppSelector } from "../../../redux/hooks";
import type { CommentModalProps } from "../../../components/types/types";

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  parentCommentId = null,
  showRating = false,
}) => {
  const user = useAppSelector((state) => state.auth.user);

  const isGuest = user?.is_guest;
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasSignedUpEmail =
      user?.email && user?.email !== "no-reply@example.com";

    if (isGuest && !hasSignedUpEmail && (!name.trim() || !comment.trim()))
      return;
    if (!comment.trim()) return;

    // If rating is shown and required, validate it
    if (showRating && !parentCommentId && rating === null) {
      alert("Please provide a rating");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit({
      name: isGuest
        ? hasSignedUpEmail
          ? user?.full_name || "Anonymous"
          : name.trim()
        : user?.full_name || "Anonymous",
      email: user?.email || "no-reply@example.com",
      comment: comment.trim(),
      rating:
        showRating && !parentCommentId && rating !== null ? rating : undefined,
      parentCommentId,
    });

    if (isGuest && !hasSignedUpEmail) {
      setName("");
    }
    setComment("");
    setRating(null);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  const hasSignedUpEmail =
    user?.email && user?.email !== "no-reply@example.com";

  return (
    <div className="bg-transparent w-full flex flex-col mx-auto py-10 px-6">
      <section className="flex items-start justify-between w-full mb-8 text-white">
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">
            {parentCommentId
              ? "Reply to Comment"
              : showRating
              ? "Add a Review"
              : "Add a Comment"}
          </h2>
          <p className="text-gray-300 max-w-lg">
            Required fields are marked <span className="text-red-500">*</span>
          </p>
        </section>
        <button className="text-white text-lg cursor-pointer" onClick={onClose}>
          Cancel Reply
        </button>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
        {/* Rating - only show for main comments (not replies) when showRating is true */}
        {showRating && !parentCommentId && (
          <section className="flex flex-col gap-2">
            <label className="text-white text-lg font-medium">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#goldenrod",
                },
                "& .MuiRating-iconHover": {
                  color: "gold",
                },
              }}
            />
          </section>
        )}

        <textarea
          className="w-full p-4 bg-white rounded-md border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 resize-none"
          rows={4}
          placeholder={
            showRating && !parentCommentId ? "Your Review *" : "Your Comment *"
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        {/* Only show name field for original guests (those without signup email) */}
        {isGuest && !hasSignedUpEmail && (
          <section className="flex sm:flex-row flex-col gap-8 w-full">
            <input
              type="text"
              className="w-full p-4 bg-white rounded-md border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </section>
        )}

        {/* Show user info for signed up users (even if still guest) */}
        {(hasSignedUpEmail || !isGuest) && (
          <section className="flex sm:flex-row flex-col gap-8 w-full">
            <input
              type="text"
              className="w-full p-4 bg-white rounded-md border cursor-not-allowed text-gray-500 border-gray-300"
              placeholder="Your Name"
              value={user?.full_name || ""}
              disabled
            />
          </section>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="w-full mt-5 sm:w-64"
          iconLeft={!isSubmitting ? <Send className="mr-2" /> : undefined}
          onClick={() => {}}
        >
          {isSubmitting
            ? "Submitting..."
            : showRating && !parentCommentId
            ? "Post Review"
            : "Post Comment"}
        </Button>
      </form>
    </div>
  );
};

export default CommentModal;
