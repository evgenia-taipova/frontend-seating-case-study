function LoadingSkeletonMap() {
  const skeletonRows = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 })
  );

  return (
    <div className="bg-white rounded-md grow p-3 self-stretch shadow-sm">
      <div className="flex flex-col gap-3 animate-pulse items-center justify-center">
        {skeletonRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-3 mb-2 justify-center">
            {row.map((_, seatIdx) => (
              <div
                key={seatIdx}
                className="h-10 w-10 bg-gray-200 rounded-md"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeletonMap;
