import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export interface IHeader {
  title: string;
  Component: React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>
}

const HeaderLogin: React.FC<IHeader> = (props) => {
  const { title, Component } = props
  return (
    <div className='mb-[50px] flex items-center w-[100%] justify-center'>
      <Component className='border-colorPrimary border-[1px] p-[5px] rounded-[50%]' style={{ fontSize: '15px' }} />
      <div className=' text-[25px] mx-[10px]'>{title}</div>
    </div>
  )
}

export default HeaderLogin