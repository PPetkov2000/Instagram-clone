export default function (timestamp) {
  const currentDate = new Date().getTime();
  const postDate = timestamp.toDate().getTime();
  const diff = currentDate - postDate;
  const timePastInDays = new Date(diff).getUTCDate() - 1;
  const timePastInHours = new Date(diff).getUTCHours();
  const timePastInMinutes = new Date(diff).getUTCMinutes();
  const timePastInSeconds = new Date(diff).getUTCSeconds();
  let result = "";

  if (timePastInDays === 0) {
    if (timePastInHours === 0) {
      if (timePastInMinutes === 0) {
        result = `${timePastInSeconds} seconds ago`;
      } else if (timePastInMinutes === 1) {
        result = `${timePastInMinutes} minute ago`;
      } else {
        result = `${timePastInMinutes} minutes ago`;
      }
    } else if (timePastInHours === 1) {
      result = `${timePastInHours} hour ago`;
    } else {
      result = `${timePastInHours} hours ago`;
    }
  } else if (timePastInDays === 1) {
    result = `${timePastInDays} day ago`;
  } else {
    result = `${timePastInDays} days ago`;
  }

  return result;
}
