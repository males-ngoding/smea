import {
  Trophy,
  Music,
  Palette,
  Cpu,
  Camera,
  Flame,
  Users,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

// Type definitions
interface EkskulItem {
  icon: LucideIcon;
  name: string;
  category: string;
  description: string;
  colorClasses: {
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
  };
}

// Ekstrakurikuler data dengan explicit color classes
const ekskulData: EkskulItem[] = [
  {
    icon: Trophy,
    name: "Basket",
    category: "Olahraga",
    description: "Mengembangkan kemampuan atletik dan kerjasama tim",
    colorClasses: {
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      badgeBg: "bg-orange-50",
      badgeText: "text-orange-700",
    },
  },
  {
    icon: Music,
    name: "Band & Musik",
    category: "Seni",
    description: "Ekspresikan bakat musik melalui berbagai alat musik",
    colorClasses: {
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      badgeBg: "bg-purple-50",
      badgeText: "text-purple-700",
    },
  },
  {
    icon: Palette,
    name: "Seni Rupa",
    category: "Seni",
    description: "Kembangkan kreativitas melalui lukis dan desain",
    colorClasses: {
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      badgeBg: "bg-pink-50",
      badgeText: "text-pink-700",
    },
  },
  {
    icon: Cpu,
    name: "Robotika",
    category: "Teknologi",
    description: "Belajar pemrograman dan membuat robot",
    colorClasses: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-700",
    },
  },
  {
    icon: Camera,
    name: "Fotografi",
    category: "Seni",
    description: "Tangkap momen indah dengan teknik profesional",
    colorClasses: {
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      badgeBg: "bg-gray-50",
      badgeText: "text-gray-700",
    },
  },
  {
    icon: Flame,
    name: "Pramuka",
    category: "Karakter",
    description: "Membangun karakter dan jiwa kepemimpinan",
    colorClasses: {
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      badgeBg: "bg-green-50",
      badgeText: "text-green-700",
    },
  },
  {
    icon: Users,
    name: "OSIS",
    category: "Organisasi",
    description: "Organisasi siswa intra sekolah",
    colorClasses: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      badgeBg: "bg-red-50",
      badgeText: "text-red-700",
    },
  },
  {
    icon: BookOpen,
    name: "English Club",
    category: "Akademik",
    description: "Tingkatkan kemampuan bahasa Inggris",
    colorClasses: {
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-700",
    },
  },
];

// Manfaat ekstrakulikuler
const benefitsList = [
  "Mengembangkan bakat dan minat sesuai passion",
  "Melatih soft skills seperti leadership dan teamwork",
  "Menambah nilai plus untuk masuk universitas",
  "Membangun networking dan persahabatan",
  "Meraih prestasi dan penghargaan",
  "Membentuk karakter yang seimbang",
];

// Komponen untuk card ekstrakulikuler
function EkskulCard({ ekskul }: { ekskul: EkskulItem }) {
  const IconComponent = ekskul.icon;
  const { iconBg, iconColor, badgeBg, badgeText } = ekskul.colorClasses;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div
        className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-4`}
      >
        <IconComponent className={`w-7 h-7 ${iconColor}`} />
      </div>
      <span
        className={`inline-block px-3 py-1 ${badgeBg} ${badgeText} rounded-full text-xs font-semibold mb-3`}
      >
        {ekskul.category}
      </span>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{ekskul.name}</h3>
      <p className="text-gray-600 text-sm">{ekskul.description}</p>
    </div>
  );
}

// Komponen untuk stat card
function StatCard({
  icon: Icon,
  value,
  label,
  description,
  gradient,
  textColor,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  gradient: string;
  textColor: string;
}) {
  return (
    <div className={`${gradient} rounded-3xl p-8 text-white shadow-xl`}>
      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className={`${textColor} mb-4`}>{label}</p>
      <p className={`text-sm ${textColor} opacity-80`}>{description}</p>
    </div>
  );
}

// Komponen utama
export default function Ekstrakulikuler() {
  return (
    <section id="ekstrakulikuler" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              Aktivitas Siswa
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ekstrakulikuler
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berbagai pilihan kegiatan untuk mengembangkan bakat, minat, dan
            karakter siswa di luar jam pelajaran
          </p>
        </header>

        {/* Ekstrakulikuler Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ekskulData.map((ekskul, index) => (
            <EkskulCard key={index} ekskul={ekskul} />
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <StatCard
            icon={Trophy}
            value="150+"
            label="Prestasi diraih dalam 3 tahun terakhir"
            description="Mulai dari tingkat kota hingga nasional di berbagai bidang kompetisi"
            gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            textColor="text-blue-100"
          />
          <StatCard
            icon={Users}
            value="25+"
            label="Pilihan ekstrakulikuler aktif"
            description="Dari olahraga, seni, teknologi, hingga pengembangan karakter"
            gradient="bg-gradient-to-br from-green-600 to-green-800"
            textColor="text-green-100"
          />
          <StatCard
            icon={Flame}
            value="85%"
            label="Tingkat partisipasi siswa"
            description="Mayoritas siswa aktif mengikuti minimal satu ekstrakulikuler"
            gradient="bg-gradient-to-br from-amber-600 to-amber-800"
            textColor="text-amber-100"
          />
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <Image
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kegiatan Ekstrakulikuler Siswa"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
                width={800}
                height={320}
              />
            </div>

            {/* Benefits List */}
            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Manfaat Mengikuti Ekstrakulikuler
              </h3>
              <ul className="space-y-4">
                {benefitsList.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
