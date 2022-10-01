export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url) //urlを受け取る
    .then((res) => res.json()) //json形式で返す
    .then((data) => resolve(data)); //dataで取得
  })
}

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      resolve(data)
    })
  })
}
