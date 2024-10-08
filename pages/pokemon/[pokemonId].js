import Image from "next/image";
import styles from '../../styles/Pokemon.module.css';

export async function getStaticPaths() {
    const maxPokemons = 20;
    const api = 'https://pokeapi.co/api/v2/pokemon/';

    const res = await fetch(`${api}?limit=${maxPokemons}`);
    const data = await res.json();

    const paths = data.results.map((pokemon, index) => {
        return {
            params: {pokemonId: (index+1).toString()}
        }
    })

    return {
        paths,
        fallback: false,
    }
};

export async function getStaticProps(context) {

    const id = context.params.pokemonId;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data = await res.json();

    return {
        props: {pokemon: data},
    }
};

export default function Pokemon({pokemon}) {
    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{pokemon.name}</h1>
            <Image
                src={pokemon.sprites.front_default} // Usando a URL da imagem da PokeAPI
                alt={pokemon.name}
                width={120}
                height={120}
            />
            <div>
                <h3>Número:</h3>
                <p>#{pokemon.id}</p>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                    {pokemon.types.map((item, index) => (
                        <span className={`${styles.type} ${styles['type_' +  item.type.name]}`} key={index}>{item.type.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h4>Altura:</h4>
                    <p>{pokemon.height * 10} cm</p>
                </div>
                <div className={styles.data_weight}>
                    <h4>Peso:</h4>
                    <p>{pokemon.weight / 10} kg</p>
                </div>
            </div>
        </div>
    )
};