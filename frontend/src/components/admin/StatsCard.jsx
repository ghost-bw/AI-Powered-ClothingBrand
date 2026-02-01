export default function StatsCard({
  title,
  value,
  badge,
  icon,
  trend,        // +12.5 / -3.2
  subtitle,     // "vs last month"
}) {
  const isPositive = trend >= 0;

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      {/* Top */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>

        {badge && (
          <span className="text-xs font-bold text-primary">
            {badge}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-xs text-gray-500 uppercase">
        {title}
      </p>

      {/* Value */}
      <p className="text-3xl font-black mt-1">
        {value}
      </p>

      {/* Trend */}
      {trend !== undefined && (
        <p
          className={`text-sm mt-1 font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(trend)}%
          {subtitle && (
            <span className="text-gray-400 font-normal">
              {" "} {subtitle}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
