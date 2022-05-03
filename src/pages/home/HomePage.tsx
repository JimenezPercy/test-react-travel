import React from "react";
import {
    Header,
    Footer,
    Carousel,
    SideMenu,
    ProductCollection,
    BusinessPartners,
} from "../../components";
import {Row, Col, Typography, Spin} from "antd";
import {productList1, productList2, productList3} from "./mockups";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import styles from "./HomePage.module.css";
import {withTranslation, WithTranslation} from "react-i18next";
import axios from "axios";
import {giveMeDataActionCreator} from "../../redux/recommendProducts/recommendProductsActions";
import {RootState} from "../../redux/store";
import {connect} from "react-redux";
import {MainLayout} from "../../layouts/mainLayout";

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        giveMeData: () => {
            dispatch(giveMeDataActionCreator());
        }
    };
};

type PropsType = WithTranslation &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         loading: true,
    //         error: null,
    //         productList: []
    //     };
    // }

    componentDidMount() {
        this.props.giveMeData();

        // try {
        //     const {data} = await axios.get("http://123.56.149.216:8080/api/productCollections", {
        //     });
        //     this.setState({
        //         loading: false,
        //         error: null,
        //         productList: data
        //     })
        // } catch (err) {
        //     this.setState({
        //         error: err.message,
        //         loading: false
        //     })
        // }
    }

    render() {
        const { t, productList, loading, error } = this.props;

        // if(loading){
        //     return <Spin
        //         size={"large"}
        //         style={{
        //             marginTop:200,
        //             marginBottom:200,
        //             marginLeft:"auto",
        //             marginRight:"auto",
        //             width:"100%"
        //         }
        //         }/>
        // }
        //
        // if(error){
        //     return <div>网站出错：{error}</div>
        // }
        return (
            <>
                {/* 页面内容 content */}
                <MainLayout className={styles["page-content"]}>
                    <Row style={{marginTop: 20}}>
                        <Col span={6}>
                            <SideMenu/>
                        </Col>
                        <Col span={18}>
                            <Carousel/>
                        </Col>
                    </Row>
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="warning">
                                {t("home_page.hot_recommended")}
                            </Typography.Title>
                        }
                        sideImage={sideImage}
                        //使用真实API
                        // products={productList[0].touristRoutes || productList1}
                        //使用假数据
                        products={productList1}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="danger">
                                {t("home_page.new_arrival")}
                            </Typography.Title>
                        }
                        sideImage={sideImage2}
                        products={productList2}
                    />
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="success">
                                {t("home_page.domestic_travel")}
                            </Typography.Title>
                        }
                        sideImage={sideImage3}
                        products={productList3}
                    />
                    <BusinessPartners/>
                </MainLayout>
            </>
        );
    }
}

export const HomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(HomePageComponent));