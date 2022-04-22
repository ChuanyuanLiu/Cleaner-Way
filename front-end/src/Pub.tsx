import React, { useEffect, useMemo, useState } from "react";
import { Button, Layout } from 'antd';
import { Typography } from 'antd';
import { CameraOutlined, SettingOutlined } from '@ant-design/icons'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const defaultPos = {lat: -37.797624159993, lng: 144.95950740721196}
// const defaultPos = {lat: 44, lng: -80}

function Map() {
    const [myPos, setMyPos] = useState<google.maps.LatLngLiteral>(defaultPos)
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultPos)
    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
        ({ coords }) => { 
            console.log('myPos', coords.latitude, coords.longitude)
            setMyPos({ lat: coords.latitude, lng: coords.longitude }) 
        }, 
        console.error
    )}, [])
    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
            console.log('center', coords.latitude)
            setCenter({ lat: coords.latitude, lng: coords.longitude })
        },
        console.error
    )}, [])
    return <GoogleMap zoom={17} center={center} mapContainerClassName="map-container">
        <Marker position={myPos} />
    </GoogleMap>
}

export default function Pub() {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "" })

    return <Layout style={{ height: "100vh" }}>
        <Header className="Header">
            <Title> Waste Collection </Title>
        </Header>
        <Content>
            {isLoaded ? <Map/> : <div>Loading...</div>}
        </Content>
        <Footer className="Footer">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button> 💎 </Button>
                <Button> <CameraOutlined /> </Button>
                <Button> <SettingOutlined /> </Button>
            </div>
        </Footer>
    </Layout>
}
