import React from "react";
import ThongTinNguoiDung from "./ThongTinNguoiDung"
import ThongTinDatPhong from "./ThongTinDatPhong"
import styles from "./ThongTinCaNhan.module.scss"
import { Grid } from '@mantine/core';

const ThongTinCaNhan = () => {
  return <div className={styles.container}>
    <Grid>
      <Grid.Col md={4} xl={3} ><ThongTinNguoiDung /></Grid.Col>
      <Grid.Col md={8} xl={9} ><ThongTinDatPhong /></Grid.Col>
    </Grid>
    
  </div>;
};

export default ThongTinCaNhan;
