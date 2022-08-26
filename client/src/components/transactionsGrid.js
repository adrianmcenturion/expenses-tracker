import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Grid, GridItem, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import moment from "moment";

const GridTransactions = ({data, allTransactions}) => {

    const handleDelete = (e) => {
        console.log(e.currentTarget.parentNode.parentNode.id)

    }

    const handleEdit = (e) => {
        e.preventDefault()
        console.log(e.target.children[0].children[0].innerHTML)
        console.log(e.target.children[1].children[0].innerHTML)
        console.log(e.target.children[2].children[0].innerHTML)
        console.log(e.target.children[3].children[0].innerHTML.slice(1))
        console.log(e.target.children[4].id)
        //children[4].children[0].children[1].id
        //children[3].children[0].innerHTML
    }


  return (
    <Flex flexDirection={'column'}>
            <Grid templateColumns= '1fr 1fr 1.3fr 0.7fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas='Date Category Description Amount Buttons' px={2} gap={2} borderBottom={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} >
                <GridItem display='grid' w='100%' align="start"><Text fontSize={{base:'xs', md: 'md'}}>Date</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'xs', md: 'md'}}>Category</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'xs', md: 'md'}}>Description</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={{base:'xs', md: 'md'}}>Amount</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={{base:'xs', md: 'md'}}></Text></GridItem>
            </Grid>
            {data && data.map((e, key) => {
                return(
                    <Grid as={'form'} onSubmit={handleEdit} id='transaction-form' key={key} templateColumns= '1fr 1fr 1.3fr 0.7fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas='Date Category Description Amount Buttons' px={2} gap={2} mt={2} borderBottom={'1px solid'} borderColor={'rgba(0,0,0,0.1)'} fontWeight='semibold' textTransform='capitalize'>
                        <GridItem display='grid' w='100%' align="start"><Text id='date' fontSize={{base:'xs', md: 'md'}}>{moment(e.date).format('MM/DD/YYYY')}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="start" ><Text id='category' fontSize={{base:'xs', md: 'md'}} >{e.category.name}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="start" ><Text id='description' fontSize={{base:'xs', md: 'md'}}>{e.name}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="end" ><Text id='amount' color={e.type === 'expenseType' ? 'red.400' : 'green.500'} fontWeight={'bold'} fontSize={{base:'xs', md: 'md'}}>${e.amount}</Text></GridItem>
                        <GridItem display='grid' w='100%' justifyContent={'end'} alignItems='start' id={e.id}>
                            <Flex >
                                <IconButton type="submit" size={{base: 'xs', md: 'sm'}} bg={'blue.700'} icon={<EditIcon/>}></IconButton>
                                <IconButton onClick={handleDelete} size={{base: 'xs', md: 'sm'}} bg={'red.700'} icon={<CloseIcon/>}></IconButton>
                            </Flex>
                        </GridItem>
                    </Grid>
                )
            })}
        </Flex>
  )
}

export default GridTransactions