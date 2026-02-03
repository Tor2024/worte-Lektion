
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const COLORS = {
  primary: 'hsl(var(--primary))',
  muted: 'hsl(var(--muted))',
};

type ProgressCircleProps = {
  value: number;
};

export function ProgressCircle({ value }: ProgressCircleProps) {
  const [mounted, setMounted] = (require('react')).useState(false);
  (require('react')).useEffect(() => { setMounted(true) }, []);

  if (!mounted) return <div className="h-28 w-28 rounded-full bg-muted animate-pulse" />;

  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  return (
    <div className="h-28 w-28">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="100%"
            startAngle={90}
            endAngle={450}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={COLORS.primary} />
            <Cell fill={COLORS.muted} />
            <Label
              value={`${value}%`}
              position="center"
              fill="hsl(var(--foreground))"
              className="text-2xl font-bold font-headline"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
