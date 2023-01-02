import React from "react";
import { Grid, Card, Image, Text } from "@mantine/core";
import styles from "./Features.module.scss";

const Features = () => {
  return (
    <Grid className={styles.container}>
      <Grid.Col md={6} xl={3}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://www.mydomaine.com/thmb/yE8D0r4ov5b3VKlF6Kshd9lrR5c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/binary-4--583f06853df78c6f6a9e0b7a.jpeg"
              height={250}
              alt="Toàn bộ nhà"
            />
          </Card.Section>

          <Text weight={500} mt={20}>
            Toàn bộ nhà
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col md={6} xl={3}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://amazingarchitecture.com/storage/2577/casa_de_abdullah_jamaliah_arkitects_tenkasi_india.jpg"
              height={250}
              alt="Chỗ ở độc đáo"
            />
          </Card.Section>

          <Text weight={500} mt={20}>
            Chỗ ở độc đáo
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col md={6} xl={3}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://www.farmersmuseum.org/wp-content/uploads/2019/02/57286202_10156205146421828_7571448892357607424_n.jpeg"
              height={250}
              alt="Trang trại và thiên nhiên"
            />
          </Card.Section>

          <Text weight={500} mt={20}>
            Trang trại và thiên nhiên
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col md={6} xl={3}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://www.burgesspetcare.com/wp-content/uploads/2022/04/Dog-with-boxes-moving-house.webp"
              height={250}
              alt="Cho phép mang thú cưng"
            />
          </Card.Section>

          <Text weight={500} mt={20}>
            Cho phép mang thú cưng
          </Text>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default Features;
