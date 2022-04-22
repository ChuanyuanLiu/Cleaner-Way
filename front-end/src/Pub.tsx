import React, { useEffect, useMemo, useState } from "react";
import { Button, Layout } from 'antd';
import { Typography } from 'antd';
import { CameraOutlined, SettingOutlined } from '@ant-design/icons'
import { GoogleMap, useLoadScript, Marker, OverlayView } from "@react-google-maps/api"
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const defaultPos = { lat: -37.797624159993, lng: 144.95950740721196 }
const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/"

const icons: Record<string, { icon: string }> = {
    parking: {
        icon: iconBase + "parking_lot_maps.png",
    },
    library: {
        icon: iconBase + "library_maps.png",
    },
    info: {
        icon: iconBase + "info-i_maps.png",
    },
};


function Map() {
    const [myPos, setMyPos] = useState<google.maps.LatLngLiteral>(defaultPos)
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultPos)
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log('myPos', coords.latitude, coords.longitude)
                setMyPos({ lat: coords.latitude, lng: coords.longitude })
            },
            console.error
        )
    }, [])
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log('center', coords.latitude)
                setCenter({ lat: coords.latitude, lng: coords.longitude })
            },
            console.error
        )
    }, [])
    return <GoogleMap zoom={17} center={center} mapContainerClassName="map-container">
        <Marker position={myPos} icon={icons.parking.icon} />
    </GoogleMap>
}

export default function Pub() {
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "" })

    return <Layout style={{ height: "100vh" }}>
        <Header className="Header">
            <Title> Cleaner Way </Title>
        </Header>
        <Content>
            {isLoaded ? <Map /> : <div>Loading...</div>}
            {loadError && <div>Map cannot be loaded right now, sorry.</div>}
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
