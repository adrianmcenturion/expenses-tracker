import { Flex, Grid, GridItem, Text  } from "@chakra-ui/react"


const Transactions = () => {
  return (
    <Flex flexDirection={'column'} p={2} gap={2}>
        <Text fontSize={'lg'}>Recent Transactions</Text>
        <Flex flexDirection={'column'}>
            <Grid templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'} px={2} gap={2} >
                <GridItem display='grid' w='100%' align="start"><Text fontSize={'md'}>Date</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'md'}>Category</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'md'}>Description</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={'md'}>Amount</Text></GridItem>
            </Grid>
            <Grid templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'} px={2} gap={2} borderBottom={'black 1px solid'} fontWeight='semibold'>
                <GridItem display='grid' w='100%' align="start"><Text fontSize={'smaller'}>17/12/20</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>food</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>meat</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={'smaller'}>$32</Text></GridItem>
            </Grid>
            <Grid templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'}px={2} gap={2} borderBottom={'black 1px solid'} fontWeight='semibold'>
                <GridItem display='grid' w='100%' align="start"><Text fontSize={'smaller'}>17/12/20</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>food</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>meat</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={'smaller'}>$32</Text></GridItem>
            </Grid>
            <Grid templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'} px={2}gap={2} borderBottom={'black 1px solid'} fontWeight='semibold'>
                <GridItem display='grid' w='100%' align="start"><Text fontSize={'smaller'}>17/12/20</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>food</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>meat</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={'smaller'}>$32</Text></GridItem>
            </Grid>
            <Grid templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'}px={2} gap={2} borderBottom={'black 1px solid'} fontWeight='semibold'>
                <GridItem display='grid' w='100%' align="start"><Text fontSize={'smaller'}>17/12/20</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>food</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>meat</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={'smaller'}>$32</Text></GridItem>
            </Grid>
            <Grid templateColumns='1fr 1fr 1.5fr 0.5fr' gridTemplateRows={'30px'} gridTemplateAreas={'Date Category Description Amount'} px={2}gap={2} borderBottom={'black 1px solid'} fontWeight='semibold'>
                <GridItem display='grid' w='100%' align="start"><Text fontSize={'smaller'}>17/12/20</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>food</Text></GridItem>
                <GridItem display='grid' w='100%' align="start" ><Text fontSize={'smaller'}>meat</Text></GridItem>
                <GridItem display='grid' w='100%' align="end" ><Text fontSize={'smaller'}>$32</Text></GridItem>
            </Grid>
        </Flex>
    </Flex>
    
  )
}

export default Transactions