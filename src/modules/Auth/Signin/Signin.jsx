import { useForm } from "@mantine/form";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Grid,
  Image,
  LoadingOverlay
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { signin } from "../../../slices/authSlice";
import styles from "./Signin.module.scss";

const Signin = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
 
  //Mantine
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : "Tài khoản phải có ít nhất 8 kí tự gồm cả chữ và số",
    },
  });

  const handleSubmit = (values) => {
    dispatch(signin(values));
  };

  if (user) {
    const redirectUrl = searchParams.get("redirectUrl");
    // Có thông tin user => đã đăng nhập => redirect về redirectUrl hoặc Home
    return <Navigate to={redirectUrl || "/"} replace />;
  }

  return (
    <div className={styles.container}>
      <Grid>
        <Grid.Col sm={12} md={5}>
          <Paper radius={15} p={30} shadow="xl">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))} style={{ position: 'relative' }}>
              <Title order={2} align="center" mt="md" mb={50}>
                Đăng Nhập
              </Title>

              <TextInput
                label="Email"
                size="md"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Mật Khẩu"
                mt="md"
                size="md"
                {...form.getInputProps("password")}
              />
              
              <Button
                mt="xl"
                size="md"
                type="submit"
                className={styles.signin__button}
              >
                Đăng Nhập
              </Button>
              <LoadingOverlay visible={loading} overlayBlur={2} />
             
              {error && <Text color="red">{error}</Text>}
            </form>
            <Text align="center" mt="md">
              Chưa có tài khoản?{" "}
              <span
                onClick={() => navigate("/signup")}
                className={styles.signin__dangKy}
              >
                Đăng ký ngay!
              </span>
            </Text>
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
  );
};

export default Signin;
