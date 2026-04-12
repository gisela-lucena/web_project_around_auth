import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout({ children, headerProps }) {
    return (
        <div className="page">
            <Header {...headerProps} />
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    );
}
