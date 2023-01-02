import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";
import { DatePicker } from "@mantine/dates";
import { signup, resetIsSignup } from "../../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Grid,
  Modal,
  Image,
  Group,
  LoadingOverlay,
} from "@mantine/core";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, signupError, isSignupFulfilled } = useSelector(
    (state) => state.auth
  );
  // const [error, setError] = useState("");

  //Mantine
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
    },

    validate: {
      name: (value) =>
        value.length < 6 ? "Tên phải có ít nhất 6 kí tự" : value.length > 16 ? "Tên không được quá 16 kí tự" : null,
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : "Mật khẩu phải có ít nhất 8 kí tự gồm cả chữ và số",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      phone: (value) =>
        value.length < 10 ? "Số điện thoại phải có ít nhất 10 kí tự" : null,
    },
  });

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      birthday: values.birthday.toLocaleDateString(),
    };

    dispatch(signup(newValues));
  };

  return (
    <>
      <div className={styles.container}>
        <Grid>
          <Grid.Col sm={12} md={5}>
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
                <PasswordInput
                  label="Mật Khẩu"
                  mt="md"
                  size="md"
                  {...form.getInputProps("password")}
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

                <Button
                  mt="xl"
                  size="md"
                  type="submit"
                  className={styles.signup__button}
                  color="pink"
                >
                  Đăng Ký
                </Button>
                <LoadingOverlay visible={loading} overlayBlur={2} />
                {signupError && <Text color="red">{signupError}</Text>}
              </form>
            </Paper>
          </Grid.Col>
          <Grid.Col sm={0} md={7}>
            <Image
              src="https://media.cntraveler.com/photos/62a8e81a581aa8cbcc983c34/5:4/w_1000,h_800,c_limit/Airbnb%2043715467%202.jpg"
              height="auto"
              alt="Toàn bộ nhà"
            />
          </Grid.Col>
        </Grid>
      </div>

      <Modal
        withCloseButton={false}
        centered
        opened={isSignupFulfilled}
        onClose={() => dispatch(resetIsSignup())}
        className="text-center"
      >
        <Text size={25} fw={700}>
          Tạo tài khoản thành công
        </Text>

        <Group position="center">
          <Button
            size="md"
            className={styles.signup__button}
            onClick={() => navigate("/signin")}
            color="pink"
          >
            Đăng nhập ngay!
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Signup;
