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
  Text
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DatPhong.module.scss";
import { booking, resetIsBooked } from "../../../slices/roomDetailSlice";
import useWindowSize from "../../../utils/useWindowSize";
import TickSuccessIcon from "../../../components/TickSuccessIcon";

const DatPhong = ({ maPhong, khachToiDa, giaTien, tenPhong }) => {
  const [value, setValue] = useState([null, null]);
  const [danhSachPhongDat, setDanhSachPhongDat] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { bookingLoading, isBooked, count } = useSelector(
    (state) => state.roomDetail
  );
  const [opened, setOpened] = useState(false);
  const size = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openBooking, setOpenBooking] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [thongTinPhongDat, setThongTinPhongDat] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);

  //Đặt url để chuyển hướng người dùng về trang đăng nhập, sau khi đăng nhập xong sẽ đưa về lại trang chi tiết phòng
  const url = `/signin?redirectUrl=${location.pathname}`;

  //Call API để lấy danh sách đặt phòng
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

  //Lọc danh sách đặt phòng của mã phòng đang xem và chưa trả phòng(=> ngày đi phải lớn hơn ngày hiện tại)
  const danhSachDaDat = danhSachPhongDat?.filter(
    (item) => item.maPhong == maPhong && new Date(item.ngayDi) > new Date()
  );

  //Biến mảng danh sách trên thành các phần tử object có dạng {ngayDen,ngayDi}
  const danhSachNgayDat = danhSachDaDat.map((item) => {
    return { ngayDen: item.ngayDen, ngayDi: item.ngayDi };
  });

  //Dùng hàm getDatesInRange để biến mảng danh sánh thành các phân tử có object chứa các ngày cụ thể giữa 2 khoảng ngày đến và ngày đi
  const NewDanhSachNgayDat = danhSachNgayDat.map((item) => {
    return getDatesInRange(new Date(item.ngayDen), new Date(item.ngayDi));
  });

  //Nối các object trong mảng vừa tìm dc ở trên thành 1 mảng duy nhất
  let days = [];
  for (let i = 0; i < NewDanhSachNgayDat.length; i++) {
    days = days.concat(NewDanhSachNgayDat[i]);
  }

  //Quy đổi ngày trang mảng days ở trên qua times rồi dùng sort() để sắp xếp theo thứ tự từ lớn đến nhỏ
  days = days.map((item) => item.getTime());
  days.sort();

  //Sau khi người dùng chọn ngày đến, thì sẽ lọc ra 1 mảng maxDates gồm những ngày lớn hơn ngày dc người dùng chọn, thì khi đó phần tử đầu tiên của mảng maxDates sẽ là giới hạn cho người dùng chọn ngày đi
  const maxDates = value[0]
    ? days.filter((item) => item > value[0].getTime())
    : "";

  //Quy đổi mảng maxDates cũ từ dạng time qua dạng ngày
  const newMaxDates = maxDates ? maxDates.map((item) => new Date(item)) : "";

  //Số khách
  const [nguoiLon, setNguoiLon] = useState(1);
  const [treEm, setTreEm] = useState(0);
  const [emBe, setEmBe] = useState(0);
  const [thuCung, setThuCung] = useState(0);

  //Khách chỉ tính người lớn và trẻ em, em bé và thú cưng ko tính vào
  const khach = nguoiLon + treEm;

  //Chức năng cho phím tăng người
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

  //Chức năng cho phím giảm người
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

  //Tính số ngày thuê của người dùng, dùng hàm calDatesInrange truyền vào ngày đến và ngày đi để tính
  const soDemThue = value[1] ? calDatesInRange(value[0], value[1]) : 0;

  //Đặt phòng

  //Hiện cảnh báo và confirm modal
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

  //Call API đặt phòng
  const handleConfirm = () => {
    dispatch(booking(thongTinPhongDat));
    setValue([null, null]);
  };

  //Hiện thông báo thành công
  useEffect(() => {
    if (isBooked) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      setOpenBooking(false);
      dispatch(resetIsBooked());
    }
  }, [isBooked]);

  return (
    <>
      <div className={styles.card}>
        <h4>${giaTien} /đêm</h4>
        <DateRangePicker
          label="Chọn ngày thuê"
          placeholder="Ngày đến - Ngày đi"
          value={value}
          onChange={setValue}
          amountOfMonths={2}
          inputFormat="DD/MM/YYYY"
          minDate={value[0] || new Date()}
          maxDate={newMaxDates[0]}
          excludeDate={(date) => days.includes(new Date(date).getTime())}
          styles={(theme) => ({
            input: {
              "&:focus-within": {
                borderColor: theme.colors.pink[6],
              },
            },

            calendarHeaderLevel: {
              backgroundColor: theme.colors.pink[6],
              "&:hover": {
                backgroundColor: theme.colors.pink[6],
              },
            },

            monthPickerControlActive: {
              backgroundColor: theme.colors.pink[6],
              "&:hover": {
                backgroundColor: theme.colors.pink[6],
              },
            },

            yearPickerControlActive: {
              backgroundColor: theme.colors.pink[6],
              "&:hover": {
                backgroundColor: theme.colors.pink[6],
              },
            },

            day: {
              "&[data-selected]": {
                backgroundColor: theme.colors.pink[6],
                pointerEvents: "none",
              },
            },

            calendarBase: {
              flexDirection: `${size.width < 600 ? "column" : "row"}`,
            },
          })}
        />

        <Menu position="bottom-start">
          <Menu.Target>
            <Input
              value={`${khach} khách`}
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              mt={10}
            />
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
        <Button onClick={() => handleBooking()} color="pink" mb={20}>
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

      <Modal opened={openSuccess} withCloseButton={false} size="auto">
        <TickSuccessIcon />

        <Text m={12} fw={700} fz={32} className="text-center">
          Đặt phòng thành công
        </Text>
      </Modal>
    </>
  );
};

export default DatPhong;
