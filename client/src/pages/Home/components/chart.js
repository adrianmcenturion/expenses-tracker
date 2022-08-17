import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getCategoryBalance } from '../../../redux/states/expenses';
import { useDispatch, useSelector } from "react-redux";

const COLORS = ["#53706a","#c8bba8","#cd1a4d","#478ec5","#7dc084","#147313","#7169b0","#d5e19d","#1dabf1","#313b48","#3dcd76","#6f1c3a","#887a0d","#271fd0","#3f7d9c"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill={COLORS[index % COLORS.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartGraph = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const data = useSelector(state => state.expenses.categoryBalance)

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
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={110}
              fill="#8884d8"
              legendType='circle'
              dataKey="_sum.amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend iconSize={10}  />
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




