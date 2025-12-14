import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ScoreChartProps {
  score: number;
  level: string;
}

export const ScoreChart: React.FC<ScoreChartProps> = ({ score, level }) => {
  const getColor = (s: number) => {
    if (s >= 90) return '#f59e0b'; // Gold
    if (s >= 75) return '#3b82f6'; // Blue/Silver
    if (s >= 50) return '#10b981'; // Green/Bronze
    return '#ef4444'; // Red/Beginner
  };

  const color = getColor(score);
  const data = [{ name: 'Score', value: score, fill: color }];

  return (
    <div className="relative w-full h-56 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="75%" 
          outerRadius="100%" 
          barSize={24} 
          data={data} 
          startAngle={180} 
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={12}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%] text-center">
        <span className="text-6xl font-extrabold tracking-tighter" style={{ color }}>
          {score}
        </span>
        <div className="text-gray-400 text-sm font-medium -mt-1 mb-2">/ 100</div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm`} style={{ backgroundColor: color }}>
          {level}
        </span>
      </div>
    </div>
  );
};