import { useState, useEffect } from "react";
import datphongAPI from "../../../services/datphongAPI";
import phongAPI from "../../../services/phongAPI";
import { useSelector } from "react-redux";
import { Card, Image, Text, Group, createStyles, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import LoadingContent from "../../../components/LoadingContent";

const ThongTinDatPhong = () => {
  const { user } = useSelector((state) => state.auth);
  const [thongTinDatPhong, setThongTinDatPhong] = useState([]);
  const [thongTinPhong, setThongTinPhong] = useState([]);
  const navigate = useNavigate();

  //Call API lấy thông tin đặt phòng theo ID người dùng và danh sách phòng
  useEffect(() => {
    (async () => {
      try {
        const data = await datphongAPI.getThongTinDatPhongTheoNguoiDung(
          user.user.id
        );
        const data2 = await phongAPI.getPhong();

        setThongTinDatPhong(data);
        setThongTinPhong(data2);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //Tìm kiếm thông tin phòng theo mã phòng
  const handleRoomInfo = (maPhong) => {
    const phong = thongTinPhong.filter((item) => item.id === maPhong);
    return phong;
  };

  //CSS của thư viện Mantine
  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    footer: {
      display: "flex",
      justifyContent: "space-between",
      padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      lineHeight: 1,
    },
  }));

  const { classes } = useStyles();

  return (
    <>
      <div hidden={!thongTinDatPhong[0] ? false : true}>
        <LoadingContent />
      </div>
      {thongTinDatPhong?.map((item, index) => (
        <Card withBorder p="lg" className={classes.card} key={index} mb={20}>
          <Card.Section>
            <Image
              src={handleRoomInfo(item.maPhong)[0].hinhAnh}
              alt={item.maPhong}
              height={200}
            />
          </Card.Section>

          <Group position="apart" mt="xl">
            <Text size="sm" weight={700} className={classes.title}>
              {handleRoomInfo(item.maPhong)[0].tenPhong}
            </Text>
            <Text mt="sm" mb="md" color="dimmed" size="xs">
              Số khách: {item.soLuongKhach}
            </Text>
          </Group>
          <Text mt="sm" mb="md" color="dimmed" size="xs">
            Ngày đến: {new Date(item.ngayDen).getDate()}/
            {new Date(item.ngayDen).getMonth() + 1}/
            {new Date(item.ngayDen).getFullYear()} - Ngày đi:{" "}
            {new Date(item.ngayDi).getDate()}/
            {new Date(item.ngayDi).getMonth() + 1}/
            {new Date(item.ngayDi).getFullYear()}
          </Text>

          <Card.Section className={classes.footer}>
            <Button
              onClick={() => navigate(`/chitietphong/${item.maPhong}`)}
              color="pink"
            >
              Xem chi tiết phòng
            </Button>
          </Card.Section>
        </Card>
      ))}
    </>
  );
};

export default ThongTinDatPhong;
