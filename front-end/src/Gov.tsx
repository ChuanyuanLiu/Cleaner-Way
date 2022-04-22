import React from "react";
import { Layout } from 'antd';
import { Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function Gov() {
    return <Layout style={{height: "100vh"}}>
        <Header style={{backgroundColor: "green"}}>
            <Title> Routes </Title>
        </Header>
        <Content>
            b
        </Content>
        <Footer>
            footer
        </Footer>
    </Layout>
}
