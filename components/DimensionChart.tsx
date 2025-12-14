import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface DimensionChartProps {
  data: {
    code_quality: number;
    documentation: number;
    testing: number;
    best_practices: number;
    project_structure?: number;
  };
}

export const DimensionChart: React.FC<DimensionChartProps> = ({ data }) => {
  // map data to chart format
  const chartData = [
    { subject: 'Quality', value: data.code_quality || 0, fullMark: 100 },
    { subject: 'Structure', value: data.project_structure || 0, fullMark: 100 },
    { subject: 'Tests', value: data.testing || 0, fullMark: 100 },
    { subject: 'Docs', value: data.documentation || 0, fullMark: 100 },
    { subject: 'Best Prac.', value: data.best_practices || 0, fullMark: 100 },
  ];

  return (
    <div className="w-full h-72 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#4f46e5"
            strokeWidth={3}
            fill="url(#radarFill)"
            fillOpacity={1}
            isAnimationActive={true}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}/100`, 'Score']}
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              fontSize: '13px',
              padding: '8px 12px',
              fontWeight: 500,
              color: '#1e293b'
            }}
            cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};