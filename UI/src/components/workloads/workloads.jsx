import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text,
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

const Workloads = () => {
    const { cluster_id } = useParams();

    const [workloadDetails, setworkloadDetails] = useState(null);
    const [totalWorkloads, setTotalWorkloads] = useState("");
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/workloads?cluster-id=${encodeURIComponent(cluster_id)}`)
            .then(response => response.json())
            .then((data) => {
                setworkloadDetails(data["data"])
                setTotalWorkloads(data["count"])
                console.log(data)
            }
            );
    }, [])

    const columnNames = {
        id: 'Id',
        experiment_name: 'Experiment_name',
        namespace: 'Namespace',
        workload_type: 'Workload_type',
        workload_name: 'Workload_name',
        containers: 'containers',
        metrics_upload_at: 'metrics_upload_at'
    };

    return (
        <>{workloadDetails ? <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Workloads of cluster - {cluster_id}</Text>
                    <Text component="p">Total number workloads - {totalWorkloads}</Text>
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
                                    <Th>{columnNames.experiment_name}</Th>
                                    <Th>{columnNames.namespace}</Th>
                                    <Th>{columnNames.workload_type}</Th>
                                    <Th>{columnNames.workload_name}</Th>
                                    <Th>{columnNames.containers}</Th>
                                    <Th>{columnNames.metrics_upload_at}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {workloadDetails.map(workload => (
                                    <Tr key={workload.Id}>
                                        <Td dataLabel={columnNames.id}>{workload.Id}</Td>
                                        <Td dataLabel={columnNames.experiment_name}>{workload.Experiment_name}</Td>
                                        <Td dataLabel={columnNames.namespace}>{workload.Namespace}</Td>
                                        <Td dataLabel={columnNames.workload_type}>{workload.Workload_type}</Td>
                                        <Td dataLabel={columnNames.workload_name}>{workload.Workload_name}</Td>
                                        <Td dataLabel={columnNames.containers}>{workload.Containers}</Td>
                                        <Td dataLabel={columnNames.metrics_upload_at}>{workload.Metrics_upload_at}</Td>
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

export default Workloads