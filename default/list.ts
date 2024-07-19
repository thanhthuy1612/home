import { ISelected } from '@/interface/ISelected';

export const listPrice: ISelected[] = [
  { value: '0', label: 'Bất kỳ' },
  { value: '1', label: 'Dưới 3 triệu' },
  { value: '2', label: 'Từ 3 đến 5 triệu' },
  { value: '3', label: 'Từ 5 đến 7 triệu' },
  { value: '4', label: 'Từ 7 đến 10 triệu' },
  { value: '5', label: 'Trên 10 triệu' },
];

export const listArrayPrice: ISelected[] = [
  { value: '0', label: 'Giá tăng dần' },
  { value: '1', label: 'Giá giảm dần' },
];

export const listRoomType: ISelected[] = [
  { value: '0', label: 'Tất cả' },
  { value: '1', label: 'Phòng trọ' },
  { value: '2', label: 'Chung cư' },
  { value: '3', label: 'Ký túc xá' },
  { value: '4', label: 'Nhà nguyên căn' },
  { value: '5', label: 'Văn phòng' },
  { value: '6', label: 'Căn hộ' },
];

export const listRoomStatus: ISelected[] = [
  { value: '1', label: 'Còn phòng trống' },
  { value: '10', label: 'Sắp có phòng trống' },
  { value: '20', label: 'Hết phòng' },
];

export const listPostStatus: ISelected[] = [
  { value: '1', label: 'Chờ duyệt' },
  { value: '2', label: 'Đã duyệt' },
  { value: '3', label: 'Đã ẩn' },
];
