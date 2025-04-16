import React from 'react';

const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className="flex items-center gap-2 max-w-[75%]">
              {idx % 2 === 0 && (
                <div className="skeleton rounded-full w-10 h-10"></div>
              )}
              
              <div className="space-y-2 flex-1">
                <div className="skeleton h-4 w-32"></div>
                <div className="skeleton h-20 w-48 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default MessageSkeleton;