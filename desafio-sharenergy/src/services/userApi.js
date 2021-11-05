const getUserImg = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const { results } = await response.json();
  const { picture } = results[0];
  return picture;
}

export default getUserImg;