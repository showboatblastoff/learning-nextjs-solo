import Image from "next/image";
import styles from '@/app/ui/styles/home.module.css';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 relative">
        <div className="bg-white border-2 border-grey-500 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center">
            <h1 className={`text-4xlfont-bold mb-4 ${styles.text_green}`}>Lucas and Suzanne goes to jail</h1>
            <p className="text-lg text-gray-700 mb-4">
              Lucas Guariglia hired Haul Bikes/Daily Direct to transport his motorcycle, subsequently claiming damage during transit. Lucas used aggressive tactics in communications with Jeff Lloyd of Daily Direct, repeatedly threatening legal action while using his Rowboat Creative business email. The motorcycle transportation was a personal purchase Lucas made without authorization on the Rowboat Creative business card. Lucas escalated by involving Rowboat Creative's lawyer, Pamela Visvardis, without approval from business partner Joseph Zangrilli, using company funds to issue legal threats alleging breach of contract. Jeff Lloyd documented the motorcycle's condition before transport, disputing several claimed damages as pre-existing. While acknowledging responsibility for a scraped derby cover and tank marks, Lloyd contested damage to the headlight and forks. Lloyd attempted to arrange repairs but found Lucas's demands unreasonable, particularly requirements that exceeded transportation damage concerns. The dispute centers on contested claims regarding the validity and extent of damage, with Lloyd maintaining some damage predated transport while Lucas asserts full liability by Daily Direct. Lucas vindictively files false reports with: - Allstate Insurance - BBB - Wisconsin Department of Agriculture, Trade and Consumer Protection
            </p>
            <a href="/blog/posts" className={`outline outline-1 outline-offset-2 border-grey-500 text-grey-500 hover:text-white py-2 px-4 rounded hover:bg-grey-500 md:w-auto ${styles.fit_content}`}>
              Read
            </a>
          </div>
          <div className="relative flex justify-center items-center">
            {/* Image */}
            <Image
              src="/header-1744673843818.png"
              width={1000}
              height={760}
              className="hidden rounded-lg md:block z-10"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
              src="/header-1744342767868.png"
              width={560}
              height={620}
              className="block rounded-md md:hidden"
              alt="Screenshots of the dashboard project showing desktop version"
            />
          </div>
        </div>
      </div>
      <div className={`hidden md:block absolute top-0 right-0 bottom-0 left-2/3 z-0 ${styles.bg_green}`}></div>
    </main>
  );
}
