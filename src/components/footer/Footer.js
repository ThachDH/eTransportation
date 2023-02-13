import React from 'react';
import './Footer.scss';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


function Footer() {
    return (
        <MDBFooter style={{ backgroundColor: '#0685aa', color: 'white' }} className='text-center text-lg-start'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Kết nối với chúng tôi trên các mạng xã hội:</span>
                </div>

                <div>
                    <a href='#1' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='facebook-f' />
                    </a>
                    <a href='#1' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='twitter' />
                    </a>
                    <a href='#1' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='google' />
                    </a>
                    <a href='#1' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='instagram' />
                    </a>


                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                eTransportaion
                            </h6>
                            <p>
                                Chất lượng dịch vụ như thế nào? Công ty luôn đảm bảo một trải nghiệm tốt với tất cả những gì mà chúng tôi đang sở hữu.
                                Từ con người đến các dòng xe...
                                Và phương châm "KHÁCH HÀNG LÀ SỐ 1" bạn sẽ hài lòng và quay lại lần 2 nhanh thôi.

                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Tuyến đường</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe đi Vũng Tàu từ Sài Gòn
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe đi Đà Lạt từ Sài Gòn
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe đi Hải Phòng từ Hà Nội
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe đi Sapa từ Hà Nội
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Nhà xe</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe Sao Việt
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe Phương Trang
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe Thiện Thành Limousine
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Xe Hoa Mai
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon color='secondary' icon='home' className='me-2' />
                                Lô E2a-7, Đường D1, Long Thạnh Mỹ, Tp Hồ Chí Minh
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                eTransportaion@gmail.com
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='phone' className='me-3' /> 028 7300 5588
                            </p>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    MDBootstrap.com
                </a>
            </div>
        </MDBFooter>
    );
}
export default Footer;