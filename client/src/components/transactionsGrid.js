import { Flex, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"
import moment from "moment";

const GridTransactions = ({data}) => {
  return (
    <Flex flexDirection={'column'}>
            <Grid templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'} px={2} gap={2} borderBottom={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} >
                <GridItem display='grid' w='100%' align="start"><Text fontSize={{base:'xs', md: 'md'}}>Date</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'xs', md: 'md'}}>Category</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'xs', md: 'md'}}>Description</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={{base:'xs', md: 'md'}}>Amount</Text></GridItem>
            </Grid>
            {data && data.map((e, key) => {
                return(
                    <Grid key={key} templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'} px={2} gap={2} mt={2} borderBottom={'1px solid'} borderColor={'rgba(0,0,0,0.1)'} fontWeight='semibold' textTransform='capitalize'>
                        <GridItem display='grid' w='100%' align="start"><Text fontSize={{base:'xs', md: 'md'}}>{moment(e.date).format('MM/DD/YYYY')}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'xs', md: 'md'}} >{e.category.name}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="start" ><Text fontSize={{base:'xs', md: 'md'}}>{e.name}</Text></GridItem>
                        <GridItem display='grid' w='100%' align="end" ><Text color={e.type === 'expenseType' ? 'red.400' : 'green.500'} fontWeight={'bold'} fontSize={{base:'xs', md: 'md'}}>${e.amount}</Text></GridItem>
                    </Grid>
                )
            })}
        </Flex>
  )
}

export default GridTransactions