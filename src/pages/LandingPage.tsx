import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/providers/LanguageProvider";
import { Building, CheckCircle2, MapPin, Lock, WifiIcon } from "lucide-react";

export default function LandingPage() {
  const { t } = useLanguage();
  const [roomTypes] = useState([
    {
      id: 1,
      images: [
        "https://i.ibb.co/gMBBxJp5/4.jpg",
      ],
    },
    {
      id: 2,
      images: [
        "https://i.ibb.co/nqLg8FsD/1.jpg",
      ],
    },
    {
      id: 3,
      images: [
        "https://i.ibb.co/HRsDfk0/5.jpg",
      ],
    },
  ]);

  // เพิ่ม state สำหรับ index ของแต่ละห้อง
  const [imageIndexes, setImageIndexes] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prev) =>
        prev.map((idx, i) =>
          (idx + 1) % roomTypes[i].images.length
        )
      );
    }, 2500); // เปลี่ยนรูปทุก 2.5 วินาที

    return () => clearInterval(interval);
  }, [roomTypes]);

  const features = [
    {
      icon: WifiIcon,
      title: "Free Wi-Fi",
      titleTh: "Wi-Fi ฟรี",
      description: "High-speed internet in all rooms",
      descriptionTh: "อินเทอร์เน็ตความเร็วสูงในทุกห้อง",
    },
    {
      icon: Lock,
      title: "24/7 Security",
      titleTh: "ระบบรักษาความปลอดภัย 24 ชม.",
      description: "CCTV and keycard access system",
      descriptionTh: "ระบบ CCTV และคีย์การ์ด",
    },
    {
      icon: Building,
      title: "Modern Facilities",
      titleTh: "สิ่งอำนวยความสะดวกทันสมัย",
      description: "laundry, and common areas",
      descriptionTh: " ซักรีด และพื้นที่ส่วนกลาง",
    },
    {
      icon: MapPin,
      title: "Prime Location",
      titleTh: "ทำเลดี",
      description: "Close to universities and shopping centers",
      descriptionTh: "ใกล้มหาวิทยาลัยและห้างสรรพสินค้า",
    },
  ];

  const { language } = useLanguage();

  // เพิ่ม state สำหรับ modal รูปภาพ
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary">
                  {t("app.title")}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Link to="/login">
                <Button variant="default">{t("auth.login")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 z-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              {t("welcome.title")}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
              {t("welcome.subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">{t("welcome.login")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-8 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {t("welcome.features")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg shadow-sm border border-border flex flex-col items-center text-center"
              >
                <div className="inline-flex items-center justify-center rounded-md p-2 bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">
                  {language === "en" ? feature.title : feature.titleTh}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {language === "en"
                    ? feature.description
                    : feature.descriptionTh}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Rooms */}
      <div className="py-8 sm:py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {t("welcome.explore")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roomTypes.map((room) => (
              <div
                key={room.id}
                className="bg-card rounded-lg overflow-hidden shadow-md border border-border flex flex-col"
              >
                <div className="w-full h-[400px] overflow-hidden cursor-pointer" onClick={() => setModalImage(room.images[0])}>
                  <img
                    src={room.images[0]}
                    alt={`Room ${room.id}`}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal รูปภาพ */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Room Large"
            className="w-full max-w-[90vw] max-h-[80vh] sm:max-w-[600px] md:max-w-[800px] h-auto rounded-lg shadow-lg border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-background text-foreground border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold mb-4">{t("app.title")}</h3>
              <div className="w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d123948.80735360993!2d99.8125109!3d13.8750008!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2e592573eac1f%3A0xc0b0318b7fb3fd64!2z4Lia4LmJ4Liy4LiZ4Lie4Li44LiX4LiY4LiK4Liy4LiV4Li0IOC4meC4hOC4o-C4m-C4kOC4oQ!5e0!3m2!1sth!2sth!4v1748183614363!5m2!1sth!2sth"
                  className="w-full"
                  height="150"
                  style={{ border: "2px solid #dfdfdf", borderRadius: "18px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="flex space-x-4">
                <a href="https://maps.app.goo.gl/SUTe631uLxX4DD3QA" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                  <p className="text-muted-foreground">100 หนองปากโลง</p>
                  <p className="text-muted-foreground">อำเภอเมืองนครปฐม นครปฐม 73000</p>
                  <p className="text-muted-foreground">Phone: 06-5329-9452</p>
                  <p className="text-muted-foreground">Line : IDLine</p>
                  <p className="text-muted-foreground"><a href="https://www.facebook.com/poll.ponlop.5/">Facebook : Poll Ponlop</a></p>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {t("app.title")}. {t("footer.rights")}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
