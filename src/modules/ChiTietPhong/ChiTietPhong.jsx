import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import phongAPI from "../../services/phongAPI";
import styles from "./ChiTietPhong.module.scss";
import { Image, Text, Grid, Paper } from "@mantine/core";
import {
  IconWashMachine,
  IconDeviceTv,
  IconAirConditioning,
  IconWifi,
  IconToolsKitchen2,
  IconParking,
  IconPool,
  IconIroning3,
} from "@tabler/icons";
import DatPhong from "./DatPhong";
import BinhLuan from "./BinhLuan";
import LoadingContent from "../../components/LoadingContent";

const ChiTietPhong = () => {
  const { id } = useParams();
  const [phong, setPhong] = useState({});

  //Call API lấy thông tin chi tiết của phòng dựa theo id phòng lấy trên params xuống
  useEffect(() => {
    (async () => {
      try {
        const data = await phongAPI.getPhongId(id);
        setPhong(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {/* Màn hình loading chờ */}
      <div hidden={!phong.tenPhong ? false : true}>
        <LoadingContent />
      </div>

      <div className={styles.container}>
        <Text fw={700} fz={26} className="mb-3">
          {phong.tenPhong}
        </Text>
        <Image src={phong.hinhAnh} alt={phong.tenPhong} radius={10} />
        <Grid className="mt-3 mb-3">
          <Grid.Col md={8}>
            <Paper shadow="lg" p="md" radius={10}>
              <Text fs={24} fw="bold" mb={10}>
                {phong.khach} khách - {phong.phongNgu} phòng ngủ -{" "}
                {phong.giuong} giường - {phong.phongTam} phòng tắm
              </Text>
              <Text mb={20}>{phong.moTa}</Text>

              <Text fw={700}>Tiện ích:</Text>
              {phong.mayGiat && (
                <p>
                  <IconWashMachine /> Máy giặt
                </p>
              )}
              {phong.tivi && (
                <p>
                  <IconDeviceTv /> Tivi
                </p>
              )}
              {phong.dieuHoa && (
                <p>
                  <IconAirConditioning /> Điều hòa
                </p>
              )}
              {phong.wifi && (
                <p>
                  <IconWifi /> Wifi
                </p>
              )}
              {phong.bep && (
                <p>
                  <IconToolsKitchen2 /> Nhà bếp
                </p>
              )}
              {phong.doXe && (
                <p>
                  <IconParking /> Chỗ đậu xe
                </p>
              )}
              {phong.hoBoi && (
                <p>
                  <IconPool /> Hồ bơi
                </p>
              )}
              {phong.banUi && (
                <p>
                  <IconIroning3 /> Bàn ủi
                </p>
              )}
            </Paper>
          </Grid.Col>
            
          {/* Đặt phòng */}
          <Grid.Col md={4}>
            <DatPhong
              maPhong={id}
              khachToiDa={phong.khach}
              giaTien={phong.giaTien}
              tenPhong={phong.tenPhong}
            />
          </Grid.Col>
        </Grid>

        {/* Bình luận */}
        <BinhLuan maPhong={id} />
      </div>
    </>
  );
};

export default ChiTietPhong;
