
const data = [
      { id: 1, value: 400 },
      { id: 2, value: 300 },
      { id: 4, value: 300 },
      { id: 5, value: 200 },
    ]

const data2 = [
    { id: 3, color: 'rosa' },
    { id: 5, color: 'azul' },
    { id: 2, color: 'verde' },
    { id: 1, color: 'rojo' },
  ]


  export const formatData = (arr1, arr2) => {

    const result = arr1.map(item => {
        const obj = arr2.find(o => o.id === item.id);
        return { ...item, ...obj };
      });
    
    return(result);
}

formatData(data, data2)