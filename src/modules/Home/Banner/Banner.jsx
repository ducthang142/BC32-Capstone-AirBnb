import { Text, Button, Center } from "@mantine/core";
import React from "react";
import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.banner__background}>
      <Center>
        <Text mt="50vh" mr={15} fw="bolder" fz={20}>
          Bạn chưa biết nên đi đâu? Không sao cả!
        </Text>
        <Button
          mt="50vh"
          color="pink"
          variant="outline"
          size="xl"
          radius="xl"
          component="a"
          href="#showing"
          styles={(theme) => ({
            root: {
              "&:hover": {
                backgroundColor: theme.colors.pink[6],
                color: "#fff",
              },
            },
          })}
        >
          Tham khảo ngay
        </Button>
      </Center>
    </div>
  );
};

export default Banner;
