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
            <Grid templateColumns={allTransactions ? '1fr 1.5fr 1.5fr 0.4fr 0.6fr' : '1fr 1.25fr 1.25fr 0.5fr'} gridTemplateRows={'30px'} px={2} gap={2} borderBottom={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} >
                <GridItem display='grid' w='100%' align="start"><Text fontSize={{base:'x-small', md: 'md'}}>Date</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'x-small', md: 'md'}}>Category</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'x-small', md: 'md'}}>Description</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={{base:'x-small', md: 'md'}}>Amount</Text></GridItem>
                {!allTransactions ? <GridItem display='grid' w='100%' align="end" ><Text fontSize={{base:'x-small', md: 'md'}}></Text></GridItem> : null}
            </Grid>
            {data && data.map((e, key) => {
                return(
                    <Grid as={'form'} onSubmit={handleEdit} id='transaction-form' key={key} templateColumns={allTransactions ? '1fr 1.5fr 1.5fr 0.4fr 0.6fr' : '1fr 1.25fr 1.25fr 0.5fr'} gridTemplateRows={'30px'} px={2} gap={2} mt={2} borderBottom={'1px solid'} borderColor={'rgba(0,0,0,0.1)'} fontWeight='semibold' textTransform='capitalize'>
                        <GridItem display='grid' w='100%' align="start"><Text id='date' fontSize={{base:'x-small', md: 'md'}}>{moment(e.date).format('MM/DD/YYYY')}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="start" ><Text maxW={{base: '40px', md: '200px'}} wordBreak={"break-all"} id='category' fontSize={{base:'x-small', md: 'md'}} >{e.category.name}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="start" ><Text id='description' fontSize={{base:'x-small', md: 'md'}}>{e.name}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="end" ><Text id='amount' color={e.type === 'expenseType' ? 'red.400' : 'green.500'} fontWeight={'bold'} fontSize={{base:'x-small', md: 'md'}}>${e.amount}</Text></GridItem>
                        {allTransactions ? <GridItem display='grid' w='100%' justifyContent={'end'} alignItems='start' id={e.id}>
                            <Flex gap={1}>
                                <IconButton fontSize={{base:'x-small', md: 'md'}} type="submit" size={{base: '10rem', md: 'sm'}} p={1} borderRadius={{base: "sm", md: 'md'}} bg={'blue.700'} _hover={{bg:'blue.500'}} icon={<EditIcon/>}></IconButton>
                                <IconButton fontSize={{base:'x-small', md: 'md'}} onClick={handleDelete} size={{base: '10rem', md: 'sm'}} p={1} borderRadius={{base: "sm", md: 'md'}} bg={'red.700'} _hover={{bg:'red.500'}} icon={<CloseIcon/>}></IconButton>
                            </Flex>
                        </GridItem> : null}
                    </Grid>
                )
            })}
        </Flex>
  )
}

export default GridTransactions