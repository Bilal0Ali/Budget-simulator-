
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Allocations, ChartDataItem, Sector } from '../types';
import { SECTOR_DISPLAY_DETAILS, SECTORS_ARRAY } from '../constants';

interface AllocationChartProps {
  allocations: Allocations;
}

const AllocationChart: React.FC<AllocationChartProps> = ({ allocations }) => {
  const chartData: ChartDataItem[] = SECTORS_ARRAY.map((sectorKey) => {
    const sectorEnum = sectorKey as Sector; // Ensure it's treated as Sector enum
    return {
      name: `${SECTOR_DISPLAY_DETAILS[sectorEnum].icon} ${SECTOR_DISPLAY_DETAILS[sectorEnum].name}`,
      value: allocations[sectorEnum],
      fill: SECTOR_DISPLAY_DETAILS[sectorEnum].chartColor,
    };
  }).filter(item => item.value > 0); // Only show sectors with allocation > 0

  if (chartData.length === 0) {
    return (
      <div className="mt-8 p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-lg text-center text-gray-500">
        Allocate budget to see the chart.
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Budget Allocation Visualized 🥧</h2>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                const percentage = (percent * 100).toFixed(0);
                if (parseInt(percentage) < 5) return null; // Don't render label if too small

                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px" fontWeight="bold">
                    {`${percentage}%`}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
            <Legend iconSize={14} wrapperStyle={{fontSize: "14px"}}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AllocationChart;
    