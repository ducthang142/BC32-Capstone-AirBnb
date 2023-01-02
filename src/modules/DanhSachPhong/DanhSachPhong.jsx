import { useEffect, useState } from "react";
import styles from "./DanhSachPhong.module.scss";
import { useParams } from "react-router-dom";
import phongAPI from "../../services/phongAPI";
import { Badge, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DanhSachPhong = () => {
  const { maViTri } = useParams();
  const [phong, setPhong] = useState([]);
  const navigate = useNavigate();
  const {count} = useSelector((state) => state.home)

  useEffect(() => {
    (async () => {
      try {
        const data = await phongAPI.getPhongTheoViTri(maViTri);
        setPhong(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [count]);

  return (
    <div className={styles.container}>
      <br />
      <br />
      <br />
      <br />

      {phong?.map((item, index) => (
        <div key={index}>
          <Image src={item.hinhAnh} alt={item.tenPhong} />
          <h4>{item.tenPhong}</h4>
          <p>{item.moTa}</p>
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
          <p>${item.giaTien} /đêm</p>
          <button onClick={()=>navigate(`/chitietphong/${item.id}`)}>Chi tiết phòng</button>
        </div>
      ))}
    </div>
  );
};

export default DanhSachPhong;
