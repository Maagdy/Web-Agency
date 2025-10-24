import React from "react";
import { Rating } from "@mui/material";
import type { CommentCardProps } from "../../../components/types/types";
import { formatDate } from "../../../components/Utils/formatData";

const CommentCard: React.FC<CommentCardProps> = ({
  author,
  timestamp,
  content,
  avatarUrl,
  rating,
  replayFunction,
  replies = [],
}) => {
  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-md shadow-md border border-gray-200 p-6">
        {/* Header section: Avatar + Name + Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={avatarUrl}
              alt={`${author}'s avatar`}
              loading="lazy"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">{author}</h3>
              <time className="text-sm text-gray-500">
                {formatDate(timestamp)}
              </time>
            </div>
          </div>

          {/* Rating display - only show if rating exists */}
          {rating !== undefined && rating !== null && (
            <div className="mt-2 sm:mt-0">
              <Rating
                value={rating}
                readOnly
                precision={0.5}
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "goldenrod",
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Comment content */}
        <div className="mt-4 text-gray-700 leading-relaxed">{content}</div>

        {/* Reply button */}
        {replayFunction && (
          <button
            onClick={replayFunction}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            Reply
          </button>
        )}

        {/* Render replies */}
        {replies && replies.length > 0 && (
          <div className="ml-8 mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
            {replies.map((reply) => (
              <CommentCard
                key={reply.id}
                {...reply}
                avatarUrl={
                  reply.avatarUrl ??
                  "https://icons.veryicon.com/png/o/miscellaneous/common-icons-31/default-avatar-2.png"
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
