import React from 'react';
import {
    Page,
    PageSection,
    PageSidebar,
    PageSidebarBody,
    Text,
    TextContent,
    Masthead,
    MastheadToggle,
    MastheadMain,
    MastheadBrand,
    Button
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon';
import NavBar from '../navbar/navbar';

const Layout = ({ children }) => {

    const header = (
        <Masthead id="basic-example">
            <MastheadToggle>
                <Button variant="plain" onClick={() => { }} aria-label="Global navigation">
                    <BarsIcon />
                </Button>
            </MastheadToggle>
            <MastheadMain>
                <MastheadBrand>ROS devtools</MastheadBrand>
            </MastheadMain>
            {/* <MastheadContent>
                <span>Content</span>
            </MastheadContent> */}
        </Masthead>
    )

    const sidebar = (
        <PageSidebar>
            <PageSidebarBody><NavBar /></PageSidebarBody>
        </PageSidebar>
    )

    return (
        <Page
            header={header}
            sidebar={sidebar}
            isManagedSidebar={true}
            mainContainerId='main-content-page-layout-default-nav'
        >
            {children}
        </Page>
    )
}

export default Layout