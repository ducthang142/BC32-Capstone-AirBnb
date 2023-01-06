import React from "react";
import { Group, Grid, Image } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <Grid columns={20} my={30} className={styles.footer__content}>
        <Grid.Col md={10} xl={8}>
          <Image src="./image/logo.png" alt="logo" width={300} />
        </Grid.Col>
        <Grid.Col md={10} xl={4}>
          <h4>Trợ giúp</h4>
          <ul>
            <li>
              <a href="#">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="#">Câu hỏi thường gặp</a>
            </li>
            <li>
              <a href="#">Chính sách Bảo mật</a>
            </li>
            <li>
              <a href="#">Chính sách về cookie</a>
            </li>
            <li>
              <a href="#">Điều khoản sử dụng</a>
            </li>
          </ul>
        </Grid.Col>
        <Grid.Col md={10} xl={4}>
          <h4>Công ty</h4>
          <ul>
            <li>
              <a href="#">Về chúng tôi</a>
            </li>
            <li>
              <a href="#">Tuyển dụng</a>
            </li>
            <li>
              <a href="#">Báo chí</a>
            </li>
            <li>
              <a href="#">Nhật ký mạng</a>
            </li>
            <li>
              <a href="#">PointsMAX</a>
            </li>
          </ul>
        </Grid.Col>
        <Grid.Col md={10} xl={4}>
          <h4>Đối tác của chúng tôi</h4>
          <ul>
            <li>
              <a href="#">Cổng thông tin đối tác YCS</a>
            </li>
            <li>
              <a href="#">Partner Hub</a>
            </li>
            <li>
              <a href="#">Quảng cáo trên trang</a>
            </li>
            <li>
              <a href="#">Đối tác liên kết</a>
            </li>
            <li>
              <a href="#">Đối tác kết nối</a>
            </li>
          </ul>
        </Grid.Col>
      </Grid>
      <Group className={styles.footer__copyright}>
        <p>© 2023 tama. All rights reserved.</p>
        <div>
          <a href="#">
            <IconBrandFacebook />
          </a>
          <a href="#">
            <IconBrandTwitter />
          </a>
          <a href="#">
            <IconBrandYoutube />
          </a>
        </div>
      </Group>
    </div>
  );
};

export default Footer;
