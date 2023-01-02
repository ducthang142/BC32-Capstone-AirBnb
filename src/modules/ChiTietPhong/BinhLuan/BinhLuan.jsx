import { useState, useEffect } from "react";
import binhluanAPI from "../../../services/binhluanAPI";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  Paper,
  Textarea,
  Button,
  Rating,
  LoadingOverlay,
  Spoiler,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./BinhLuan.module.scss";
import { postCmt } from "../../../slices/roomDetailSlice";

const BinhLuan = ({ maPhong }) => {
  const [binhLuan, setBinhLuan] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { cmtLoading, isCmt } = useSelector((state) => state.roomDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const data = await binhluanAPI.getBinhLuanTheoPhong(maPhong);
        setBinhLuan(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [maPhong, isCmt]);

  //Mantine
  const useStyles = createStyles((theme) => ({
    comment: {
      padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    },

    body: {
      paddingLeft: 54,
      paddingTop: theme.spacing.sm,
    },
  }));
  const { classes } = useStyles();

  const handleComment = () => {
    const values = {
      maPhong: maPhong,
      maNguoiBinhLuan: user.user.id,
      ngayBinhLuan: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      noiDung: comment,
    };

    dispatch(postCmt(values));
    setComment("");
  };

  const url = `/signin?redirectUrl=${location.pathname}`;

  return (
    <>
      <Spoiler maxHeight={390} showLabel="Xem thêm" hideLabel="Ẩn bớt">
        {binhLuan.map((item, index) => (
          <Paper
            withBorder
            radius="md"
            className={classes.comment}
            key={index}
            mb={16}
          >
            <Group>
              <Avatar
                src={item.avatar ? item.avatar : ""}
                alt={item.tenNguoiBinhLuan}
                radius="xl"
                size={40}
              />
              <div>
                <Text size="md" weight={700}>
                  {item.tenNguoiBinhLuan}
                </Text>
                <Text size="xs" color="dimmed">
                  {item.ngayBinhLuan}
                </Text>
              </div>
              <Rating value={item.saoBinhLuan} fractions={2} readOnly />
            </Group>
            <Text className={classes.body} size="sm">
              {item.noiDung}
            </Text>
          </Paper>
        ))}
      </Spoiler>
      <div hidden={!user} className={`${styles.comment} mt-3`}>
        <Group>
          <Avatar src={user ? user.user.avatar : ""} radius="xl" size={40} />
          <div>
            <Text size="md" weight={700}>
              {user?.user.name}
            </Text>
            <Text size="xs" color="dimmed">
              {new Date().getDate()}/{new Date().getMonth() + 1}/
              {new Date().getFullYear()}
            </Text>
          </div>
        </Group>

        <div style={{ position: "relative" }}>
          <Textarea
            placeholder="Để lại bình luận"
            value={comment}
            onChange={(event) => setComment(event.currentTarget.value)}
            mb={16}
            style={{ position: "relative" }}
            styles={(theme) => ({
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.pink[6],
                },
              },
            })}
          />
          <Button onClick={() => handleComment()} color="pink" mb={20}>
            Bình luận
          </Button>
          <LoadingOverlay visible={cmtLoading} overlayBlur={2} />
        </div>
      </div>
      <a
        onClick={() => navigate(url)}
        hidden={user}
        className={styles.comment__login}
      >
        Đăng nhập để bình luận
      </a>
    </>
  );
};

export default BinhLuan;
