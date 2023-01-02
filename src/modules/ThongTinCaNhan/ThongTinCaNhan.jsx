import React from "react";
import ThongTinNguoiDung from "./ThongTinNguoiDung"
import ThongTinDatPhong from "./ThongTinDatPhong"
import styles from "./ThongTinCaNhan.module.scss"
import { Grid } from '@mantine/core';

const ThongTinCaNhan = () => {
  return <div className={styles.container}>
    <Grid>
      <Grid.Col md={4} ><ThongTinNguoiDung /></Grid.Col>
      <Grid.Col md={8} ><ThongTinDatPhong /></Grid.Col>
    </Grid>
    
  </div>;
};

export default ThongTinCaNhan;
