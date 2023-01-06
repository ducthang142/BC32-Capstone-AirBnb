import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import styles from "./Showing.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { listViTriPhanTrang } from "../../../slices/homeSlice";

const Showing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { danhSachViTriPhanTrang, loading } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(listViTriPhanTrang());
  }, []);

  //Carousel
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = danhSachViTriPhanTrang?.data?.map((item, index) => (
    <Carousel.Slide key={index} >
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${item.hinhAnh})` }}
        className={styles.showing__card}
      >
        
        <div>
          <Text size="xs" className={styles.showing__text} color="pink">
            {item.tinhThanh}
          </Text>
          <Title order={3} className={styles.showing__title} color="pink">
            {item.tenViTri}
          </Title>
        </div>
        <Button
          variant="light"
          color="pink"
          onClick={() => navigate(`/danhsachphong/${item.id}`)}
        >
          Danh sách phòng
        </Button>
      </Paper>
    
    </Carousel.Slide>
  ));

  return (
    <div style={{ position: "relative" }}>
      <div style={{ height: "400px" }} hidden={!loading}></div>
      <Carousel
        slideSize="20%"
        breakpoints={[
          { maxWidth: "sm", slideSize: "100%", slideGap: 2 },
          { maxWidth: "md", slideSize: "50%", slideGap: "xl" },
          { maxWidth: "lg", slideSize: "33.333333%", slideGap: "xl" },
          { maxWidth: "xl", slideSize: "25%", slideGap: "xl" },
        ]}
        slideGap="lg"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
        className={styles.container}
        id="showing"
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },

            backgroundColor: theme.colors.pink[6],
          },
        }}
      >
        {slides}
      </Carousel>
      <LoadingOverlay
        visible={loading}
        overlayBlur={2}
        loaderProps={{ size: "lg", color: "pink", variant: "bars" }}
      />
    </div>
  );
};

export default Showing;
