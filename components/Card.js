import Image from 'next/image';
import styles from '../styles/Card.module.css';
import Link from 'next/link';

export default function Card({ pokemon }) {
    return (
        <div className={styles.card}>
            <Image
                src={pokemon.sprites.front_default} // Usando a URL da imagem da PokeAPI
                alt={pokemon.name}
                width={120}
                height={120}
            />
            <p className={styles.id}>#{pokemon.id}</p>
            <h3 className={styles.title}>{pokemon.name}</h3>
            <Link className={styles.btn} href={`/pokemon/${pokemon.id}`}>Detalhes</Link>
        </div>
    );
}
