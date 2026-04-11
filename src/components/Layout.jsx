import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout({ children }) {
    return (
        <div className="page">
            <Header />
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    );
}