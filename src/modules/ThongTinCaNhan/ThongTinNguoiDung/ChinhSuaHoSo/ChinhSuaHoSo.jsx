import { useState, useEffect } from "react";
import {
  Drawer,
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import styles from "./ChinhSuaHoSo.module.scss";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { update, resetIsUpdate } from "../../../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ChinhSuaHoSo = ({ nguoiDung, isUpdate }) => {
  const [opened, setOpened] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const { loading, updateError, isUpdateFulfilled } = useSelector(
    (state) => state.auth
  );

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
    },

    validate: {
      name: (value) =>
        value.length < 6 ? "Tên phải có ít nhất 6 kí tự" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      phone: (value) =>
        value.length < 10 ? "Số điện thoại phải có ít nhất 10 kí tự" : null,
    },
  });

  useEffect(() => {
    form.setValues({
      name: nguoiDung.name,
      email: nguoiDung.email,
      phone: nguoiDung.phone,
      birthday: new Date(nguoiDung.birthday),
      gender: true,
    });
  }, [opened]);

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      birthday: values.birthday.toLocaleDateString(),
    };
    setUserInfo(newValues);
    setOpenModal(true);
  };

  const handleUpdate = () => {
    const values = { ...userInfo, id: nguoiDung.id };
    dispatch(update(values));
    setOpenModal(false);
  };

  return (
    <>
      <p onClick={() => setOpened(true)} className={styles.avatar}>
        Chỉnh sửa hồ sơ
      </p>

      {/* Drawer */}

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
      >
        <Paper radius={15} p={30} shadow="xl">
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            style={{ position: "relative" }}
          >
            <Title order={2} align="center" mt="md" mb={50}>
              Đăng Ký
            </Title>

            <TextInput
              label="Họ Tên"
              mt="md"
              size="md"
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Email"
              mt="md"
              size="md"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Số Điện Thoại"
              mt="md"
              size="md"
              {...form.getInputProps("phone")}
            />

            <DatePicker
              placeholder="Chọn ngày"
              label="Ngày Sinh"
              mt="md"
              size="md"
              inputFormat="DD/MM/YYYY"
              labelFormat="MM/YYYY"
              {...form.getInputProps("birthday")}
            />

            <Button mt="xl" size="md" type="submit">
              Cập Nhật
            </Button>
            {updateError && <Text color="red">{updateError}</Text>}
            <LoadingOverlay visible={loading} overlayBlur={2} />
          </form>
        </Paper>
      </Drawer>

      {/* Modal */}
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Bạn có muốn cập nhật lại thông tin!"
      >
        <Button onClick={() => handleUpdate()}>Có</Button>
        <Button onClick={() => setOpenModal(false)}>Không</Button>
      </Modal>

      <Modal
        opened={isUpdateFulfilled}
        withCloseButton={false}
        onClose={() => dispatch(resetIsUpdate()) & isUpdate()}
        size="auto"
        centered
      >
        <Title>Cập nhật thành công</Title>
      </Modal>
    </>
  );
};

export default ChinhSuaHoSo;
