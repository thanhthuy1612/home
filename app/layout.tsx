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
                  itemSelectedBg: '#ffb703',
                  itemSelectedColor: '#ffffff',
                  colorPrimary: '#ffb703',
                },
                Button: {
                  colorPrimaryActive: '#ffb703',
                },
                Select: {
                  colorPrimary: '#ffb703',
                  optionSelectedBg: '#03346E',
                  optionSelectedColor: '#ffffff',
                },
                Input: {
                  colorPrimary: '#ffb703',
                },
              },
              token: {
                // Seed Token
                colorPrimary: '#03346E',
                colorBorderBg: '#03346E',
                colorIcon: '#03346E',
                colorTextBase: '#03346E',
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
