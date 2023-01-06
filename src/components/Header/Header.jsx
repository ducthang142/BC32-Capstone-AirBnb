import styles from "./Header.module.scss";
import SearchBar from "./SearchBar";
import { logout } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Menu,
  Avatar,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useWindowSize from "../../utils/useWindowSize";

const Header1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = useWindowSize();
  const { user } = useSelector((state) => state.auth);

  const useStyles = createStyles((theme) => ({
    link: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: "none",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,

      [theme.fn.smallerThan("sm")]: {
        height: 42,
        display: "flex",
        alignItems: "center",
        width: "100%",
      },

      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      }),
    },

    subLink: {
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,

      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
      }),

      "&:active": theme.activeStyles,
    },

    hiddenMobile: {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },

    hiddenDesktop: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },
  }));

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <>
      <Box className={styles.header}>
        <Header
          height={size.width > 549 ? 60 : 120}
          px="md"
          className={styles.container}
        >
          <Group position="apart" sx={{ height: "100%" }}>
            <Image
              width={130}
              src="./image/logo.png"
              alt="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />

            <div hidden={size.width > 549 ? false : true}>
              <SearchBar />
            </div>

            <Group className={classes.hiddenMobile} hidden={user}>
              <Button
                variant="outline"
                color="pink"
                onClick={() => navigate("/signin")}
                w={107}
              >
                Đăng nhập
              </Button>
              <Button onClick={() => navigate("/signup")} color="pink" w={107}>
                Đăng ký
              </Button>
            </Group>

            <Menu
              width={160}
              shadow="md"
              hidden={!user}
              styles={{
                item: {
                  "&[data-hovered]": {
                    backgroundColor: theme.colors.pink[6],
                    color: theme.white,
                  },
                },
              }}
            >
              <Menu.Target>
                <Avatar
                  radius="xl"
                  size={40}
                  src={user ? user.user.avatar : null}
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  component="a"
                  onClick={() => navigate("/thongtincanhan")}
                >
                  Thông tin tài khoản
                </Menu.Item>

                <Menu.Item component="a" onClick={() => dispatch(logout())}>
                  Đăng Xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
              hidden={user}
            />
            <div hidden={size.width > 549 ? true : false}>
              <SearchBar />
            </div>
          </Group>
        </Header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <Group position="center" grow pb="xl" px="md">
              <Button
                variant="outline"
                color="pink"
                onClick={() => navigate("/signin")}
              >
                Đăng nhập
              </Button>
              <Button color="pink" onClick={() => navigate("/signup")}>
                Đăng ký
              </Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
};

export default Header1;
