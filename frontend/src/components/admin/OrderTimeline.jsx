import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Delivered",
];

export default function OrderTimeline({ status }) {
  const activeIndex = steps.indexOf(status);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = index <= activeIndex;

        return (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="flex items-center gap-4"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <CheckCircle size={18} />
            </div>

            <p
              className={`font-medium ${
                isCompleted ? "text-black" : "text-gray-400"
              }`}
            >
              {step}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
