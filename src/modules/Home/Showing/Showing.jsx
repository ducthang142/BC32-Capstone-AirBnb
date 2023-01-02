import { useState, useEffect } from "react";
import vitriAPI from "../../../services/vitriAPI";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Paper, Text, Title, Button, useMantineTheme } from "@mantine/core";
import styles from "./Showing.module.scss";

const Showing = () => {
  const [viTri, setViTri] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await vitriAPI.getViTriPhanTrang();
        setViTri(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //Carousel
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = viTri?.data?.map((item, index) => (
    <Carousel.Slide key={index}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${item.hinhAnh})` }}
        className={styles.showing__card}
      >
        <div>
          <Text size="xs" className={styles.showing__text}>
            {item.tinhThanh}
          </Text>
          <Title order={3} className={styles.showing__title}>
            {item.tenViTri}
          </Title>
        </div>
        <Button variant="white" color="dark">
          Read more
        </Button>
      </Paper>
    </Carousel.Slide>
  ));

  return (
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
    >
      {slides}
    </Carousel>
  );
};

export default Showing;
