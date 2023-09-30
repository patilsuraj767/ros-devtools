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
    Spinner,
    Bullseye
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

const Accounts = () => {

    const [accountDetails, setAccountDetails] = useState(null);
    const [totalAccounts, setTotalAccounts] = useState("");
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/accounts')
            .then(response => response.json())
            .then((data) => {
                setAccountDetails(data["data"])
                setTotalAccounts(data["count"])
                console.log(data)
            }
            );
    }, [])


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
            {accountDetails ? <>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Accounts</Text>
                        <Text component="p">Total number accounts registered with ROS-OCP - {totalAccounts}</Text>
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
                                    {accountDetails.map(account => (
                                        <Tr key={account.Id}>
                                            <Td dataLabel={columnNames.id}>{account.Id}</Td>
                                            <Td dataLabel={columnNames.account}>{account.Account}</Td>
                                            <Td dataLabel={columnNames.org_id}>{account.Org_id}</Td>
                                            <Td dataLabel={columnNames.clusters}>{account.Clusters}</Td>
                                            <Td dataLabel={columnNames.workloads}>{account.Workloads}</Td>
                                            <Td dataLabel={columnNames.recommendations}>{account.Recommendations}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </PageSection>
            </> :
                <Bullseye><Spinner size="xl" /></Bullseye>
            }
        </>
    )
}

export default Accounts