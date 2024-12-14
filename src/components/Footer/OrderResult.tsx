import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { CheckIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface OrderResultProps {
  isOrderComplete: boolean | null;
  orderMessage: string;
  onClose: () => void;
}

const OrderResult: React.FC<OrderResultProps> = ({
  isOrderComplete,
  orderMessage,
  onClose,
}) => {
  if (isOrderComplete === null) return null;

  return (
    <div className="mt-6 p-6 rounded-lg shadow-lg bg-white border border-gray-200 flex flex-col items-center">
      {isOrderComplete ? (
        <div className="flex items-center space-x-4">
          <CheckIcon className="mx-1 h-8 w-8 stroke-green-600" />
          <p className="text-lg font-semibold text-green-600">{orderMessage}</p>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <ArrowPathIcon className="mx-1 h-8 w-8 stroke-red-600" />
          <p className="text-lg font-semibold text-red-600">{orderMessage}</p>
        </div>
      )}

      <Button onClick={onClose} className="mt-6">
        Close
      </Button>
    </div>
  );
};

export default OrderResult;
