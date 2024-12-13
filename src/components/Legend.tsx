const Legend = () => {
  return (
    <div className="bg-gray-100 p-3 rounded-md shadow-sm mb-4">
      <div className="flex space-x-6 justify-center">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">VIP Ticket</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Regular Ticket</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 bg-pink-100 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">No Ticket</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">In Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
