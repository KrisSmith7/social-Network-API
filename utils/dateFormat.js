module.exports = (timestamp) =>
    {
const date = new Date(timestamp)

const formattedDate = date.toLocaleString();
return formattedDate
}