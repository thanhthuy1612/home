import { ISelected } from '@/interface/ISelected';

export const hn: ISelected[] = [
  'Ba Đình',
  'Cầu Giấy',
  'Đống Đa',
  'Hai Bà Trưng',
  'Hoàn Kiếm',
  'Thanh Xuân',
  'Hoàng Mai',
  'Long Biên',
  'Hà Đông',
  'Tây Hồ',
  'Nam Từ Liêm',
  'Bắc Từ Liêm',
  'Thanh Trì',
  'Ba Vì',
  'Đan Phượng',
  'Gia Lâm',
  'Đông Anh',
  'Thường Tín',
  'Thanh Oai',
  'Chương Mỹ',
  'Hoài Đức',
  'Mỹ Đức',
  'Phúc Thọ',
  'Thạch Thất',
  'Quốc Oai',
  'Phú Xuyên',
  'Ứng Hòa',
  'Mê Linh',
  'Sóc Sơn',
  'Sơn Tây',
]
  .toSorted((a, b) => {
    return a.localeCompare(b);
  })
  .map((item) => {
    return {
      value: item,
      label: item,
    };
  });

export const hcm: ISelected[] = [
  'Bình Chánh',
  'Hóc Môn',
  'Cần Giờ',
  'Củ Chi',
  'Nhà bè',
  'Quận 1',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 10',
  'Quận 11',
  'Quận 12',
  'Tân Bình',
  'Bình Tân',
  'Bình Thạnh',
  'Tân Phú',
  'Gò Vấp',
  'Phú Nhuận',
  'Thủ Đức',
]
  .toSorted((a, b) => {
    return a.localeCompare(b);
  })
  .map((item) => {
    return {
      value: item,
      label: item,
    };
  });

export const defaultCity: ISelected[] = ['Hà Nội', 'Hồ Chí Minh'].map(
  (item) => {
    return {
      value: item,
      label: item,
    };
  },
);
