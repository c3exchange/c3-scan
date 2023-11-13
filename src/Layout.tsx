import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
