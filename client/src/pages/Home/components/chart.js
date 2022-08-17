import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getCategoryBalance } from '../../../redux/states/expenses';
import { useDispatch, useSelector } from "react-redux";
import { Flex, Text } from '@chakra-ui/react';

const COLORS = ["#61efcd","#cdde1f","#fec200","#ca765a","#2485fa","#f57d7d","#c152d2","#8854d9","#3d4eb8","#00bcd7","#e53e3e","#6f1c3a","#21ae3b","#271fd0","#3f7d9c"];

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
  const {success} = useSelector((state) => state.expenses)

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
              outerRadius={90}
              fill="#8884d8"
              legendType='circle'
              dataKey="_sum.amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  }

  useEffect(() => {
    if(token)
    dispatch(getCategoryBalance(token))

  }, [token, success]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex w={'100%'} h={'100%'} flexDirection={'column'} p={4} gap={2}>
      <Text>Total Expenses</Text>
      <Example />
    </Flex>
  )
}




