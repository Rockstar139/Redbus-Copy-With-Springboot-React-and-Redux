import styles from "../css/Footer.module.css";
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer id="rh_footer_new" className={styles.rh_footer_new}>
      <div className={styles.rb_footer}>
        <ul className={styles.footer_links_ul}>
          <li
            className={[
              styles.footer_link_section,
              styles.main_footer_item,
            ].join(" ")}
          >
            <div>
              <picture>
                <img
                  src="bus-icon.png"
                  alt="redBus"
                  title="redBus"
                  className={styles.rb_footer_logo}
                />
              </picture>
            </div>
            <span>
              redBus is the world's largest online bus ticket booking service
              trusted by over 56+ million happy customers globally. redBus
              offers bus ticket booking through its website, iOS and Android
              mobile apps for all major routes.
            </span>
          </li>
          <li
            className={[
              styles.footer_link_section,
              styles.sideLinkSection,
            ].join(" ")}
            id="about_redbus_title_footer"
          >
            <strong className={styles.linkTitle}>About redBus</strong>
            <Link className={styles.linkText} to="/" id="about_us_footer">
              About us
            </Link>
            <Link
              className={styles.linkText}
              to="/"
              id="investor_relations_footer"
            >
              Investor Relations
            </Link>
            <Link className={styles.linkText} to="/" id="contact_us_footer">
              Contact us
            </Link>
            <Link className={styles.linkText} to="/" id="redbus_on_bus_footer">
              redBus on mobile
            </Link>
            <Link className={styles.linkText} to="/" id="sitemap_footer">
              Sitemap
            </Link>
            <Link className={styles.linkText} to="/" id="offers_footer">
              Offers
            </Link>
            <Link className={styles.linkText} to="/" id="careers_footer">
              Careers
            </Link>
            <Link className={styles.linkText} to="/" id="values_footer">
              Values
            </Link>
          </li>
          <li
            className={[
              styles.footer_link_section,
              styles.sideLinkSection,
            ].join(" ")}
            id="info_title_footer"
          >
            <strong className={styles.linkTitle}>Info</strong>
            <Link
              className={styles.linkText}
              to="/"
              id="terms_n_conditions_footer"
            >
              T&amp;C
            </Link>
            <Link className={styles.linkText} to="/" id="privacy_policy_footer">
              Privacy policy
            </Link>
            <Link className={styles.linkText} to="/" id="faq_footer">
              FAQ
            </Link>
            <Link className={styles.linkText} to="/" id="blog_footer">
              Blog
            </Link>
            <Link
              className={styles.linkText}
              to="/"
              id="bus_operator_registration_footer"
            >
              Bus operator registration
            </Link>
            <Link
              className={styles.linkText}
              to="/"
              id="agent_registration_footer"
            >
              Agent registration
            </Link>
            <Link
              className={styles.linkText}
              to="/"
              id="insurance_partner_footer"
            >
              Insurance partner
            </Link>
            <Link className={styles.linkText} to="/" id="user_agreement_footer">
              User agreement
            </Link>
            <Link className={styles.linkText} to="/">
              Primo Bus
            </Link>
            <Link className={styles.linkText} to="/">
              Bus Timetable
            </Link>
          </li>
          <li
            className={[
              styles.footer_link_section,
              styles.sideLinkSection,
            ].join(" ")}
            id="global_sites_title_footer"
          >
            <strong className={styles.linkTitle}>Global Sites</strong>
            <Link className={styles.linkText} to="/" id="India_site_footer">
              India
            </Link>
            <Link className={styles.linkText} to="/" id="singapore_site_footer">
              Singapore
            </Link>
            <Link className={styles.linkText} to="/" id="malaysia_site_footer">
              Malaysia
            </Link>
            <Link className={styles.linkText} to="/" id="indonesia_site_footer">
              Indonesia
            </Link>
            <Link className={styles.linkText} to="/" id="peru_site_footer">
              Peru
            </Link>
            <Link className={styles.linkText} to="/" id="colombia_site_footer">
              Colombia
            </Link>
            <Link className={styles.linkText} to="/" id="cambodia_site_footer">
              Cambodia
            </Link>
            <Link className={styles.linkText} to="/" id="vietnam_site_footer">
              Vietnam
            </Link>
          </li>
          <li
            className={[
              styles.footer_link_section,
              styles.sideLinkSection,
            ].join(" ")}
            id="our_partners_title_footer"
          >
            <strong className={styles.linkTitle}>Our Partners</strong>
            <Link
              className={styles.linkText}
              to="/"
              id="goibibo_bus_footer"
              rel="nofollow"
            >
              Goibibo Bus
            </Link>
            <Link
              className={styles.linkText}
              to="/"
              id="goibibo_hotels_footer"
              rel="nofollow"
            >
              Goibibo Hotels
            </Link>
            <Link
              className={styles.linkText}
              to="/"
              id="makemytrip_hotels_footer"
              rel="nofollow"
            >
              Makemytrip Hotels
            </Link>
          </li>
        </ul>
        <div className={styles.horizontal_seperator}></div>
        <div className={styles.copyright_social_section}>
          <span className="footer_copyright_text">
            Ⓒ 2026 MAKEMYTRIP (INDIA) PRIVATE LIMITED. All rights reserved
          </span>
          <div className={styles.social_section}>
            <Link
              className={styles.social_icon_item}
              id="redbus_facebook"
              to="/"
            >
              <ImFacebook className={styles.social_icon} />
            </Link>
            <Link
              className={styles.social_icon_item}
              id="redbus_linkedin"
              to="/"
            >
              <FaLinkedinIn className={styles.social_icon} />
            </Link>
            <Link
              className={styles.social_icon_item}
              id="redbus_twitter"
              to="/"
            >
              <FaTwitter className={styles.social_icon} />
            </Link>
            <Link
              className={styles.social_icon_item}
              id="redbus_instagram"
              to="/"
            >
              <AiFillInstagram className={styles.social_icon} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
