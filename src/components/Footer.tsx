import styles from "../css/App.module.css";

function Footer() {
  return (
    <div>
      <footer>
        <img
          className={styles.footerLogo}
          alt="AuctionSense logo"
          src="/images/Logo.png"
        ></img>
        <p>@2022 auctionsense.com</p>
        <p>Legal stuff | Privacy | Cookies</p>
      </footer>
    </div>
  );
}

export default Footer;
