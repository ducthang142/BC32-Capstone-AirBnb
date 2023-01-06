import { useEffect, useState } from "react";
import styles from "./DanhSachPhong.module.scss";
import { useParams } from "react-router-dom";
import phongAPI from "../../services/phongAPI";
import { Badge, Image, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Text } from "@mantine/core";
import LoadingContent from "../../components/LoadingContent";

const DanhSachPhong = () => {
  const { maViTri } = useParams();
  const [phong, setPhong] = useState([]);
  const navigate = useNavigate();
  const { count } = useSelector((state) => state.home);

  //Call API lấy danh sách phòng thuê dựa theo mã vị trí lấy từ trên params xuống
  useEffect(() => {
    (async () => {
      try {
        const data = await phongAPI.getPhongTheoViTri(maViTri);
        setPhong(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [count]);

  return (
    <>
      <div hidden={!phong[0] ? false : true}>
        <LoadingContent />
      </div>

      <div className={styles.container}>
        {phong?.map((item, index) => (
          <Paper
            shadow="xl"
            key={index}
            style={{ margin: "1rem 0 4rem 0" }}
            radius={10}
            p={20}
          >
            <Image src={item.hinhAnh} alt={item.tenPhong} radius={10} />
            <Text fw={700} fz={26} mt={10}>
              {item.tenPhong}
            </Text>
            <Text mt={10} mb={10}>
              {item.moTa}
            </Text>
            <Badge color="pink">{item.khach} khách</Badge>
            <Badge color="pink">{item.phongNgu} phòng ngủ</Badge>
            <Badge color="pink">{item.giuong} giường</Badge>
            <Badge color="pink">{item.phongTam} phòng tắm</Badge>
            <Badge color="pink">{item.phongTam} phòng tắm</Badge>

            {item.mayGiat && <Badge color="pink">Máy giặt</Badge>}
            {item.banLa && <Badge color="pink">Bàn Là</Badge>}
            {item.tivi && <Badge color="pink">Ti vi</Badge>}
            {item.dieuHoa && <Badge color="pink">Điều Hòa</Badge>}
            {item.wifi && <Badge color="pink">Wifi</Badge>}
            {item.bep && <Badge color="pink">Bếp</Badge>}
            {item.doXe && <Badge color="pink">Đỗ xe</Badge>}
            {item.hoBoi && <Badge color="pink">Hồ bơi</Badge>}
            {item.banUi && <Badge color="pink">Bàn ủi</Badge>}
            <Text fw={500} mb={10} mt={10} fz="1.3rem">
              ${item.giaTien} /đêm
            </Text>
            <Button
              onClick={() => navigate(`/chitietphong/${item.id}`)}
              color="pink"
              mb={10}
            >
              Chi tiết phòng
            </Button>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default DanhSachPhong;
