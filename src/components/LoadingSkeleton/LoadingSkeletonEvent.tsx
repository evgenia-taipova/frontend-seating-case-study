function LoadingSkeletonEvent () {
    return (
        <div className={`w-full max-w-sm bg-white rounded-md shadow-sm p-4`}>
          <div className="bg-gray-200 rounded-md mb-4 w-full h-48 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-md mb-2 w-3/4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-4/5 animate-pulse"></div>
          </div>
        </div>
      );
}

export default LoadingSkeletonEvent;