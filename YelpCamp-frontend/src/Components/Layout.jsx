import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* 固定 Navbar */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 1000,
                    backgroundColor: '#fff', // 确保背景覆盖内容
                }}
            >
                <Navbar />
            </div>
            {/* 内容区域 */}
            <main
                style={{
                    flexGrow: 1,
                    marginTop: '84px', // 假设 Navbar 高度为 64px，额外增加 20px 间距
                    padding: '20px', // 给 main 内容增加 padding
                }}
            >
                {children}
            </main>
            {/* Footer */}
            <Footer
                style={{
                    marginTop: '20px', // 给 Footer 和内容之间增加 20px 间距
                    padding: '10px 0', // Footer 内部上下间距
                    backgroundColor: '#f9f9f9', // Footer 背景色
                    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // Footer 阴影
                }}
            />
        </div>
    );
}

export default Layout;