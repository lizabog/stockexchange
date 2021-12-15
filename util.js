async function getCompProfile(symbol) {
  const compProfileResponse = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
  );
  const compProfile = await compProfileResponse.json();
  return compProfile.profile;
}
const input = document.getElementById("searchInput");
const searchResultLimit = 10;
const listArea = document.getElementById("listResult");
