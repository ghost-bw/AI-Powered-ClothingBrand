import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function BarChartBox({
  title,
  data,
  xKey,
  yKey,
}) {
  return (
  <div className="bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01]">
  <h2 className="font-bold mb-4">{title}</h2>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* ✅ Gradient Definition */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A5B4FC" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip
              cursor={{ fill: "rgba(99,102,241,0.08)" }}
            />

            {/* ✅ Gradient Bar */}
            <Bar
              dataKey={yKey}
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              barSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}