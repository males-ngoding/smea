import Navbar from "./components/Navbar";
import NewsHero from "./components/NewsHero";
import Sejarah from "./components/Sejarah";
import VisiMisi from "./components/VisiMisi";
import Identitas from "./components/Identitas";
import Jurusan from "./components/Jurusan";
import Ekstrakulikuler from "./components/Ekstrakulikuler";
import Kontak from "./components/Kontak";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <NewsHero />
      <Sejarah />
      <VisiMisi />
      <Identitas />
      <Jurusan />
      <Ekstrakulikuler />

      <Kontak />
    </div>
  );
};

export default Home;
