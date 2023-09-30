import { useState, useEffect } from 'react';
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
    Button,
    Bullseye,
    Spinner
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

const Clusters = () => {

    const [clusterDetails, setclusterDetails] = useState(null);
    const [totalClusters, setTotalClusters] = useState("");
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/clusters')
            .then(response => response.json())
            .then((data) => {
                setclusterDetails(data["data"])
                setTotalClusters(data["count"])
                console.log(data)
            }
            );
    }, [])

    const columnNames = {
        id: 'Id',
        cluster_name: 'Cluster Name',
        workloads: '# of workloads',
        recommendations: '# of recommendations',
        last_reported: 'Last Reported'
    };
    return (
        <>{clusterDetails ? <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Clusters</Text>
                    <Text component="p">Total number openshift clusters in ROS-OCP - {totalClusters}</Text>
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
                                {clusterDetails.map(cluster => (
                                    <Tr key={cluster.Id}>
                                        <Td dataLabel={columnNames.id}>{cluster.Id}</Td>
                                        <Td dataLabel={columnNames.cluster_name}>{cluster.ClusterName}</Td>
                                        <Td dataLabel={columnNames.workloads}>{cluster.Workloads}</Td>
                                        <Td dataLabel={columnNames.recommendations}>{cluster.Recommendations}</Td>
                                        <Td dataLabel={columnNames.last_reported}>{cluster.LastReported}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </PageSection>
        </> : <Bullseye><Spinner size="xl" /></Bullseye>
        }
        </>
    )
}

export default Clusters