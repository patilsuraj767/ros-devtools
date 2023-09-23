import {
    PageSection,
    Text,
    TextContent,
    PageSectionVariants,
    Card,
    CardBody,
    Toolbar,
    ToolbarItem,
    ToolbarContent,
    SearchInput,
    Button
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

const Accounts = () => {
    const repositories = [
        { id: 'one', account: 'two', org_id: 'three', clusters: 'four', workloads: 'five', recommendations: '0' },
        { id: 'one - 2', account: null, org_id: null, clusters: 'four - 2', workloads: 'five - 2', recommendations: '1' },
        { id: 'one - 3', account: 'two - 3', org_id: 'three - 3', clusters: 'four - 3', workloads: 'five - 3', recommendations: '10' }
    ];

    const columnNames = {
        id: 'Id',
        account: 'Account',
        org_id: 'Org_id',
        clusters: '# of clusters',
        workloads: '# of workloads',
        recommendations: '# of recommendations'
    };
    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Accounts</Text>
                    <Text component="p">Total number accounts registered with ROS-OCP - </Text>
                </TextContent>
            </PageSection>
            <PageSection isWidthLimited isCenterAligned>
                <Card>
                    <CardBody>
                        <Toolbar id="toolbar-items-example">
                            <ToolbarContent>
                                <ToolbarItem variant="search-filter">
                                    <SearchInput />
                                </ToolbarItem>
                                <ToolbarItem>
                                    <Button variant="primary">Search</Button>
                                </ToolbarItem>
                            </ToolbarContent>
                        </Toolbar>
                        <Table
                            aria-label="Simple table"
                            variant='compact'
                            borders
                        >
                            <Thead>
                                <Tr>
                                    <Th>{columnNames.id}</Th>
                                    <Th>{columnNames.account}</Th>
                                    <Th>{columnNames.org_id}</Th>
                                    <Th>{columnNames.clusters}</Th>
                                    <Th>{columnNames.workloads}</Th>
                                    <Th>{columnNames.recommendations}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {repositories.map(repo => (
                                    <Tr key={repo.id}>
                                        <Td dataLabel={columnNames.id}>{repo.id}</Td>
                                        <Td dataLabel={columnNames.account}>{repo.account}</Td>
                                        <Td dataLabel={columnNames.org_id}>{repo.org_id}</Td>
                                        <Td dataLabel={columnNames.clusters}>{repo.clusters}</Td>
                                        <Td dataLabel={columnNames.workloads}>{repo.workloads}</Td>
                                        <Td dataLabel={columnNames.recommendations}>{repo.recommendations}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </PageSection>
        </>
    )
}

export default Accounts