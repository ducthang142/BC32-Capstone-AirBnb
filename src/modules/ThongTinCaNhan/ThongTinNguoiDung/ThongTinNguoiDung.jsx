import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Avatar,
  Center,
  Modal,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import nguoidungAPI from "../../../services/nguoidungAPI";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "./ThongTinNguoiDung.module.scss";
import ChinhSuaHoSo from "./ChinhSuaHoSo";
import { updateAvatar, resetIsAvatar } from "../../../slices/authSlice";

const ThongTinNguoiDung = () => {
  const [nguoiDung, setNguoiDung] = useState({});
  const { user, loading, isAvatarFulfilled } = useSelector(
    (state) => state.auth
  );
  const [opened, setOpened] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const isUpdate = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await nguoidungAPI.getThongTinNguoiDungTheoId(
          user.user.id
        );
        setNguoiDung(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [count]);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      avatar: "",
    },
  });

  const [imgPreview, setImgPreview] = useState(null);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("formFile", values.avatar);

    dispatch(updateAvatar(formData));
  };

  const handleChangeImage = (evt) => {
    //Nếu Input là file để lấy dc thông tin file mà user chọn ta dùng: evt.target.files
    const file = evt.target.files[0];

    if (!file) return;

    // set value cho file hình ảnh của react-hook-form
    setValue("avatar", file);

    //Xử lý hiển thị hình ảnh preview cho user thấy

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  };

  return (
    <>
      <p>
        Xin chào <span>{nguoiDung.name}</span>
      </p>

      <ChinhSuaHoSo nguoiDung={nguoiDung} isUpdate={isUpdate} />

      <Card shadow="sm" p="xl" w={350}>
        <Card.Section align="center">
          <Center>
            <Avatar
              radius={160}
              size={160}
              color="pink"
              src={nguoiDung.avatar}
            />
          </Center>
          <p onClick={() => setOpened(true)} className={styles.avatar}>
            Cập nhật ảnh
          </p>
        </Card.Section>

        <Text weight={500} size="lg" mt="md" align="center">
          {nguoiDung.name}
        </Text>

        <Text mt="xs" color="dimmed" size="sm" align="center">
          {nguoiDung.email}
        </Text>

        <Text mt="xs" color="dimmed" size="sm" align="center">
          {new Date(nguoiDung.birthday).getDate()}/
          {new Date(nguoiDung.birthday).getMonth() + 1}/
          {new Date(nguoiDung.birthday).getFullYear()}
        </Text>

        <Text mt="xs" color="dimmed" size="sm" align="center">
          {nguoiDung.phone}
        </Text>
      </Card>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Cập nhật ảnh avatar"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ position: "relative" }}
        >
          <div>
            <input type="file" onChange={handleChangeImage} />
            {imgPreview && <img width="150" src={imgPreview} alt="preview" />}
          </div>
          <button>Cập nhật</button>
          <LoadingOverlay visible={loading} overlayBlur={2} />
        </form>
      </Modal>

      <Modal
        opened={isAvatarFulfilled}
        withCloseButton={false}
        onClose={() => dispatch(resetIsAvatar()) & isUpdate()}
        size="auto"
        centered
      >
        <Title>Cập nhật thành công</Title>
      </Modal>
    </>
  );
};

export default ThongTinNguoiDung;
