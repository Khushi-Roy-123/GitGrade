import React, { useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
  ResponsiveContainer, Tooltip 
} from 'recharts';
import { PieChart, BarChart3 } from 'lucide-react';

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
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar');

  // map data to chart format
  const chartData = [
    { subject: 'Quality', value: data.code_quality || 0 },
    { subject: 'Structure', value: data.project_structure || 0 },
    { subject: 'Tests', value: data.testing || 0 },
    { subject: 'Docs', value: data.documentation || 0 },
    { subject: 'Best Prac.', value: data.best_practices || 0 },
  ];

  return (
    <div className="w-full h-72 relative flex flex-col">
      {/* Chart View Toggle */}
      <div className="absolute top-0 right-0 z-10 bg-white border border-gray-200 p-1 rounded-lg flex shadow-sm">
        <button
          onClick={() => setChartType('radar')}
          className={`p-1.5 rounded-md transition-all ${
            chartType === 'radar'
              ? 'bg-indigo-50 text-indigo-600 shadow-sm'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
          title="Radar View"
        >
          <PieChart size={16} />
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`p-1.5 rounded-md transition-all ${
            chartType === 'bar'
              ? 'bg-indigo-50 text-indigo-600 shadow-sm'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
          title="Bar View"
        >
          <BarChart3 size={16} />
        </button>
      </div>

      <div className="flex-1 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'radar' ? (
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
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} 
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
          ) : (
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="subject" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                dy={10}
                interval={0}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
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
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28} animationDuration={1000}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.value > 80 ? '#4f46e5' : entry.value > 50 ? '#6366f1' : '#818cf8'} 
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};