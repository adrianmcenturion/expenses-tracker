import { useSelector } from "react-redux";


export const ExpensesFilter = async () => {
    const { movements } = await useSelector(state => state.expenses)
    // console.log(movements)

    let filtered = {}

    const filter = await movements.filter(e => {
        if(e.category.name === 'salary'){
            filtered[e.category.name].push(e.amount)
        }
        return filtered
    })
    console.log(filtered)
    return filter
  
}

