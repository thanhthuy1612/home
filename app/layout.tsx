import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import './globals.css';
import StoreProvider from './StoreProvider';
import Notification from '../components/Notification';
import DefaultLayout from '../components/layout/DefaultLayout';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-bgColor">
        <StoreProvider>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemSelectedBg: '#80e823',
                  itemSelectedColor: '#ffffff',
                  colorPrimary: '#80e823',
                },
                Button: {
                  colorPrimaryActive: '#80e823',
                },
                Select: {
                  colorPrimary: '#80e823',
                  optionSelectedBg: '#004aad',
                  optionSelectedColor: '#ffffff',
                },
                Input: {
                  colorPrimary: '#80e823',
                },
              },
              token: {
                // Seed Token
                colorPrimary: '#004aad',
                colorBorderBg: '#004aad',
                colorIcon: '#004aad',
                colorTextBase: '#004aad',
                colorError: '#FF6961',
              },
            }}
          >
            <Notification>
              <body suppressHydrationWarning={true}>
                <DefaultLayout>{children}</DefaultLayout>
              </body>
            </Notification>
          </ConfigProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
