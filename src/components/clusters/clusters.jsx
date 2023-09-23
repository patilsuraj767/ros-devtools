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

const Clusters = () => {
    const repositories = [
        { id: 'one', cluster_name: 'two', workloads: 'five', recommendations: '0', last_reported: '01-02-2023' },
        { id: 'one - 2', cluster_name: null, workloads: 'five - 2', recommendations: '1', last_reported: '03-04-2023' },
        { id: 'one - 3', cluster_name: 'two - 3', workloads: 'five - 3', recommendations: '10', last_reported: '24-12-2023' }
    ];

    const columnNames = {
        id: 'Id',
        cluster_name: 'Cluster Name',
        workloads: '# of workloads',
        recommendations: '# of recommendations',
        last_reported: 'Last Reported'
    };
    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Clusters</Text>
                    <Text component="p">Total number openshift clusters in ROS-OCP - </Text>
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
                                    <Th>{columnNames.cluster_name}</Th>
                                    <Th>{columnNames.workloads}</Th>
                                    <Th>{columnNames.recommendations}</Th>
                                    <Th>{columnNames.last_reported}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {repositories.map(repo => (
                                    <Tr key={repo.id}>
                                        <Td dataLabel={columnNames.id}>{repo.id}</Td>
                                        <Td dataLabel={columnNames.cluster_name}>{repo.cluster_name}</Td>
                                        <Td dataLabel={columnNames.workloads}>{repo.workloads}</Td>
                                        <Td dataLabel={columnNames.recommendations}>{repo.recommendations}</Td>
                                        <Td dataLabel={columnNames.last_reported}>{repo.last_reported}</Td>
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

export default Clusters