import SearchIcon from "@/ui/SearchIcon";
import React from "react";

interface EmptyStateProps {
  searchQuery?: string;
  customMessage?: string;
  suggestion?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  customMessage,
  suggestion = "Try a different search term.",
}) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      data-testid="empty-state"
    >
      <div className="flex justify-center mb-6">
        <SearchIcon className="w-16 h-16 text-gray-400" />
      </div>
      <p className="text-xl text-gray-600">
        {customMessage
          ? customMessage
          : searchQuery
          ? `No artworks found for "${searchQuery}".`
          : "No artworks have been added yet."}
      </p>
      {suggestion && <p className="mt-2 text-gray-500">{suggestion}</p>}
    </div>
  );
};

export default EmptyState;
