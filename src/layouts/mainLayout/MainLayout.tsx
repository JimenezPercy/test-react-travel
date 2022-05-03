import React from "react";
import styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components";

export const MainLayout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};
