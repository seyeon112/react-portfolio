import React from 'react';
import S from './style';
import { Link } from 'react-router-dom';

const CouponPopup = ({couponData, onChangeInsertCoupon, handleShowPopup}) => {

    console.log(couponData)

    const couponList = couponData.map((coupon, i) => (
        <S.CouponPopupBoxWrap key={i}>
            <S.h2b>첫 구매 최대 {coupon.couponDiscountRate}%할인</S.h2b>
            <S.h6>유효기간 : {coupon.couponStart} ~ {coupon.couponEnd}까지</S.h6>
        </S.CouponPopupBoxWrap>
    ))

    return (
        <S.CouponBgWrap>
            <S.CouponPopupContainer>
                <S.CloseIcon onClick={handleShowPopup}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/myhome/x-icon.png`}
                        alt="X아이콘"
                    />
                </S.CloseIcon>
                <S.CouponPopupInputWrap>
                    <input type="text" name="couponCode" placeholder="받으신 쿠폰의 코드를 입력하세요" onChange={onChangeInsertCoupon}/>
                    <button>쿠폰등록</button>
                </S.CouponPopupInputWrap>
                <S.CouponP1>받으신 쿠폰을 등록하고 간편하게 사용하세요</S.CouponP1>
                <S.CouponP2>*등록된 쿠폰중 유효기간이 만료된 쿠폰은 자동 소멸됩니다</S.CouponP2>
                {couponList}
            </S.CouponPopupContainer>
        </S.CouponBgWrap>
    );
};

export default CouponPopup;