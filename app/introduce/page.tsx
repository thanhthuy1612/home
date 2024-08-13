import React from 'react';
import HeaderSettings from '../settings/components/HeaderSettings';
import Link from 'next/link';
import { Flex } from 'antd';

const Introduce: React.FC = () => {
  const renderLogo = () => (
    <Link
      className=" hover:text-colorSelect font-bold cursor-pointer underline"
      href={'/'}
    >
      TROSINHVIEN.VN
    </Link>
  );
  return (
    <div className="mx-[16px] mb-[24px] py-[24px]">
      <HeaderSettings title="Giới thiệu về chúng tôi" />
      <Flex gap={30} className=" flex-col">
        <div className="text-justify">
          {renderLogo()} – Nền Tảng Tiên Phong Tìm Kiếm Nơi Ở Lý Tưởng cho Sinh
          Viên tại TP.HCM
        </div>
        <div className="text-justify">
          Thành phố Hồ Chí Minh, với sự phát triển nhanh chóng và cơ hội học tập
          vô tận, luôn hấp dẫn hàng nghìn sinh viên từ khắp nơi đến học tập và
          sinh sống. Tuy nhiên, việc tìm kiếm một nơi ở phù hợp, đáp ứng đầy đủ
          các nhu cầu về tiện nghi, an ninh và chi phí hợp lý lại là thách thức
          không nhỏ đối với nhiều bạn trẻ.
        </div>
        <div className="text-justify">
          Nhận thức được những khó khăn này, vào năm 2024, {renderLogo()} đã ra
          đời với sứ mệnh trở thành nền tảng tiên phong trong việc kết nối sinh
          viên với những lựa chọn chỗ ở lý tưởng tại TP.HCM. Được thành lập bởi
          một nhóm chuyên gia giàu kinh nghiệm trong lĩnh vực bất động sản và
          công nghệ, {renderLogo()} tự hào là trang web cung cấp thông tin toàn
          diện và chính xác về các căn hộ, ký túc xá, nhà trọ dành riêng cho
          sinh viên.
        </div>
        <div className="text-justify">
          Với mạng lưới đối tác rộng khắp toàn thành phố, {renderLogo()} có thể
          cập nhật liên tục các lựa chọn chỗ ở mới nhất, từ địa điểm, giá cả cho
          đến tiện ích, đáp ứng đầy đủ nhu cầu của từng sinh viên. Không chỉ
          vậy, chúng tôi còn hỗ trợ sinh viên trong suốt quá trình tìm kiếm, lựa
          chọn và đăng ký chỗ ở, giúp họ tiết kiệm thời gian và công sức
        </div>
        <div className="text-justify">
          Hãy để {renderLogo()} đồng hành cùng bạn trong hành trình học tập sắp
          tới. Với sự hỗ trợ từ chuyên gia và công nghệ hiện đại, chúng tôi cam
          kết mang đến những trải nghiệm tìm kiếm chỗ ở hoàn hảo, giúp sinh viên
          tập trung vào việc học tập và phát triển bản thân. Cùng khám phá những
          lựa chọn chỗ ở lý tưởng, đáp ứng mọi nhu cầu của bạn tại{' '}
          {renderLogo()} ngay hôm nay!
        </div>
      </Flex>
    </div>
  );
};

export default Introduce;
