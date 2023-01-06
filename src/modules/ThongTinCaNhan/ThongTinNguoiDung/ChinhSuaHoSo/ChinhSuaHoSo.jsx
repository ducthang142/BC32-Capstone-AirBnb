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
  Group,
} from "@mantine/core";
import styles from "./ChinhSuaHoSo.module.scss";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { update, resetIsUpdate } from "../../../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import formatDateToFE from "../../../../utils/formatDateToFE";
import formatDateUpAPI from "../../../../utils/formatDateUpAPI";
import TickSuccessIcon from "../../../../components/TickSuccessIcon";

const ChinhSuaHoSo = ({ nguoiDung, isUpdate }) => {
  const [opened, setOpened] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const [openSuccess, setOpenSuccess] = useState(false);
  const { loading, updateError, isUpdateFulfilled } = useSelector(
    (state) => state.auth
  );

  //form
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

  //fill lên input
  useEffect(() => {
    form.setValues({
      name: nguoiDung.name,
      email: nguoiDung.email,
      phone: nguoiDung.phone,
      birthday: new Date(formatDateToFE(nguoiDung.birthday)),
      gender: true,
    });
  }, [opened]);

  //Hiện cảnh báo confirm
  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      birthday: formatDateUpAPI(values.birthday),
    };
    setUserInfo(newValues);
    setOpenModal(true);
  };

  //Call API update thông tin
  const handleUpdate = () => {
    const values = { ...userInfo, id: nguoiDung.id };
    dispatch(update(values));
    setOpenModal(false);
  };

  //Thông báo thành công
  useEffect(() => {
    if (isUpdateFulfilled) {
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 1500);
      isUpdate();
      dispatch(resetIsUpdate());
    }
  }, [isUpdateFulfilled]);

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
              Sửa thông tin cá nhân
            </Title>

            <TextInput
              label="Họ Tên"
              mt="md"
              size="md"
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Email"
              mt="md"
              size="md"
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Số Điện Thoại"
              mt="md"
              size="md"
              styles={(theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.pink[6],
                  },
                },
              })}
              {...form.getInputProps("phone")}
            />

            <DatePicker
              placeholder="Chọn ngày"
              label="Ngày Sinh"
              mt="md"
              size="md"
              inputFormat="DD/MM/YYYY"
              labelFormat="MM/YYYY"
              dropdownType="modal"
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
                  },
                },
              })}
              {...form.getInputProps("birthday")}
            />

            <Button mt="xl" size="md" type="submit" color="pink">
              Cập Nhật
            </Button>
            {updateError && <Text color="red">{updateError}</Text>}
            <LoadingOverlay visible={loading} overlayBlur={2} loaderProps={{ size: "sm", color: "pink", variant: "bars" }}/>
          </form>
        </Paper>
      </Drawer>

      {/* Modal */}
      <Modal opened={openModal} onClose={() => setOpenModal(false)}>
        <Title m={20} className="text-center">
          Bạn có muốn cập nhật lại thông tin!
        </Title>
        <Group position="center">
          <Button
            onClick={() => handleUpdate()}
            w={90}
            color="pink"
            variant="outline"
          >
            Có
          </Button>
          <Button onClick={() => setOpenModal(false)} w={90} color="pink">
            Không
          </Button>
        </Group>
      </Modal>

      <Modal opened={openSuccess} withCloseButton={false} size="auto">
        <TickSuccessIcon />

        <Text m={12} fw={700} fz={32} className="text-center">
          Cập nhật thành công
        </Text>
      </Modal>
    </>
  );
};

export default ChinhSuaHoSo;
