import React, { useEffect, useMemo, useState } from "react";
import { Button, Layout } from 'antd';
import { Typography, Modal } from 'antd';
import { CameraOutlined, SettingOutlined } from '@ant-design/icons'
import { GoogleMap, useLoadScript, Marker as MarkerImpl } from "@react-google-maps/api"
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const defaultPos = { lat: -37.797624159993, lng: 144.95950740721196 }

interface MapInterface {
    showModal: () => void;
    setId: (arg: number) => void;
}

interface User {
    diamond: number
}

enum GarbageType {
    HouseholdWaste = 0,
    HardWaste,
    HaxardousWaste,
    OrganicWaste,
    NotSure
}

enum StillThereType {
    Yes = 0,
    No,
    Unsure,
}

enum StatusType {
    WaitingToBeProcessed = 0,
    PickupOnTheWay,
    PickupCompleted
}

interface GarbageInterface {
    stillThere: { type: StillThereType, date: Date }[],
    numberReported: number,
    type: GarbageType[],
    photo: string,
    date: Date,
    location: google.maps.LatLngLiteral,
    status: StatusType,
    id: number
}

const garbages: GarbageInterface[] = [
    {
        stillThere: [
            { type: StillThereType.Yes, date: new Date() },
        ],
        numberReported: 5,
        type: [GarbageType.OrganicWaste],
        photo: "http://localhost:3000",
        date: new Date(),
        location: { lat: -37.797624159993, lng: 144.95950740721196 },
        status: StatusType.PickupOnTheWay,
        id: 1
    },
    {
        stillThere: [
            { type: StillThereType.No, date: new Date() },
            { type: StillThereType.Yes, date: new Date() },
        ],
        numberReported: 1,
        type: [GarbageType.HardWaste],
        photo: "http://localhost:3000",
        date: new Date(),
        location: { lat: -37.792624159993, lng: 144.95250740721196 },
        status: StatusType.WaitingToBeProcessed,
        id: 2
    },
    {
        stillThere: [
            { type: StillThereType.Yes, date: new Date() },
            { type: StillThereType.No, date: new Date() },
        ],
        numberReported: 8,
        type: [GarbageType.HouseholdWaste],
        photo: "http://localhost:3000",
        date: new Date(),
        location: { lat: -37.793624159993, lng: 144.96050740721196 },
        status: StatusType.PickupCompleted,
        id: 3
    }
]


function Map({ showModal, setId }: MapInterface) {
    const [myPos, setMyPos] = useState<google.maps.LatLngLiteral>(defaultPos)
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultPos)
    const Person = () => (
        <MarkerImpl position={myPos} zIndex={10} icon="http://localhost:3000/person.png" />
    );
    const Bin = (position: google.maps.LatLngLiteral, id: number, setId: (arg: number) => void) => (
        <MarkerImpl key={id.toString()} position={position} icon="http://localhost:3000/bin.png" onClick={() => { showModal(); setId(id)} } />
    );
    useEffect(() => {
        navigator.geolocation.watchPosition(
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
        {garbages.map(({ location, id }) => Bin(location, id, setId))}
        <Person />
    </GoogleMap>
}

interface GarbageModalInterface {
    id: number,
    isModalVisible: boolean, 
    setIsModalVisible: (arg: boolean) => void,
}

function GarbageModal({isModalVisible,setIsModalVisible, id}: GarbageModalInterface) {
    const data : GarbageInterface = garbages.filter( (data) => data.id = id )[0]
    return <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
    >
        <p> {data.photo} </p>
    </Modal>
}

export default function Pub() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
    });

    const [id, setId] = useState<number>(1);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    return (
        <Layout style={{ height: "100vh" }}>
            <Header className="Header">
                <Title> Waste Collection </Title>
            </Header>
            <Content>
                <GarbageModal id={id} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
                {isLoaded ? <Map showModal={() => setIsModalVisible(true)} setId={setId} /> : <div>Loading...</div>}
                {loadError && <div>Map cannot be loaded right now, sorry.</div>}
            </Content>
            <Footer className="Footer">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button> 💎 </Button>
                    <Button>
                        <CameraOutlined />
                    </Button>
                    <Button>
                        <SettingOutlined />
                    </Button>
                </div>
            </Footer>
        </Layout>
    );
}
