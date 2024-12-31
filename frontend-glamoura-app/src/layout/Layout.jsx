import Header from "../components/Header";
import Container from "../container/Container";
import Footer from "../components/Footer";

function Layout({ authStatus, setAuthStatus, children}) {
    return (
      <div>
        <Header authStatus={authStatus} setAuthStatus={setAuthStatus}></Header>
        <Container>{children}</Container>
        <Footer></Footer>
      </div>
    );
  }
  
  export default Layout;