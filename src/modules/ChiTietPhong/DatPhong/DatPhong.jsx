import { useState, useEffect } from "react";
import datphongAPI from "../../../services/datphongAPI";
import { DateRangePicker } from "@mantine/dates";
import getDatesInRange from "../../../utils/getDatesInRange";
import calDatesInRange from "../../../utils/calDatesInRange";
import {
  Menu,
  Button,
  Modal,
  Title,
  Input,
  LoadingOverlay,
  Group,
  Text,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DatPhong.module.scss";
import { booking, resetIsBooked } from "../../../slices/roomDetailSlice";

const DatPhong = ({ maPhong, khachToiDa, giaTien, tenPhong }) => {
  const [value, setValue] = useState([null, null]);
  const [danhSachPhongDat, setDanhSachPhongDat] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { bookingLoading, isBooked, count } = useSelector(
    (state) => state.roomDetail
  );
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openBooking, setOpenBooking] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [thongTinPhongDat, setThongTinPhongDat] = useState({});

  const url = `/signin?redirectUrl=${location.pathname}`;

  useEffect(() => {
    (async () => {
      try {
        const data = await datphongAPI.getDanhSachPhongDat();
        setDanhSachPhongDat(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [count]);

  const danhSachDaDat = danhSachPhongDat?.filter(
    (item) => item.maPhong == maPhong && new Date(item.ngayDi) > new Date()
  );

  const danhSachNgayDat = danhSachDaDat.map((item) => {
    return { ngayDen: item.ngayDen, ngayDi: item.ngayDi };
  });

  const NewDanhSachNgayDat = danhSachNgayDat.map((item) => {
    return getDatesInRange(new Date(item.ngayDen), new Date(item.ngayDi));
  });

  let a = [];

  for (let i = 0; i < NewDanhSachNgayDat.length; i++) {
    a = a.concat(NewDanhSachNgayDat[i]);
  }

  const d = a.map((item) => item.getTime());
  d.sort();

  const b = value[0] ? d.filter((item) => item > value[0].getTime()) : "";

  const newB = b ? b.map((item) => new Date(item)) : "";

  //Số khách
  const [nguoiLon, setNguoiLon] = useState(1);
  const [treEm, setTreEm] = useState(0);
  const [emBe, setEmBe] = useState(0);
  const [thuCung, setThuCung] = useState(0);

  const khach = nguoiLon + treEm;

  const handleIncrease = (loaiKhach) => {
    switch (loaiKhach) {
      case "nguoiLon":
        setNguoiLon(nguoiLon + 1);
        break;
      case "treEm":
        setTreEm(treEm + 1);
        break;
      case "emBe":
        setEmBe(emBe + 1);
        break;
      case "thuCung":
        setThuCung(thuCung + 1);
        break;
      default:
    }
  };

  const handleDecrease = (loaiKhach) => {
    switch (loaiKhach) {
      case "nguoiLon":
        setNguoiLon(nguoiLon - 1);
        break;
      case "treEm":
        setTreEm(treEm - 1);
        break;
      case "emBe":
        setEmBe(emBe - 1);
        break;
      case "thuCung":
        setThuCung(thuCung - 1);
        break;
      default:
    }
  };

  const soDemThue = value[1] ? calDatesInRange(value[0], value[1]) : 0;

  //Đặt phòng
  const handleBooking = () => {
    if (!user) {
      setOpened(true);
      return;
    } else if (!value[1]) {
      setOpenWarning(true);
    } else {
      const values = {
        id: 0,
        maPhong: maPhong,
        ngayDen: new Date(value[0].getTime() + 28800000).toISOString(),
        ngayDi: new Date(value[1].getTime() + 28800000).toISOString(),
        soLuongKhach: khach,
        maNguoiDung: user.user.id,
      };

      setThongTinPhongDat(values);
      setOpenBooking(true);
    }
  };

  const handleConfirm = () => {
    dispatch(booking(thongTinPhongDat));
    console.log(thongTinPhongDat);
    setValue([null, null]);
  };

  return (
    <>
      <div className={styles.card}>
        <h4>${giaTien} đêm</h4>
        <DateRangePicker
          label="Book"
          placeholder="Ngày đến - Ngày đi"
          value={value}
          onChange={setValue}
          amountOfMonths={2}
          inputFormat="DD/MM/YYYY"
          minDate={value[0] || new Date()}
          maxDate={newB[0]}
          excludeDate={(date) => d.includes(new Date(date).getTime())}
          styles={(theme) => ({
            input: {
              "&:focus-within": {
                borderColor: theme.colors.pink[6],
              },
            },
          })}
        />

        <Menu position="bottom-start">
          <Menu.Target>
            <Input value={`${khach} khách`} />
          </Menu.Target>
          <Menu.Dropdown className={styles.menu}>
            <div>
              <p>Người lớn</p>
              <button
                onClick={() => handleDecrease("nguoiLon")}
                disabled={nguoiLon === 1}
              >
                -
              </button>{" "}
              <span>{nguoiLon}</span>
              <button
                onClick={() => handleIncrease("nguoiLon")}
                disabled={khach === khachToiDa}
              >
                +
              </button>
            </div>
            <div>
              <p>Trẻ em</p>
              <button
                onClick={() => handleDecrease("treEm")}
                disabled={treEm === 0}
              >
                -
              </button>{" "}
              <span>{treEm}</span>
              <button
                onClick={() => handleIncrease("treEm")}
                disabled={khach === khachToiDa}
              >
                +
              </button>
            </div>
            <div>
              <p>Em bé</p>
              <button
                onClick={() => handleDecrease("emBe")}
                disabled={emBe === 0}
              >
                -
              </button>{" "}
              <span>{emBe}</span>
              <button
                onClick={() => handleIncrease("emBe")}
                disabled={emBe === 5}
              >
                +
              </button>
            </div>
            <div>
              <p>Thú cưng</p>
              <button
                onClick={() => handleDecrease("thuCung")}
                disabled={thuCung === 0}
              >
                -
              </button>{" "}
              <span>{thuCung}</span>
              <button
                onClick={() => handleIncrease("thuCung")}
                disabled={thuCung === 5}
              >
                +
              </button>
            </div>
          </Menu.Dropdown>
        </Menu>
        <br />
        <Button onClick={() => handleBooking()} color="pink">
          Đặt Phòng
        </Button>

        <div>
          <table class="table">
            <tbody>
              <tr>
                <td scope="row">
                  ${giaTien} x {soDemThue} đêm
                </td>
                <td>${giaTien * soDemThue}</td>
              </tr>
              <tr>
                <td>Tổng trước thuế</td>
                <td>${giaTien * soDemThue}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal size="auto" opened={opened} withCloseButton={false} centered>
        <Title m={20}>Đăng nhập để đặt phòng!</Title>
        <Group position="center">
          <Button onClick={() => navigate(url)} color="pink" w={120}>
            Đăng Nhập
          </Button>
          <Button
            onClick={() => setOpened(false)}
            color="pink"
            w={120}
            variant="outline"
          >
            Đóng
          </Button>
        </Group>
      </Modal>

      <Modal
        size="auto"
        opened={openWarning}
        onClose={() => setOpenWarning(false)}
        withCloseButton={false}
        centered
      >
        <Title m={20}>Hãy chọn ngày muốn thuê!</Title>
        <Group position="center">
          <Button onClick={() => setOpenWarning(false)} color="pink">
            Đóng
          </Button>
        </Group>
      </Modal>

      <Modal
        size="auto"
        opened={openBooking}
        onClose={() => setOpenBooking(false)}
        withCloseButton={false}
      >
        <Title className="text-center mb-3">Thông tin phòng đặt</Title>
        <table className={`${styles.table} table`}>
          <tr>
            <td>
              <h5>Tên phòng:</h5>
            </td>
            <td>{tenPhong}</td>
          </tr>
          <tr>
            <td>
              <h5>Số khách:</h5>
            </td>
            <td>{thongTinPhongDat.soLuongKhach}</td>
          </tr>
          <tr>
            <td>
              <h5>Ngày đến:</h5>
            </td>
            <td>
              {new Date(thongTinPhongDat.ngayDen).getDate()}/
              {new Date(thongTinPhongDat.ngayDen).getMonth() + 1}/
              {new Date(thongTinPhongDat.ngayDen).getFullYear()}
            </td>
          </tr>
          <tr>
            <td>
              <h5>Ngày đi:</h5>
            </td>
            <td>
              {new Date(thongTinPhongDat.ngayDi).getDate()}/
              {new Date(thongTinPhongDat.ngayDi).getMonth() + 1}/
              {new Date(thongTinPhongDat.ngayDi).getFullYear()}
            </td>
          </tr>
          <tr>
            <td>
              <h5>Tổng tiền:</h5>
            </td>
            <td>${giaTien * soDemThue}</td>
          </tr>
        </table>
        <Group position="center" style={{ position: "relative" }}>
          <Button onClick={() => handleConfirm()} w={100} color="pink">
            Đồng ý
          </Button>
          <Button
            onClick={() => setOpenBooking(false)}
            w={100}
            color="pink"
            variant="outline"
          >
            Hủy
          </Button>
        </Group>
        <LoadingOverlay visible={bookingLoading} overlayBlur={2} />
      </Modal>

      <Modal size="auto" opened={isBooked} withCloseButton={false} centered>
        <Title m={20}>Đặt phòng thành công!</Title>

        <Group position="center">
          <Button
            onClick={() => dispatch(resetIsBooked()) & setOpenBooking(false)}
            color="pink"
          >
            Đóng
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default DatPhong;
