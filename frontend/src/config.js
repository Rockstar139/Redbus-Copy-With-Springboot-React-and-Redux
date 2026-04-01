import { persistor } from "./store/index.js";

const config = {
  trainBanner: "train-banner.svg",
  busBanner: "bus-banner.webp",
  maxNoOfMonths: 2,
  //get current page path
  getPath() {
    return window.location.pathname.replace("/", "") == ""
      ? "bus"
      : window.location.pathname.replace("/", "");
  },
  //get Banner based on page
  getBanner() {
    return this.getPath() == "train" ? this.trainBanner : this.busBanner;
  },
  // format to YYYY-MM-DD
  formatDateYYYYMMDD(date) {
    if(date == "")
        date = new Date();
    return date.toISOString().split("T")[0];
  },
  //removes everything from local storage
  clearPersistentStorage() {
    persistor.purge();
  },
  //format to 26 Mar, 2026
  formatDateDDMMMYYY(dateString) {
    if (!dateString) return "";

    const d = new Date(dateString);
    const parts = d
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .split(" ");

    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
  },
};

export default config;
