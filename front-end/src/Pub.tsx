import React, { useEffect, useMemo, useState } from "react";
import { Button, Layout, Typography, Modal } from "antd";
import { CameraOutlined, SettingOutlined } from "@ant-design/icons";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const defaultPos = { lat: -37.797624159993, lng: 144.95950740721196 };
// const defaultPos = {lat: 44, lng: -80}

interface MapInterface {
  showModal: () => void;
}

function Map({ showModal }: MapInterface) {
  const [myPos, setMyPos] = useState<google.maps.LatLngLiteral>(defaultPos);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultPos);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log("myPos", coords.latitude, coords.longitude);
      setMyPos({ lat: coords.latitude, lng: coords.longitude });
    }, console.error);
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log("center", coords.latitude);
      setCenter({ lat: coords.latitude, lng: coords.longitude });
    }, console.error);
  }, []);
  return (
    <GoogleMap zoom={17} center={center} mapContainerClassName="map-container">
      <Marker position={myPos} onClick={showModal} />
    </GoogleMap>
  );
}

export default function Pub() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="Header">
        <Title> Waste Collection </Title>
      </Header>
      <Content>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        {isLoaded ? <Map showModal={showModal} /> : <div>Loading...</div>}
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
