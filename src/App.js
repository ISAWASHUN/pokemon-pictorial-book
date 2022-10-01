import { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Card } from './components/Card/Card';
import {getAllPokemon, getPokemon} from './utils/pokemon'


function App() {

  const initialURl = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true); //ローディングの構築
  const [pokemonData, setPokemonData] = useState([])
  const [nextURL, setNextURL] = useState("")
  const [prevURL, setPrevURL] = useState("")

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURl);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next)
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => { //map関数で展開する
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  }

  const handleNextPage = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  const handlePrevPage = async () => {
    if(!prevURL) return;

    setLoading(true)
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  return (
    <>
    <Navbar/>
    <div className='bg-orange-100'>
    {/* ローディングの構築 */}
    {loading ? (
      <h1>ロード中・・・</h1>
    ): (
      <>
      <div className=''>
        {pokemonData.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon}/>
        })}
      </div>
      <div className='flex justify-center'>
        <button 
        className='bg-blue-900 hover:bg-blue-800 text-white rounded px-4 py-2 mx-4' 
        onClick={handlePrevPage}>
          前へ
        </button>
        <button 
        className='bg-blue-900 hover:bg-blue-800 text-white rounded px-4 py-2' 
        onClick={handleNextPage}>
          後ろへ
        </button>
      </div>
      </>
    )} 
  </div>
    </>
  );
}

export default App;
