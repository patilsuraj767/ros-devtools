import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text,
    Card,
    CardTitle,
    CardBody,
    CardFooter,
    Gallery,
    Bullseye,
    Flex,
    FlexItem
} from '@patternfly/react-core';

const Dashboard = () => {
    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Dashboard</Text>
                </TextContent>
            </PageSection>
            <PageSection isWidthLimited isCenterAligned>
                <Gallery hasGutter>
                    <Card>
                        <CardBody>
                            <Bullseye>
                                <h1 style={{ "font-size": "250%" }}>8</h1>
                            </Bullseye>
                        </CardBody>
                        <CardFooter>
                            <Bullseye>
                                Accounts
                            </Bullseye>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardBody>
                            <Bullseye>
                                <h1 style={{ "font-size": "250%" }}>20</h1>
                            </Bullseye>
                        </CardBody>
                        <CardFooter>
                            <Bullseye>
                                Clusters
                            </Bullseye>
                        </CardFooter>
                    </Card>
                </Gallery>
            </PageSection>
        </>
    )
}

export default Dashboard