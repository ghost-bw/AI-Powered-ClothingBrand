import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  badge,
  badgeType = "up", // up | down
  icon,
  accent = "blue", // blue | orange | yellow | green
}) {
  const accentMap = {
    blue: {
      bg: "bg-blue-100",
      pill: "bg-blue-500",
    },
    orange: {
      bg: "bg-orange-100",
      pill: "bg-orange-500",
    },
    yellow: {
      bg: "bg-yellow-100",
      pill: "bg-yellow-400",
    },
    green: {
      bg: "bg-green-100",
      pill: "bg-green-400",
    },
  };

  const badgeColor =
    badgeType === "up"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative overflow-hidden rounded-2xl p-6 ${accentMap[accent].bg}`}
    >
      {/* Top pill */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium text-white ${accentMap[accent].pill}`}
      >
        {icon}
        {title}
      </div>

      {/* Value + badge */}
      <div className="mt-4 flex items-center gap-3">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {value}
        </h2>

        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        Than last week
      </p>

      {/* Decorative circle */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/40 rounded-full" />
    </motion.div>
  );
}