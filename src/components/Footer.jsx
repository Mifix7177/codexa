import Logo, { BrandName } from './Logo'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p className="footer__desc text-secondary">
              Bizneslarni o'zgartiruvchi raqamli yechimlar. Konsepsiyadan ishga tushirishgacha va undan keyin ham.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="#" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
              <a href="#" aria-label="Telegram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5L2 12.5l7 1M21 5l-2.5 15L9 13.5M21 5L9 13.5m0 0V19l3.249-3.277"/></svg></a>
            </div>
          </div>
          
          <div className="footer__col">
            <h4 className="footer__col-title">Xizmatlar</h4>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Veb-saytlar</a></li>
              <li><a href="#" className="footer__link">CRM Tizimlar</a></li>
              <li><a href="#" className="footer__link">Telegram Botlar</a></li>
              <li><a href="#" className="footer__link">Avtomatlashtirish</a></li>
              <li><a href="#" className="footer__link">AI Integratsiyasi</a></li>
              <li><a href="#" className="footer__link">Mobil Ilovalar</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Kompaniya</h4>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Biz haqimizda</a></li>
              <li><a href="#" className="footer__link">Portfolio</a></li>
              <li><a href="#" className="footer__link">Jarayon</a></li>
              <li><a href="#" className="footer__link">Karyera</a></li>
              <li><a href="#" className="footer__link">Blog</a></li>
              <li><a href="#" className="footer__link">Aloqa</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Resurslar</h4>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Hujjatlar</a></li>
              <li><a href="#" className="footer__link">Amaliy Tadqiqotlar</a></li>
              <li><a href="#" className="footer__link">API Ma'lumotnoma</a></li>
              <li><a href="#" className="footer__link">Qo'llab-quvvatlash</a></li>
              <li><a href="#" className="footer__link">Status</a></li>
              <li><a href="#" className="footer__link">O'zgarishlar tarixi</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">© 2024 <BrandName />. Barcha huquqlar himoyalangan.</p>
          <div className="footer__legal">
            <a href="#">Maxfiylik Siyosati</a>
            <a href="#">Xizmat Ko'rsatish Shartlari</a>
            <a href="#">Cookie fayllari</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
