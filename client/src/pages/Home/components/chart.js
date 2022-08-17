import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getCategoryBalance } from '../../../redux/states/expenses';
import { useDispatch, useSelector } from "react-redux";

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartGraph = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const data = useSelector(state => state.expenses.categoryBalance)
  

  console.log(data)



  class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
    render() {    
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="_sum.amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend  />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  }
  

  useEffect(() => {
    if(token)
    dispatch(getCategoryBalance(token))

  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Example />
  )
}




