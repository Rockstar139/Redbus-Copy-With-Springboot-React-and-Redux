import { Link } from "react-router";
import styles from "../css/Info.module.css"
const Info = () => {
  return (
    <>
    <div className={styles.wrapper}>
      <article className="paragraphPartial">
        <h2 className="paragraphTitle">
          redBus: India’s Leading Online Bus Booking and Train Ticket Booking
          Platform{" "}
        </h2>
        <div className="paragraphContent">
          <p >
            redBus is India’s leading bus and train ticket booking platform for
            over 18 years and 56+ million satisfied users. It offers a seamless
            online ticket booking experience for millions of people.&nbsp;
          </p>
          <p>
            With 5200+ bus operators and 730000+ routes on redBus, you can
            easily find buses to your destination. You can check the best price
            with exclusive discounts and offers when booking train or bus
            tickets.
          </p>

          <h2>Why Choose redBus for Bus Booking?</h2>
          <p >
            Below are some of the reasons why you should choose redBus for
            booking bus tickets.&nbsp;
          </p>
          <ul>
            <li  >
              <p  role="presentation">
                <strong>Free Cancellation&nbsp;</strong>- Cancel bus tickets
                without paying cancellation charges.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Flexi Ticket&nbsp;</strong>- Select a Flexi ticket to
                modify your travel date at least 8 hours before departure.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Earn Rewards&nbsp;</strong>- Refer your friend and get
                INR 100 in your redBus wallet after they complete their first
                trip.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Booking for Women&nbsp;</strong>- Access exclusive deals
                for women travellers, view the number of women on your bus,
                enjoy priority helplines, and find buses preferred by women.
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Primo Services&nbsp;</strong>- Select top-rated bus
                operators that offer timely and customer-friendly Primo
                services.
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>24/7 Customer Support&nbsp;</strong>-Receive 24/7
                customer service for any assistance related to bookings.
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Instant Refund&nbsp;</strong>- Get an instant refund for
                cancellation or booking-related issues.&nbsp;
              </p>
            </li>
          </ul>
          <ul>
            <li>
              <strong>Live Bus Tracking&nbsp;</strong>- Track your bus in
              real-time and plan your journey more efficiently.
            </li>
          </ul>
          <h2 >
            Why Choose redRail for Train Ticket Booking? &nbsp; &nbsp; &nbsp;
          </h2>
          <p >
            Below are some of the reasons for{" "}
            <Link to="/train">train ticket booking</Link> on
            redRail.&nbsp;
          </p>
          <ul>
            <li  >
              <p  role="presentation">
                <strong>An authorised partner of IRCTC-</strong> redRail is an
                authorised IRCTC partner, providing authentic information.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Free cancellation-</strong> Get the freedom to cancel
                train tickets without paying cancellation charges.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Alternate Trip- </strong>Waitlist train ticket will get
                confirmed, or you will get a 3X refund to book an alternate
                train or bus.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>24/7 customer support-</strong> Customer support for
                redRail is available 24/7 to help you with train bookings.
              </p>
            </li>
          </ul>
          <h2>How to Book Bus Tickets and Train Tickets Online on redBus?</h2>
          <p >
            Below are some simple steps that you can follow when booking train
            or bus tickets online on redBus.&nbsp;&nbsp;
          </p>
          <ul>
            <li  >
              <p  role="presentation">
                <strong>Step 1: </strong>Visit the redBus website or app.
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Step 2: </strong>Select your preferred mode of
                transport, either bus or train.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Step 3: </strong>Select your travel date and journey
                details.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Step 4</strong>: Search for your preferred bus or train
                available on your chosen travel date and route.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Step 5: </strong>Select your preferred boarding or
                dropping points and enter your contact details.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Step 7: </strong>Choose from multiple payment options to
                proceed with the payment process.&nbsp;
              </p>
            </li>
            <li  >
              <p  role="presentation">
                <strong>Step 8</strong>: After the successful payment, you will
                receive a confirmation of your train or bus bookings on your
                registered email ID or mobile number.&nbsp;
              </p>
            </li>
          </ul>
          <h2>Exclusive Offers on redBus</h2>
          <p>
            redBus provides exclusive offers and deals on bus and train ticket
            booking for travellers. Additionally, you can also get festive
            offers on apps or specific to bus operators. All you need to do is
            check train and bus booking offers on redBus and apply the coupon
            code mentioned on the website or app to avail the discount. redBus
            keeps adding new discounts and offers depending on the seasonality,
            festivals, and other events.
          </p>
        </div>
      </article>
      </div>
    </>
  );
};

export default Info;
